#!/bin/bash

# Navigate to the project directory
cd "$(dirname "$0")"

# Check if node_modules exists, if not, run npm install
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

echo "Starting Event Volunteer Management System..."
node server.js
