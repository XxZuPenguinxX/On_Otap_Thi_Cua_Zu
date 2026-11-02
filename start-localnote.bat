@echo off
setlocal
cd /d "%~dp0"

where python >nul 2>nul
if errorlevel 1 (
  echo Python 3.10 or later was not found. Install Python and enable Add Python to PATH.
  pause
  exit /b 1
)

echo Starting LocalNote. Keep this window open while you study.
echo Your local database is stored under "%LOCALAPPDATA%\LocalNote\study.sqlite3"
start "" /min powershell.exe -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 2; Start-Process 'http://127.0.0.1:8765'"
python server.py

if errorlevel 1 (
  echo LocalNote stopped with an error. Check the message above.
  pause
)
