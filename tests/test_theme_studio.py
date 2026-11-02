import re
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class ThemeStudioIntegrationTests(unittest.TestCase):
    def test_theme_studio_loads_before_the_app_and_renders_in_settings(self):
        index = (ROOT / "web" / "index.html").read_text(encoding="utf-8")
        app = (ROOT / "web" / "app.js").read_text(encoding="utf-8")
        theme = (ROOT / "web" / "theme-studio.js").read_text(encoding="utf-8")

        self.assertIn('<script src="/theme-studio.js" defer></script>', index)
        self.assertLess(index.index("/theme-studio.js"), index.index("/app.js"))
        self.assertIn("LocalNoteThemeStudio.render(state.language)", app)
        for handler in ("handleClick", "handleInput", "handleChange", "setGenerating"):
            self.assertIn(f"LocalNoteThemeStudio?.{handler}", app)
            self.assertIn(f"{handler}", theme)

    def test_theme_controls_do_not_require_inline_styles_or_weaken_csp(self):
        index = (ROOT / "web" / "index.html").read_text(encoding="utf-8")
        app = (ROOT / "web" / "app.js").read_text(encoding="utf-8")
        theme = (ROOT / "web" / "theme-studio.js").read_text(encoding="utf-8")
        server = (ROOT / "server.py").read_text(encoding="utf-8")

        for source in (index, app, theme):
            self.assertIsNone(re.search(r"\sstyle\s*=", source, re.IGNORECASE))
        self.assertIn("style-src 'self'", server)
        self.assertNotIn("style-src 'self' 'unsafe-inline'", server)

    def test_theme_preferences_and_accessible_theme_controls_are_wired(self):
        theme = (ROOT / "web" / "theme-studio.js").read_text(encoding="utf-8")
        stylesheet = (ROOT / "web" / "style.css").read_text(encoding="utf-8")

        self.assertIn('"localnote-theme-studio"', theme)
        self.assertIn('data-theme-option="warm"', theme)
        self.assertIn('data-theme-option="motion"', theme)
        self.assertIn('data-theme-action="import"', theme)
        self.assertIn('data-theme-action="export"', theme)
        self.assertIn("aria-pressed=", theme)
        self.assertIn("data-smart-calm", stylesheet)
        self.assertIn("prefers-reduced-motion: reduce", stylesheet)


if __name__ == "__main__":
    unittest.main()
