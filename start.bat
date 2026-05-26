@echo off
echo ================================
echo   School Canteen App - Setup
echo ================================
echo.

:: Check Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed.
    echo Please ask your session leader for help.
    pause
    exit /b 1
)

echo Node.js found. Installing dependencies...
echo.

:: Install frontend dependencies
echo [1/2] Installing app dependencies...
call npm install --registry https://registry.npmjs.org/
if %errorlevel% neq 0 (
    echo ERROR: Failed to install app dependencies.
    pause
    exit /b 1
)

:: Install server dependencies
echo.
echo [2/2] Installing server dependencies...
cd server
call npm install --registry https://registry.npmjs.org/
if %errorlevel% neq 0 (
    echo ERROR: Failed to install server dependencies.
    pause
    exit /b 1
)
cd ..

echo.
echo ================================
echo   Setup complete! Starting app...
echo ================================
echo.
echo The app will open in your browser shortly.
echo Keep this window open while you work.
echo.

:: Start the API server in a new window
start "Canteen API Server" cmd /k "cd server && npm run dev"

:: Wait for API server to start
timeout /t 3 /nobreak >nul

:: Start the frontend dev server in a new window
start "Canteen Frontend" cmd /k "npm run dev"

:: Wait for frontend to start then open browser
timeout /t 4 /nobreak >nul
start http://localhost:5173
start http://localhost:3001/docs

echo Both servers are running.
echo - App:     http://localhost:5173
echo - API:     http://localhost:3001
echo - API Docs: http://localhost:3001/docs
echo.
echo To stop: close the two server windows.
pause
