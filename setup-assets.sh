#!/bin/bash

# Loop Asset Setup Script
# This script copies logo and sound files to the correct locations

echo "🎵 Setting up Loop assets..."

# Create directories
mkdir -p loop-app/public/sounds

# Copy sound files
echo "📁 Copying sound files..."
cp "Logo and Effects/Answer-Selection-Click-Sfx.mp3" "loop-app/public/sounds/"
cp "Logo and Effects/Quiz-Start-Countdown-Sfx.mp3" "loop-app/public/sounds/"
cp "Logo and Effects/Quizc-End-Chime-Sfx.mp3" "loop-app/public/sounds/"
cp "Logo and Effects/Timer-Sfx.mp3" "loop-app/public/sounds/"
cp "Logo and Effects/Subtle-Landing-Page-Music-Sfx.mp3" "loop-app/public/sounds/"

# Copy logo files
echo "🎨 Copying logo files..."
cp "Logo and Effects/Loop-Logo-YellowBG.png" "loop-app/public/icon.png"
cp "Logo and Effects/Loop-Logo-YellowBG.png" "loop-app/public/apple-icon.png"
cp "Logo and Effects/Loop-Logo-YellowBG.png" "loop-app/public/og-image.png"
cp "Logo and Effects/Loop-Logo-YellowBG.png" "loop-app/public/icon-192.png"
cp "Logo and Effects/Loop-Logo-YellowBG.png" "loop-app/public/icon-512.png"
cp "Logo and Effects/Loop-Logo-Transparent-Text.png" "loop-app/public/logo-transparent.png"

# Create favicon (you may need to manually convert PNG to ICO format)
echo "⚠️  Note: You may need to manually convert icon.png to favicon.ico"
echo "    You can use an online tool like https://favicon.io/favicon-converter/"

echo "✅ Asset setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Convert loop-app/public/icon.png to favicon.ico"
echo "2. Restart the Next.js dev server"
echo "3. Test sounds by toggling the volume icon"
