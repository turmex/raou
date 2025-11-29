#!/bin/bash

# RAOU Content Editor Launcher
# Double-click this file to start the content editor

echo "======================================"
echo "  RAOU Content Editor Launcher"
echo "======================================"
echo ""

# Get the directory where this script is located
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

# Function to kill existing processes on port 8080
kill_port() {
  PORT=8080
  # echo "Checking for existing processes on port $PORT..."
  PID=$(lsof -ti:$PORT)
  if [ -n "$PID" ]; then
    echo "Stopping previous server instance (PID: $PID)..."
    kill -9 $PID 2>/dev/null
  fi
}

# Kill previous instances
kill_port

# Add common paths to PATH
export PATH=$PATH:/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "Node.js not found globally. Checking local portable installation..."
    
    # Define Local Node Path
    LOCAL_NODE_DIR="$DIR/local_node"
    # Add local node bin to PATH
    export PATH="$LOCAL_NODE_DIR/bin:$PATH"
    
    if ! command -v node &> /dev/null; then
        echo "Local Node.js not found. Installing portable Node.js..."
        
        # Detect Architecture
        ARCH=$(uname -m)
        if [ "$ARCH" == "x86_64" ]; then
            NODE_ARCH="x64"
        elif [ "$ARCH" == "arm64" ]; then
            NODE_ARCH="arm64"
        else
            echo "❌ Unsupported architecture: $ARCH"
            echo "Press any key to exit..."
            read -n 1
            exit 1
        fi
        
        NODE_VER="v20.11.0"
        NODE_DIST="node-$NODE_VER-darwin-$NODE_ARCH"
        NODE_URL="https://nodejs.org/dist/$NODE_VER/$NODE_DIST.tar.gz"
        
        echo "Downloading Node.js $NODE_VER for $NODE_ARCH..."
        echo "This may take a minute..."
        curl -L "$NODE_URL" -o node.tar.gz
        
        if [ $? -ne 0 ]; then
             echo "❌ Failed to download Node.js."
             echo "Please check your internet connection."
             rm node.tar.gz 2>/dev/null
             echo "Press any key to exit..."
             read -n 1
             exit 1
        fi
        
        echo "Extracting Node.js..."
        tar -xzf node.tar.gz
        rm node.tar.gz
        
        # Move to a standard location
        rm -rf "$LOCAL_NODE_DIR"
        mv "$NODE_DIST" "$LOCAL_NODE_DIR"
        
        # Update PATH again
        export PATH="$LOCAL_NODE_DIR/bin:$PATH"
        
        echo "✅ Node.js installed locally."
    fi
fi

# Verify Node again
if ! command -v node &> /dev/null; then
    echo "❌ Error: Could not install or find Node.js."
    echo "Press any key to exit..."
    read -n 1
    exit 1
fi

echo "Using Node.js: $(node -v)"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 First time setup - Installing dependencies..."
    echo "This may take a few minutes..."
    echo ""
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Error: Failed to install dependencies."
        echo "Press any key to exit..."
        read -n 1
        exit 1
    fi
    echo ""
    echo "✅ Installation complete!"
    echo ""
fi

echo "🚀 Starting the content editor and upload server..."
echo ""
echo "The editor will open automatically in your browser once ready."
echo "Default password: raou2024"
echo ""
echo "If it doesn't open, go to: http://localhost:8080/admin/editor"
echo ""
echo "Press Ctrl+C to stop the servers"
echo "======================================"
echo ""

# Start both the development server and upload server
npm run dev:all &
SERVER_PID=$!

# Wait for the server to start
echo "Waiting for server to be ready..."
max_attempts=60
attempt=1
server_ready=false

while [ $attempt -le $max_attempts ]; do
    if curl -s http://localhost:8080 > /dev/null; then
        server_ready=true
        break
    fi
    if [ $((attempt % 5)) -eq 0 ]; then
        echo "Still waiting... ($attempt/$max_attempts)"
    fi
    sleep 1
    ((attempt++))
done

if [ "$server_ready" = true ]; then
    echo "✅ Server is up! Opening browser..."
    sleep 1 # Give it just one more second to be sure
    open http://localhost:8080/admin/editor
else
    echo "⚠️  Warning: Server took too long to respond."
    echo "Please try opening http://localhost:8080/admin/editor manually."
fi

# Keep the terminal open and wait for the server process
wait $SERVER_PID
