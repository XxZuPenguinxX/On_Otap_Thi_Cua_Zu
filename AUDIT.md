# LocalNote audit

## Stack and structure

- Python standard-library HTTP server (`server.py`) with SQLite persistence; `pypdf` is the only declared dependency.
- `web/` contains the static HTML, CSS, JavaScript, and locally bundled study GIF. `tests/test_server.py` contains Python unit tests.
- Study documents and assistant turns are stored in `%LOCALAPPDATA%\LocalNote\study.sqlite3` on Windows.

## Existing capabilities

The app already supports 13 school subjects, multiple exam combinations, Vietnamese/English UI, local Ollama model discovery and selection, text/Markdown/PDF sources, keyword-based source selection, summaries, double-checking, five-question quizzes, essay rubric feedback, assistant chat history, and local SQLite persistence. The server binds to loopback and uses parameterized SQL for current document and conversation operations.

## Missing or incomplete capabilities

- There are no notebooks, editable notes, DOCX ingestion, source chunks, embeddings, vector retrieval, exact passage/page citations, source-selection controls, flashcards/spaced repetition, import/export, or delete-all-data workflow.
- Responses are non-streaming; chat has no stop/regenerate/copy controls. There is no command palette, keyboard help, panel layout system, or theme editor.
- Model fallback exists for failed generations, but there is no configured embedding-model discovery or embedding status. Context size and keep-alive are not exposed as configuration.
- Education headlines and public HTTPS import require external network access; these conflict with the requested fully-offline guarantee.

## Network request inventory before cleanup

| Caller | Destination | Purpose |
|---|---|---|
| Browser `fetch()` in `web/app.js` | Same-origin `/api/*` | Local app API calls only. |
| `ollama_tags()` in `server.py` | Configured loopback Ollama `/api/tags` | Discover installed local models. |
| `ollama_generate()` in `server.py` | Configured loopback Ollama `/api/generate` | Generate local study responses. |
| `fetch_public_page()` / `/api/documents/import-url` | User-entered public HTTPS URL (redirects followed) | Import external pages; may contact any public host. |
| `fetch_news()` / `/api/news` | VnExpress, Tuổi Trẻ, Thanh Niên, VietnamNet RSS | Load education headlines. |
| `search_trusted_sources()` / `/api/search` | Google News RSS | Search education headlines. |
| Browser-rendered source/headline anchors | External sites from imported source/news results | Open external pages in a new tab. |

No CDN, remote font, analytics, or update-check request was present in the shipped HTML. Fonts use local system fallbacks. On this branch, public-page import and news/search routes, their external anchors, and the related feed/scraping code have been removed. The local-only outbound wrapper blocks non-loopback HTTP requests and refuses redirects; the browser API helper only permits same-origin `/api/` paths.

## Phase A changes

- Removed education news, RSS/search, public web-page importing, their routes, UI, and unused scraping code.
- Kept paste/upload source intake. Runtime network use now goes only to same-origin LocalNote APIs and loopback Ollama.
- Added frontend URL and Python loopback-guard tests.
- Added configurable chat-model preference, context size, keep-alive, and optional Qwen3 thinking mode. Existing documents and chat tables were not migrated or modified.
