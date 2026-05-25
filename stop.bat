@echo off
echo Stopping Canteen App servers...

:: Kill processes on port 5173 (frontend) and 3001 (API)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5173"') do taskkill /F /PID %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3001"') do taskkill /F /PID %%a >nul 2>&1

echo Done. Both servers have been stopped.
pause
