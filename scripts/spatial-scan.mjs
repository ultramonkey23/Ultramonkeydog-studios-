import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const BROWSER_CANDIDATES = [
  process.env.SPATIAL_BROWSER,
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);

const browserPath = BROWSER_CANDIDATES.find((candidate) => existsSync(candidate));
const targetUrl = process.env.SPATIAL_TARGET || "http://127.0.0.1:3000/";
const outDir = resolve(process.cwd(), "_spatial_proofs");
const viewports = [
  { name: "mobile", w: 390, h: 844 },
  { name: "tablet", w: 820, h: 1180 },
  { name: "desktop", w: 1440, h: 1100 },
];

const sleep = (ms) => new Promise((resolveSleep) => setTimeout(resolveSleep, ms));

async function fetchJson(url, attempts = 120) {
  let lastError;
  for (let index = 0; index < attempts; index += 1) {
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

async function discoverDevTools(userData, browser, stderrBuffer) {
  const activePortPath = join(userData, "DevToolsActivePort");
  for (let attempt = 0; attempt < 200; attempt += 1) {
    if (browser.exitCode !== null) {
      throw new Error(
        `Browser exited before DevTools was ready (code ${browser.exitCode}).\n${stderrBuffer()}`,
      );
    }

    if (existsSync(activePortPath)) {
      const [portLine, browserPathLine] = (await readFile(activePortPath, "utf8"))
        .trim()
        .split(/\r?\n/);
      const port = Number(portLine);
      if (Number.isInteger(port) && port > 0) {
        const version = await fetchJson(`http://127.0.0.1:${port}/json/version`, 40);
        return {
          port,
          wsUrl: version.webSocketDebuggerUrl
            || (browserPathLine ? `ws://127.0.0.1:${port}${browserPathLine}` : null),
        };
      }
    }
    await sleep(100);
  }

  throw new Error(
    `Browser did not publish DevToolsActivePort within 20 seconds.\n${stderrBuffer()}`,
  );
}

class Cdp {
  constructor(wsUrl) {
    this.nextId = 1;
    this.pending = new Map();
    this.ws = new WebSocket(wsUrl);
  }

  async open() {
    if (this.ws.readyState === WebSocket.OPEN) return;
    await new Promise((resolveOpen, rejectOpen) => {
      this.ws.addEventListener("open", resolveOpen, { once: true });
      this.ws.addEventListener("error", rejectOpen, { once: true });
      this.ws.addEventListener("message", (event) => {
        const message = JSON.parse(event.data);
        if (!message.id || !this.pending.has(message.id)) return;
        const { resolvePending, rejectPending } = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) rejectPending(new Error(JSON.stringify(message.error)));
        else resolvePending(message.result || {});
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

const snapshotExpression = String.raw`
(() => {
  const rgbToHex = (value) => {
    const match = String(value).match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (!match) return null;
    const alpha = match[4] === undefined ? 1 : Number(match[4]);
    if (alpha === 0) return null;
    return "#" + [match[1], match[2], match[3]]
      .map((component) => Number(component).toString(16).padStart(2, "0"))
      .join("");
  };

  const backgroundFor = (element) => {
    let current = element;
    while (current) {
      const background = rgbToHex(getComputedStyle(current).backgroundColor);
      if (background) return background;
      current = current.parentElement;
    }
    return "#090611";
  };

  const selector = [
    "header", "nav", "main", "section", "footer", "img", "canvas",
    "h1", "h2", "h3", "h4", "h5", "p", "a", "button",
    "[id^='project-card']", "[data-visual-role]", ".glass", ".glass-card",
    ".project-card", ".studio-signal", ".method-capability"
  ].join(",");

  const raw = Array.from(document.querySelectorAll(selector))
    .filter((element) => !element.closest("[data-spatial-ignore='true']"));
  const visible = raw.filter((element) => {
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
  });

  const ids = new Map();
  visible.forEach((element, index) => {
    const label = element.id || element.getAttribute("aria-label") || (element.textContent || "").trim().slice(0, 28) || element.tagName.toLowerCase();
    const clean = String(label).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 36);
    const prefix = element.tagName.toLowerCase() + "-" + index;
    ids.set(element, clean ? prefix + "-" + clean : prefix);
  });

  const nodes = visible.map((element) => {
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    let parent = element.parentElement;
    while (parent && !ids.has(parent)) parent = parent.parentElement;
    const zRaw = Number.parseInt(style.zIndex, 10);
    const tag = element.tagName.toLowerCase();
    const text = (element.textContent || "").trim();
    const role = element.getAttribute("role");
    const interactive = tag === "a" || tag === "button" || role === "button";
    const isText = ["h1", "h2", "h3", "h4", "h5", "p", "a", "button"].includes(tag) && text.length > 0;
    let paintRect = null;
    if (isText) {
      const range = document.createRange();
      range.selectNodeContents(element);
      const measured = range.getBoundingClientRect();
      if (measured.width > 0 && measured.height > 0) {
        paintRect = {
          x: Number(measured.x.toFixed(2)),
          y: Number(measured.y.toFixed(2)),
          right: Number(measured.right.toFixed(2)),
          bottom: Number(measured.bottom.toFixed(2)),
        };
      }
      range.detach();
    }

    return {
      id: ids.get(element),
      tag,
      role,
      text: text.slice(0, 100),
      x: Number(rect.x.toFixed(2)),
      y: Number(rect.y.toFixed(2)),
      w: Number(rect.width.toFixed(2)),
      h: Number(rect.height.toFixed(2)),
      client_w: element.clientWidth,
      client_h: element.clientHeight,
      scroll_w: element.scrollWidth,
      scroll_h: element.scrollHeight,
      z: Number.isFinite(zRaw) ? zRaw : 0,
      position: style.position,
      overflow_x: style.overflowX,
      overflow_y: style.overflowY,
      parent: parent ? ids.get(parent) : null,
      visible: true,
      interactive,
      is_text: isText,
      paint: paintRect,
      fg: rgbToHex(style.color),
      bg: backgroundFor(element),
      font_px: Number.parseFloat(style.fontSize) || 16,
      font_weight: Number.parseInt(style.fontWeight, 10) || 400,
      visual_role: element.getAttribute("data-visual-role"),
      palette_role: element.getAttribute("data-palette-role"),
    };
  });

  return {
    page: {
      scroll_width: document.documentElement.scrollWidth,
      scroll_height: document.documentElement.scrollHeight,
      client_width: document.documentElement.clientWidth,
      client_height: document.documentElement.clientHeight,
      title: document.title,
      procedural_fields: document.querySelectorAll("[data-visual-role='STUDIO_GENERATED_FRAMING'] canvas").length,
      property_spectra: document.querySelectorAll("[data-palette-role='PROPERTY_SPECTRUM'] canvas").length,
    },
    nodes,
  };
})()
`;

function relativeLuminance(hex) {
  if (!hex || !/^#[0-9a-f]{6}$/i.test(hex)) return null;
  const channels = [1, 3, 5].map((start) => Number.parseInt(hex.slice(start, start + 2), 16) / 255);
  const linear = channels.map((value) => (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4));
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrastRatio(foreground, background) {
  const fg = relativeLuminance(foreground);
  const bg = relativeLuminance(background);
  if (fg === null || bg === null) return null;
  const lighter = Math.max(fg, bg);
  const darker = Math.min(fg, bg);
  return (lighter + 0.05) / (darker + 0.05);
}

function analyzeSnapshot(snapshot, viewport) {
  const errors = [];
  const warnings = [];
  if (snapshot.page.scroll_width > viewport.w + 2) {
    errors.push({
      code: "PAGE_HORIZONTAL_OVERFLOW",
      actual: snapshot.page.scroll_width,
      expected_max: viewport.w,
    });
  }
  if (snapshot.page.procedural_fields < 1) {
    errors.push({ code: "PROCEDURAL_FIELD_MISSING" });
  }
  if (snapshot.page.property_spectra < 1) {
    errors.push({ code: "PROPERTY_SPECTRUM_MISSING" });
  }

  for (const node of snapshot.nodes) {
    const right = node.x + node.w;
    const isViewportBound = node.position !== "fixed" && node.position !== "sticky";
    if (isViewportBound && (node.x < -2 || right > viewport.w + 2)) {
      errors.push({ code: "NODE_OUTSIDE_VIEWPORT", id: node.id, x: node.x, right });
    }

    if (isViewportBound && node.is_text && node.paint
      && (node.paint.x < -2 || node.paint.right > viewport.w + 2)) {
      errors.push({
        code: "TEXT_PAINT_OUTSIDE_VIEWPORT",
        id: node.id,
        paint: node.paint,
        viewport_width: viewport.w,
      });
    }

    const clipsWidth = node.scroll_w > node.client_w + 1 && node.overflow_x !== "visible";
    const clipsHeight = node.scroll_h > node.client_h + 1 && node.overflow_y !== "visible";
    if (node.is_text && (clipsWidth || clipsHeight)) {
      errors.push({
        code: "TEXT_CLIPPED",
        id: node.id,
        client: [node.client_w, node.client_h],
        scroll: [node.scroll_w, node.scroll_h],
      });
    }

    if (node.interactive && (node.w < 32 || node.h < 32)) {
      warnings.push({ code: "SMALL_TARGET", id: node.id, size: [node.w, node.h] });
    }

    if (node.is_text) {
      const ratio = contrastRatio(node.fg, node.bg);
      const largeText = node.font_px >= 24 || (node.font_px >= 18.66 && node.font_weight >= 700);
      const minimum = largeText ? 3 : 4.5;
      if (ratio !== null && ratio < minimum) {
        warnings.push({
          code: "LOW_CONTRAST_SAMPLE",
          id: node.id,
          ratio: Number(ratio.toFixed(2)),
          minimum,
          fg: node.fg,
          bg: node.bg,
        });
      }
    }
  }

  return { errors, warnings };
}

async function captureViewport(cdp, sessionId, viewport) {
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: viewport.w,
    height: viewport.h,
    deviceScaleFactor: 1,
    mobile: viewport.w < 700,
  }, sessionId);
  await cdp.send("Page.navigate", { url: targetUrl }, sessionId);

  for (let index = 0; index < 100; index += 1) {
    const ready = await cdp.send("Runtime.evaluate", {
      expression: "document.readyState",
      returnByValue: true,
    }, sessionId);
    if (ready.result?.value === "complete") break;
    await sleep(100);
  }

  await cdp.send("Runtime.evaluate", {
    expression: "document.fonts ? document.fonts.ready : Promise.resolve()",
    awaitPromise: true,
  }, sessionId);
  await sleep(900);

  const evaluation = await cdp.send("Runtime.evaluate", {
    expression: snapshotExpression,
    returnByValue: true,
    awaitPromise: true,
  }, sessionId);

  if (evaluation.exceptionDetails) {
    const description = evaluation.exceptionDetails.exception?.description || evaluation.exceptionDetails.text || "unknown browser evaluation error";
    throw new Error(`Snapshot expression failed: ${description}`);
  }
  const snapshot = evaluation.result?.value;
  if (!snapshot?.page || !Array.isArray(snapshot.nodes)) {
    throw new Error(`Snapshot expression returned invalid data: ${JSON.stringify(evaluation)}`);
  }

  const metrics = await cdp.send("Page.getLayoutMetrics", {}, sessionId);
  const contentSize = metrics.cssContentSize || metrics.contentSize;
  const captureWidth = Math.max(viewport.w, Math.ceil(contentSize.width));
  const captureHeight = Math.max(viewport.h, Math.ceil(contentSize.height));
  const screenshot = await cdp.send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: true,
    clip: {
      x: 0,
      y: 0,
      width: captureWidth,
      height: captureHeight,
      scale: 1,
    },
  }, sessionId);

  return {
    snapshot: {
      viewport: { w: viewport.w, h: viewport.h },
      page: snapshot.page,
      nodes: snapshot.nodes,
    },
    screenshot: screenshot.data,
  };
}

async function main() {
  if (!browserPath) {
    throw new Error(`No supported browser found. Checked: ${BROWSER_CANDIDATES.join(", ")}`);
  }

  await mkdir(outDir, { recursive: true });
  const userData = await mkdtemp(join(tmpdir(), "umd-spatial-"));
  let browserStderr = "";
  const browser = spawn(browserPath, [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--disable-background-networking",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    "--remote-debugging-port=0",
    `--user-data-dir=${userData}`,
    "about:blank",
  ], { stdio: ["ignore", "ignore", "pipe"] });
  browser.stderr?.setEncoding("utf8");
  browser.stderr?.on("data", (chunk) => {
    browserStderr = (browserStderr + chunk).slice(-12000);
  });

  let totalErrors = 0;
  try {
    const devTools = await discoverDevTools(userData, browser, () => browserStderr);
    if (!devTools.wsUrl) {
      throw new Error(`DevTools websocket URL was not published.\n${browserStderr}`);
    }
    const cdp = new Cdp(devTools.wsUrl);
    await cdp.open();
    const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });
    await cdp.send("Page.enable", {}, sessionId);
    await cdp.send("Runtime.enable", {}, sessionId);

    const outputs = [];
    for (const viewport of viewports) {
      const capture = await captureViewport(cdp, sessionId, viewport);
      const analysis = analyzeSnapshot(capture.snapshot, viewport);
      totalErrors += analysis.errors.length;

      const snapshotPath = join(outDir, `snapshot-${viewport.name}.json`);
      const screenshotPath = join(outDir, `capture-${viewport.name}.png`);
      const reportPath = join(outDir, `report-${viewport.name}.json`);
      await writeFile(snapshotPath, JSON.stringify(capture.snapshot, null, 2), "utf8");
      await writeFile(screenshotPath, Buffer.from(capture.screenshot, "base64"));
      await writeFile(reportPath, JSON.stringify(analysis, null, 2), "utf8");

      outputs.push({
        viewport: viewport.name,
        snapshot: snapshotPath,
        screenshot: screenshotPath,
        report: reportPath,
        nodes: capture.snapshot.nodes.length,
        errors: analysis.errors.length,
        warnings: analysis.warnings.length,
      });
    }

    cdp.close();
    console.log(JSON.stringify({
      result: totalErrors === 0 ? "PASS" : "FAIL",
      targetUrl,
      browserPath,
      devToolsPort: devTools.port,
      outputs,
    }, null, 2));
  } finally {
    browser.kill();
    try {
      await rm(userData, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
    } catch {
      // Browser crash handlers can briefly retain files after headless exit.
    }
  }

  if (totalErrors > 0) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
