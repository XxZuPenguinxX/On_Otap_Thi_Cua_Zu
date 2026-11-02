import re
import unittest
from pathlib import Path
from urllib.parse import urlsplit


ROOT = Path(__file__).resolve().parents[1]
URL_PATTERN = re.compile(r"""https?://[^\s"'<>`]+""", re.IGNORECASE)
LOCAL_HOSTS = {"localhost", "127.0.0.1", "::1"}


class OfflineGuardTests(unittest.TestCase):
    def test_shipped_frontend_has_no_non_local_urls(self):
        frontend = ROOT / "web"
        for path in frontend.glob("*"):
            if path.suffix not in {".html", ".js", ".css"}:
                continue
            for url in URL_PATTERN.findall(path.read_text(encoding="utf-8")):
                host = urlsplit(url.rstrip("),.;")).hostname
                self.assertIn(host, LOCAL_HOSTS, f"External URL in {path.name}: {url}")

    def test_network_calls_are_confined_to_local_ollama_guard(self):
        source = (ROOT / "server.py").read_text(encoding="utf-8")
        self.assertIn("return LOCAL_OPENER.open(request, timeout=timeout)", source)
        self.assertNotIn("urllib.request.urlopen(", source)
        self.assertNotIn("requests.get(", source)


if __name__ == "__main__":
    unittest.main()
