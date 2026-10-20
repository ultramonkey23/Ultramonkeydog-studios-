"""Independent built-output check; run after npm run build. No network or writes."""
from pathlib import Path
from html.parser import HTMLParser
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = "https://ultramonkeydog-studios.vercel.app"


class Links(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.links = []
        self.alternates = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "a":
            self.links.append(attrs.get("href", ""))
        if tag == "link" and attrs.get("rel") == "alternate":
            self.alternates.append(attrs)


def verify(xml):
    root = ET.fromstring(xml)
    assert root.tag == "rss" and root.attrib["version"] == "2.0"
    channel = root.find("channel")
    for name in ("title", "link", "description"):
        assert channel.findtext(name), name
    assert channel.findtext("link") == ORIGIN + "/dispatches"
    self_link = channel.find("{http://www.w3.org/2005/Atom}link")
    assert self_link.attrib == {"href": ORIGIN + "/feed.xml", "rel": "self", "type": "application/rss+xml"}
    items = channel.findall("item")
    archive = Links((ROOT / "dist/dispatches/index.html").read_text())
    archived = {ORIGIN + x for x in archive.links if x.startswith("/dispatches/")}
    urls = [i.findtext("link").split("?")[0] for i in items]
    assert len(urls) == len(set(urls)) and set(urls) == archived
    assert urls[0].endswith("/keep-the-strange-in-your-feed")
    for item in items:
        link = item.findtext("link")
        url = link.split("?")[0]
        assert link.endswith("?utm_source=rss&utm_medium=feed&utm_campaign=studio_dispatches")
        guid = item.find("guid")
        assert guid.text == url and guid.attrib["isPermaLink"] == "true"
        assert item.findtext("title") and item.findtext("description")
        assert item.find("pubDate") is None, "No invented exact publication timestamps"
        html = ROOT / "dist" / url.removeprefix(ORIGIN + "/") / "index.html"
        assert html.is_file(), url
        page_links = Links(html.read_text())
        assert any(x.get("href") == "/feed.xml" for x in page_links.alternates)
    for name in ("index.html", "follow/index.html", "dispatches/index.html"):
        html = (ROOT / "dist" / name).read_text()
        assert "anonymous mad-scientist" not in html
        assert any(x.get("type") == "application/rss+xml" for x in Links(html).alternates)
    return len(items)


xml = (ROOT / "dist/feed.xml").read_text()
count = verify(xml)
for bad in (xml.replace('version="2.0"', 'version="0.0"'),
            xml.replace('<guid isPermaLink="true">', '<guid isPermaLink="false">', 1),
            xml.replace("<item>", "<item><pubDate>invented</pubDate>", 1)):
    try:
        verify(bad)
    except AssertionError:
        pass
    else:
        raise AssertionError("Negative control escaped validation")
print(f"PASS: {count} RSS items match the archive and built pages; autodiscovery and negative controls pass")
