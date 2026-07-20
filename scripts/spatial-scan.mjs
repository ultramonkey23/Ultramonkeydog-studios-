import { spawn } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const DEFAULT_EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const browserPath = process.env.SPATIAL_BROWSER || DEFAULT_EDGE;
const targetUrl = process.env.SPATIAL_TARGET || "http://127.0.0.1:3000/";
const outDir = resolve(process.cwd(), "_spatial_proofs");
const viewports = [
  { name: "mobile", w: 390, h: 844 },
  { name: "tablet", w: 820, h: 1180 },
  { name: "desktop", w: 1440, h: 1100 },
];

const sleep = (ms) => new Promise((resolveSleep) => setTimeout(resolveSleep, ms));

async function fetchJson(url, attempts = 60) {
  let lastError;
  for (let i = 0; i < attempts; i += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    await sleep(100);
  }
  throw lastError;
}

class Cdp {
  constructor(wsUrl) {
    this.nextId = 1;
    this.pending = new Map();
    this.events = [];
    this.ws = new WebSocket(wsUrl);
  }

  async open() {
    if (this.ws.readyState === WebSocket.OPEN) return;
    await new Promise((resolveOpen, rejectOpen) => {
      this.ws.addEventListener("open", resolveOpen, { once: true });
      this.ws.addEventListener("error", rejectOpen, { once: true });
      this.ws.addEventListener("message", (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && this.pending.has(msg.id)) {
          const { resolvePending, rejectPending } = this.pending.get(msg.id);
          this.pending.delete(msg.id);
          if (msg.error) rejectPending(new Error(JSON.stringify(msg.error)));
          else resolvePending(msg.result || {});
          return;
        }
        this.events.push(msg);
      });
    });
  }

  send(method, params = {}, sessionId = undefined) {
    const id = this.nextId;
    this.nextId += 1;
    const payload = { id, method, params };
    if (sessionId) payload.sessionId = sessionId;
    this.ws.send(JSON.stringify(payload));
    return new Promise((resolvePending, rejectPending) => {
      this.pending.set(id, { resolvePending, rejectPending });
    });
  }

  close() {
    this.ws.close();
  }
}

const snapshotExpression = `
(() => {
  const rgbToHex = (value) => {
    const match = String(value).match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)(?:,\\s*([\\d.]+))?\\)/);
    if (!match) return null;
    const alpha = match[4] === undefined ? 1 : Number(match[4]);
    if (alpha === 0) return null;
    return "#" + [match[1], match[2], match[3]]
      .map((n) => Number(n).toString(16).padStart(2, "0"))
      .join("");
  };

  const backgroundFor = (el) => {
    let cur = el;
    while (cur) {
      const bg = rgbToHex(getComputedStyle(cur).backgroundColor);
      if (bg) return bg;
      cur = cur.parentElement;
    }
    return "#030304";
  };

  const selector = [
    "header", "nav", "main", "section", "footer", "img",
    "h1", "h2", "h3", "h4", "p", "a", "button",
    "[id^='project-card']", ".glass", ".glass-card"
  ].join(",");
  const raw = Array.from(document.querySelectorAll(selector))
    .filter((el) => !el.closest("[data-spatial-ignore='true']"));
  const visible = raw.filter((el) => {
    const rect = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
  });
  const ids = new Map();
  visible.forEach((el, index) => {
    const label = el.id || el.getAttribute("aria-label") || el.textContent.trim().slice(0, 28) || el.tagName.toLowerCase();
    const clean = String(label).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 36);
    ids.set(el, clean ? \`\${el.tagName.toLowerCase()}-\${index}-\${clean}\` : \`\${el.tagName.toLowerCase()}-\${index}\`);
  });
  return visible.map((el) => {
    const rect = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    let parent = el.parentElement;
    while (parent && !ids.has(parent)) parent = parent.parentElement;
    const zRaw = Number.parseInt(style.zIndex, 10);
    const tag = el.tagName.toLowerCase();
    const text = el.textContent.trim();
    return {
      id: ids.get(el),
      tag,
      text: text.slice(0, 80),
      x: Number(rect.x.toFixed(2)),
      y: Number(rect.y.toFixed(2)),
      w: Number(rect.width.toFixed(2)),
      h: Number(rect.height.toFixed(2)),
      z: Number.isFinite(zRaw) ? zRaw : 0,
      parent: parent ? ids.get(parent) : null,
      visible: true,
      is_text: ["h1", "h2", "h3", "h4", "p", "a", "button"].includes(tag) && text.length > 0,
      fg: rgbToHex(style.color),
      bg: backgroundFor(el),
      font_px: Number.parseFloat(style.fontSize) || 16
    };
  });
})()
`;

async function captureViewport(cdp, sessionId, viewport) {
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: viewport.w,
    height: viewport.h,
    deviceScaleFactor: 1,
    mobile: viewport.w < 700,
  }, sessionId);
  await cdp.send("Page.navigate", { url: targetUrl }, sessionId);
  for (let i = 0; i < 80; i += 1) {
    const ready = await cdp.send("Runtime.evaluate", {
      expression: "document.readyState",
      returnByValue: true,
    }, sessionId);
    if (ready.result?.value === "complete") break;
    await sleep(100);
  }
  await sleep(600);
  const result = await cdp.send("Runtime.evaluate", {
    expression: snapshotExpression,
    returnByValue: true,
    awaitPromise: true,
  }, sessionId);
  return {
    viewport: {
      w: viewport.w,
      h: Math.max(viewport.h, awaitPageHeight(result.result.value)),
    },
    nodes: result.result.value,
  };
}

function awaitPageHeight(nodes) {
  return Math.ceil(nodes.reduce((max, node) => Math.max(max, node.y + node.h), 0));
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const userData = await mkdtemp(join(tmpdir(), "umd-spatial-"));
  const browser = spawn(browserPath, [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    "--remote-debugging-port=9223",
    `--user-data-dir=${userData}`,
    "about:blank",
  ], { stdio: "ignore" });

  try {
    const version = await fetchJson("http://127.0.0.1:9223/json/version");
    const cdp = new Cdp(version.webSocketDebuggerUrl);
    await cdp.open();
    const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });
    await cdp.send("Page.enable", {}, sessionId);
    await cdp.send("Runtime.enable", {}, sessionId);

    const outputs = [];
    for (const viewport of viewports) {
      const snapshot = await captureViewport(cdp, sessionId, viewport);
      const outPath = join(outDir, `snapshot-${viewport.name}.json`);
      await writeFile(outPath, JSON.stringify(snapshot, null, 2), "utf8");
      outputs.push({ viewport: viewport.name, path: outPath, nodes: snapshot.nodes.length });
    }
    cdp.close();
    console.log(JSON.stringify({ result: "PASS", targetUrl, outputs }, null, 2));
  } finally {
    browser.kill();
    try {
      await rm(userData, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
    } catch {
      // Edge can briefly hold Crashpad files on Windows after headless exit.
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
