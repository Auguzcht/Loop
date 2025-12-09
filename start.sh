#!/bin/bash

# Quick Start Script for Loop Quiz App
# Run this to start both backend and frontend servers

echo "Starting Loop Quiz App..."
echo ""

# Check if we're in the right directory
if [ ! -d "loop-api" ] || [ ! -d "loop-app" ]; then
    echo "Error: Please run this script from the Loop repository root"
    exit 1
fi

# Function to check if a port is in use
check_port() {
    lsof -i :$1 > /dev/null 2>&1
    return $?
}

# Kill existing processes on ports
echo "🔍 Checking for existing processes..."
if check_port 8787; then
    echo "Port 8787 is in use. Killing process..."
    lsof -ti :8787 | xargs kill -9 2>/dev/null
fi

if check_port 3000; then
    echo "Port 3000 is in use. Killing process..."
    lsof -ti :3000 | xargs kill -9 2>/dev/null
fi

# Start backend in background
echo ""
echo "🔧 Starting Backend API on port 8787..."
cd loop-api
npm run dev > ../backend.log 2>&1 &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"
cd ..

# Wait for backend to start
echo "⏳ Waiting for backend to initialize..."
sleep 3

# Check if backend is running
if check_port 8787; then
    echo "✅ Backend API started successfully"
else
    echo "❌ Backend API failed to start. Check backend.log for details."
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

# Start frontend in background
echo ""
echo "Starting Frontend on port 3000..."
cd loop-app
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"
cd ..

# Wait for frontend to start
echo "⏳ Waiting for frontend to initialize..."
sleep 5

# Check if frontend is running
if check_port 3000; then
    echo "Frontend started successfully"
else
    echo "Frontend failed to start. Check frontend.log for details."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 1
fi

echo ""
echo "Loop Quiz App is running!"
echo ""
echo "URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:8787"
echo ""
echo "Logs:"
echo "   Backend:  tail -f backend.log"
echo "   Frontend: tail -f frontend.log"
echo ""
echo "To stop:"
echo "   kill $BACKEND_PID $FRONTEND_PID"
echo "   or press Ctrl+C and run: killall node"
echo ""
echo "💡 Opening browser in 3 seconds..."
sleep 3

# Open browser (macOS)
open http://localhost:3000

# Keep script running
echo ""
echo "Press Ctrl+C to stop servers..."
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo ''; echo '🛑 Servers stopped'; exit 0" INT
wait
