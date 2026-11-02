# LocalNote

LocalNote is an offline-first study app for midterm, final, and Vietnamese high-school graduation exam preparation. It runs locally with Ollama and stores study materials and assistant history in SQLite on your computer.

## System requirements

| Component | Minimum | Recommended |
|---|---|---|
| OS | Windows 10 64-bit, macOS 12+, Ubuntu 20.04+ | Windows 11, macOS 13+, Ubuntu 22.04+ |
| CPU | 4 cores | 6+ cores |
| RAM | 8 GB | 16 GB+ |
| Free storage | 10 GB for the app and one small model | 25 GB+ for multiple models and materials |
| GPU | Not required for small models | Ollama-compatible GPU with 6–8 GB VRAM or more |
| Python | 3.10+ | 3.12+ |
| Node.js / npm | Not required | Not required |
| Git | Optional when downloading a ZIP | Current version for cloning/updating |
| Ollama | Current stable release; required for AI features | Current stable release |
| Docker | Not required | Not required |

### Reference model tiers

| Hardware | Model tier to try | Notes |
|---|---|---|
| 8 GB RAM, no discrete GPU | Smaller models around 1B–3B parameters | Prefer a small quantized build; generation and verification can be slow. |
| 16 GB RAM | Around 3B–7B parameters | Speed and quality vary with hardware, model, and context. |
| 6–8 GB VRAM | Around 3B–7B parameters | Larger models or long context may spill into system RAM. |
| 12 GB+ VRAM | 7B+ may be worth trying | Quantization, context, and available VRAM still matter. |
| Apple Silicon | Smaller models on 8 GB unified memory; more options from 16 GB | Unified memory is shared with macOS and other apps. |

These are suggestions, not performance guarantees. A large model can be slow without sufficient VRAM; Ollama can use system RAM instead, typically at lower speed. An 8B model may spill into system RAM on an RTX 3050 with 6 GB VRAM and 16 GB RAM.

Small chat models may use around 1–5 GB of disk; larger models can use multiple or tens of gigabytes. The app stores text and chat history in SQLite and currently has no separate vector database.

### Model configuration

The app does not require one fixed chat model. It lists installed Ollama models and lets you select one in **Settings**. Set `OLLAMA_MODEL` to prefer an installed model; otherwise it prefers `qwen3:8b`, then `gemma3:4b`, then another installed chat model. Change those preferences with `OLLAMA_MODEL_PREFERENCE` (comma-separated names). Qwen3 thinking is off by default; enable it in Settings if the selected model supports it.

Context size defaults to 8192 (`OLLAMA_NUM_CTX`); Ollama keep-alive defaults to `10m` (`OLLAMA_KEEP_ALIVE`). Lower `OLLAMA_NUM_CTX` if memory is constrained.

## Install on Windows

### 1. Install Python and Ollama

1. Install Python 3.10 or later from [python.org](https://www.python.org/downloads/). Select **Add python.exe to PATH**.
2. Install Ollama from [ollama.com](https://ollama.com/download) and keep it running while using AI.
3. In PowerShell, download a compatible chat model, for example:

   ```powershell
   ollama pull qwen3:8b
   ollama list
   ```

   Replace the example model with one suited to your hardware. If a model is missing, run `ollama pull <model-name>` for the exact model you want.

### 2. Get the project and install PDF support

Using Git:

```powershell
git clone https://github.com/XxZuPenguinxX/On_Otap_Thi_Cua_Zu.git
cd On_Otap_Thi_Cua_Zu
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

Or download and extract the repository ZIP from GitHub. `pypdf` enables text extraction from selectable-text PDFs. Scanned image PDFs do not have OCR support; paste recognized text or convert them to text-enabled PDFs.

### 3. Start LocalNote

Double-click `start-localnote.bat`, or run in PowerShell:

```powershell
python server.py
```

Open `http://127.0.0.1:8765` in your browser and keep the command window and Ollama running. Press **Ctrl+C** in the command window to stop LocalNote. If port 8765 is already in use:

```powershell
$env:PORT = "8766"
python server.py
```

Then open `http://127.0.0.1:8766`.

## Study workflow

1. Select one or more exam combinations from the top bar.
2. Add notes by pasting text or upload `.txt`, `.md`, or selectable-text `.pdf` files in **Your sources**.
3. Choose a subject and create a summary, double-check, or five-question practice quiz from saved materials.
4. For Literature, request rubric-based formative feedback on an essay.
5. Use **Study assistant** for subject questions grounded in your sources.

The app does not fetch external websites or education news. Runtime network requests are limited to the LocalNote server and the Ollama server on loopback. Downloading the app, installing Ollama/models, and installing Python packages require Internet during setup.

## Local data and privacy

Documents and completed assistant turns are stored in SQLite outside the Git repository. On Windows, the default path is `%LOCALAPPDATA%\LocalNote\study.sqlite3`; Settings shows the exact path. Stop the app before copying this file for backup. Language, selected model, exam combinations, and Qwen3 thinking preference are stored in the browser profile.

The HTTP server binds to `127.0.0.1`. Study content is sent only to the local Ollama service for AI generation; there is no telemetry or cloud AI fallback. Model output may still be inaccurate, so check important claims against your original material.

## Tests

Run from the project folder:

```powershell
python -m unittest discover -s tests -v
```

The offline-guard tests check shipped frontend URLs and enforce the loopback-only outbound request wrapper.

## Troubleshooting

| Issue | Resolution |
|---|---|
| `python` is not recognized | Reinstall Python, enable **Add python.exe to PATH**, and open a new PowerShell window. |
| Ollama is offline | Start the Ollama app or run `ollama serve`. |
| No chat model appears | Run `ollama list`; install the chosen model with `ollama pull <model-name>`. |
| Generation is slow or runs out of VRAM | Select a smaller quantized model, close GPU-heavy apps, or lower `OLLAMA_NUM_CTX`. |
| PDF import fails | Run `python -m pip install -r requirements.txt`; scanned PDFs need OCR outside LocalNote. |
| Port 8765 is busy | Set `$env:PORT = "8766"` and restart the app. |

## Tiếng Việt

Xem hướng dẫn tiếng Việt chi tiết trong [README.md](README.md).
