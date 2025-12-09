# Loop Quiz App

## Images
- **Loop-Logo-YellowBG.png** → favicon.ico, icon.png, apple-icon.png, og-image.png
- **Loop-Logo-Transparent-Text.png** → Used in components

## Sounds
- **Answer-Selection-Click-Sfx.mp3** → Play when user selects/changes an answer
- **Quiz-Start-Countdown-Sfx.mp3** → Play when quiz starts (3-2-1 countdown feel)
- **Quizc-End-Chime-Sfx.mp3** → Play when quiz completes successfully
- **Timer-Sfx.mp3** → Play when timer gets low (< 10 seconds)
- **Subtle-Landing-Page-Music-Sfx.mp3** → Loop in background on landing page

## Setup Instructions

1. Copy logo files to public folder:
   - Loop-Logo-YellowBG.png → public/icon.png
   - Loop-Logo-Transparent-Text.png → public/logo-transparent.png

2. Create favicon from yellow BG logo

3. Copy all sound files to public/sounds/

4. Sounds are managed by lib/sounds.ts and can be toggled via SoundToggle component
