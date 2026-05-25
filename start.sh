#!/bin/bash

echo "================================"
echo "  School Canteen App - Setup"
echo "================================"
echo ""

# Check Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed."
    echo "Install it from https://nodejs.org then try again."
    exit 1
fi

echo "Node.js found. Installing dependencies..."
echo ""

# Get the directory where this script lives
DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR"

echo "[1/2] Installing app dependencies..."
npm install || { echo "ERROR: Failed to install app dependencies."; exit 1; }

echo ""
echo "[2/2] Installing server dependencies..."
cd server && npm install || { echo "ERROR: Failed to install server dependencies."; exit 1; }
cd "$DIR"

echo ""
echo "================================"
echo "  Setup complete! Starting app..."
echo "================================"
echo ""
echo "The app will open in your browser shortly."
echo "Keep this window open while you work."
echo ""

# Start API server in a new terminal tab
osascript -e "tell application \"Terminal\" to do script \"cd '$DIR/server' && npm run dev\""

# Wait for API server to start
sleep 3

# Start frontend in a new terminal tab
osascript -e "tell application \"Terminal\" to do script \"cd '$DIR' && npm run dev\""

# Wait for frontend to start then open browser
sleep 4
open http://localhost:5173
open http://localhost:3001/docs

echo "Both servers are running."
echo " - App:      http://localhost:5173"
echo " - API:      http://localhost:3001"
echo " - API Docs: http://localhost:3001/docs"
echo ""
echo "To stop: close the two Terminal windows."
