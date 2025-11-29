@echo off
REM RAOU Website Launcher for Windows
REM Double-click this file to start the website

echo ======================================
echo   RAOU Travel Website Launcher
echo ======================================
echo.

REM Get the directory where this script is located
cd /d "%~dp0"

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing dependencies...
    echo This may take a few minutes...
    echo.
    call npm install
    echo.
    echo Installation complete!
    echo.
)

echo Starting the website and upload server...
echo.
echo The website will open automatically in your browser.
echo If it doesn't open, go to: http://localhost:8080
echo.
echo Press Ctrl+C to stop the servers
echo ======================================
echo.

REM Start both servers
start /B npm run dev:all

REM Wait a moment for the servers to start
timeout /t 3 /nobreak >nul

REM Open the browser
start http://localhost:8080

REM Keep the window open
pause
