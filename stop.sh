#!/bin/bash

echo "Stopping Canteen App servers..."

# Kill processes on port 5173 (frontend) and 3001 (API)
lsof -ti :5173 | xargs kill -9 2>/dev/null
lsof -ti :3001 | xargs kill -9 2>/dev/null

echo "Done. Both servers have been stopped."
