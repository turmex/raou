#!/bin/bash

# RAOU Unified Launcher
# Handles setup, cleanup, and launching of the website or editor

# Get the directory where this script is located
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

# ==========================================
# 1. CLEANUP PREVIOUS PROCESSES
# ==========================================
kill_port() {
  PORT=8080
  PID=$(lsof -ti:$PORT)
  if [ -n "$PID" ]; then
    echo "Stopping previous server instance (PID: $PID)..."
    kill -9 $PID 2>/dev/null
  fi
}
kill_port

# ==========================================
# 2. DEPENDENCY CHECK & INSTALL
# ==========================================
echo "Checking environment..."

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "Node.js not found globally. Checking local portable installation..."
    
    LOCAL_NODE_DIR="$DIR/local_node"
    export PATH="$LOCAL_NODE_DIR/bin:$PATH"
    
    if ! command -v node &> /dev/null; then
        echo "Installing portable Node.js..."
        # (Simplified install logic for brevity, assuming user might have internet or we can copy local_node if we want to bundle it later. 
        # For 'Lite' version, we assume they might need to download it or have it installed.)
        
        ARCH=$(uname -m)
        if [ "$ARCH" == "x86_64" ]; then NODE_ARCH="x64"; elif [ "$ARCH" == "arm64" ]; then NODE_ARCH="arm64"; fi
        NODE_VER="v20.11.0"
        NODE_DIST="node-$NODE_VER-darwin-$NODE_ARCH"
        NODE_URL="https://nodejs.org/dist/$NODE_VER/$NODE_DIST.tar.gz"
        
        curl -L "$NODE_URL" -o node.tar.gz
        tar -xzf node.tar.gz
        rm node.tar.gz
        rm -rf "$LOCAL_NODE_DIR"
        mv "$NODE_DIST" "$LOCAL_NODE_DIR"
        export PATH="$LOCAL_NODE_DIR/bin:$PATH"
    fi
fi

# Check for node_modules
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies (First run only)..."
    echo "This may take a minute..."
    npm install
fi

# ==========================================
# 3. GUI SELECTION
# ==========================================
# Use AppleScript to show a dialog
CHOICE=$(osascript -e 'display dialog "Welcome to Raou Travel!\n\nWhat would you like to open?" buttons {"Quit", "Editor", "Website"} default button "Website" with icon note')

if [[ $CHOICE == *"Quit"* ]]; then
    exit 0
fi

# ==========================================
# 4. START SERVER
# ==========================================
echo "🚀 Starting server..."
npm run dev:all &
SERVER_PID=$!

# Wait for server
max_attempts=60
attempt=1
server_ready=false
while [ $attempt -le $max_attempts ]; do
    if curl -s http://localhost:8080 > /dev/null; then
        server_ready=true
        break
    fi
    sleep 1
    ((attempt++))
done

if [ "$server_ready" = true ]; then
    if [[ $CHOICE == *"Editor"* ]]; then
        open http://localhost:8080/admin/editor
    else
        open http://localhost:8080
    fi
else
    echo "⚠️ Server start timed out."
fi

# Keep terminal open
wait $SERVER_PID
