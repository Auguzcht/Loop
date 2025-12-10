// Sound effects manager for Loop app
class SoundManager {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private isMuted: boolean = false;
  private hasInteracted: boolean = false;
  private pendingBackgroundPlay: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      // Initialize sounds
      this.loadSound('click', '/sounds/Answer-Selection-Click-Sfx.mp3');
      this.loadSound('pageClick', '/sounds/Quiz-Page-Button-Click-Sfx.mp3');
      this.loadSound('countdown', '/sounds/Quiz-Start-Countdown-Sfx.mp3');
      this.loadSound('end', '/sounds/Quizc-End-Chime-Sfx.mp3');
      this.loadSound('timer', '/sounds/Timer-Sfx.mp3');
      this.loadSound('background', '/sounds/Subtle-Landing-Page-Music-Sfx.mp3');

      // Check if user prefers muted
      const savedMutedState = localStorage.getItem('loop-sound-muted');
      this.isMuted = savedMutedState === 'true';

      // Set up user interaction listeners to enable autoplay
      this.setupInteractionListeners();
    }
  }

  private setupInteractionListeners() {
    if (typeof window === 'undefined') return;

    const enableAudio = () => {
      this.hasInteracted = true;
      
      // If background music was pending, play it now
      if (this.pendingBackgroundPlay) {
        this.play('background');
        this.pendingBackgroundPlay = false;
      }

      // Remove listeners after first interaction
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
      document.removeEventListener('keydown', enableAudio);
    };

    document.addEventListener('click', enableAudio);
    document.addEventListener('touchstart', enableAudio);
    document.addEventListener('keydown', enableAudio);
  }

  private loadSound(name: string, path: string) {
    if (typeof window === 'undefined') return;

    const audio = new Audio(path);
    audio.preload = 'auto';
    audio.muted = this.isMuted; // Apply current mute state
    
    // Background music and timer should loop
    if (name === 'background' || name === 'timer') {
      audio.loop = true;
      audio.volume = name === 'background' ? 0.3 : 0.4; // Lower volume for background/timer
    } else {
      audio.volume = 0.5;
    }

    this.sounds.set(name, audio);
  }

  play(soundName: string) {
    if (typeof window === 'undefined') return;

    const sound = this.sounds.get(soundName);
    if (sound) {
      // For background music, check if it's already playing
      if (soundName === 'background' && !sound.paused) {
        return; // Already playing, don't restart
      }

      // Reset to start if not a looping sound or if it's finished
      if (soundName !== 'background' && soundName !== 'timer') {
        sound.currentTime = 0;
      }
      
      const playPromise = sound.play();
      
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log('Sound play failed (autoplay blocked):', err);
          
          // If it's background music and autoplay is blocked, mark as pending
          if (soundName === 'background' && !this.hasInteracted) {
            this.pendingBackgroundPlay = true;
            console.log('Background music will play after user interaction');
          }
        });
      }
    }
  }

  stop(soundName: string) {
    const sound = this.sounds.get(soundName);
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  }

  fadeOut(soundName: string, duration: number = 500) {
    const sound = this.sounds.get(soundName);
    if (sound && !sound.paused) {
      const steps = 20;
      const stepDuration = duration / steps;
      const startVolume = sound.volume;
      const volumeStep = startVolume / steps;
      
      const fadeInterval = setInterval(() => {
        if (sound.volume > volumeStep) {
          sound.volume = Math.max(0, sound.volume - volumeStep);
        } else {
          sound.volume = 0;
          sound.pause();
          sound.currentTime = 0; // Reset for next play
          clearInterval(fadeInterval);
          // Reset volume for next play
          if (soundName === 'background') {
            sound.volume = 0.3;
          } else if (soundName === 'timer') {
            sound.volume = 0.4;
          }
        }
      }, stepDuration);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('loop-sound-muted', String(this.isMuted));
    }

    // Mute/unmute all sounds
    this.sounds.forEach((sound) => {
      sound.muted = this.isMuted;
    });

    return this.isMuted;
  }

  getMuted() {
    return this.isMuted;
  }
}

// Create singleton instance
export const soundManager = new SoundManager();

// Hook for React components
export function useSounds() {
  const playClick = () => soundManager.play('click');
  const playPageClick = () => soundManager.play('pageClick');
  const playCountdown = () => soundManager.play('countdown');
  const playEnd = () => soundManager.play('end');
  const playTimer = () => soundManager.play('timer');
  const stopTimer = () => soundManager.stop('timer');
  const playBackground = () => soundManager.play('background');
  const stopBackground = () => soundManager.stop('background');
  const fadeOutBackground = (duration?: number) => soundManager.fadeOut('background', duration);
  const toggleMute = () => soundManager.toggleMute();
  const isMuted = () => soundManager.getMuted();

  return {
    playClick,
    playPageClick,
    playCountdown,
    playEnd,
    playTimer,
    stopTimer,
    playBackground,
    stopBackground,
    fadeOutBackground,
    toggleMute,
    isMuted,
  };
}
