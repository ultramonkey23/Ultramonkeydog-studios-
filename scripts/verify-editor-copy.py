"""Independent built-output checks for the public editor handoff."""
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PAGE = ROOT / "dist/dispatches/silhouette-before-surface-editor-copy/index.html"
DOWNLOAD = ROOT / "dist/media/silhouette-before-surface-editor-copy.txt"


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.links = []
        self.ids = set()
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "a":
            self.links.append(attrs.get("href", ""))
        if attrs.get("id"):
            self.ids.add(attrs["id"])


html = PAGE.read_text()
plain = DOWNLOAD.read_text()
parsed = Page(html)
assert "One article." in html and "FULL REVIEW COPY" in html
assert "Measurement is a witness, not a taste engine" in html
assert "/media/silhouette-before-surface-editor-copy.txt" in parsed.links
assert "/dispatches/silhouette-before-surface" in parsed.links
assert "copy-title" in parsed.ids and "facts-title" in parsed.ids
assert "Contact Cody Haring before reposting" in plain
assert "No fee, placement, acceptance or publication rights are implied" in plain
assert len(html.split()) > 1400
assert len(plain.split()) > 1200
print("PASS: editor page contains full review copy, facts, reuse boundary, canonical route and download")
