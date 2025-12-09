// Sound effects manager for Loop app
class SoundManager {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private isMuted: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      // Initialize sounds
      this.loadSound('click', '/sounds/Answer-Selection-Click-Sfx.mp3');
      this.loadSound('countdown', '/sounds/Quiz-Start-Countdown-Sfx.mp3');
      this.loadSound('end', '/sounds/Quizc-End-Chime-Sfx.mp3');
      this.loadSound('timer', '/sounds/Timer-Sfx.mp3');
      this.loadSound('background', '/sounds/Subtle-Landing-Page-Music-Sfx.mp3');

      // Check if user prefers muted
      const savedMutedState = localStorage.getItem('loop-sound-muted');
      this.isMuted = savedMutedState === 'true';
    }
  }

  private loadSound(name: string, path: string) {
    if (typeof window === 'undefined') return;

    const audio = new Audio(path);
    audio.preload = 'auto';
    
    // Background music should loop
    if (name === 'background') {
      audio.loop = true;
      audio.volume = 0.3; // Lower volume for background
    } else {
      audio.volume = 0.5;
    }

    this.sounds.set(name, audio);
  }

  play(soundName: string) {
    if (this.isMuted || typeof window === 'undefined') return;

    const sound = this.sounds.get(soundName);
    if (sound) {
      // Reset to start if already playing
      sound.currentTime = 0;
      sound.play().catch((err) => {
        console.log('Sound play failed:', err);
      });
    }
  }

  stop(soundName: string) {
    const sound = this.sounds.get(soundName);
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('loop-sound-muted', String(this.isMuted));
    }

    // Stop all sounds when muting
    if (this.isMuted) {
      this.sounds.forEach((sound) => {
        sound.pause();
      });
    }

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
  const playCountdown = () => soundManager.play('countdown');
  const playEnd = () => soundManager.play('end');
  const playTimer = () => soundManager.play('timer');
  const playBackground = () => soundManager.play('background');
  const stopBackground = () => soundManager.stop('background');
  const toggleMute = () => soundManager.toggleMute();
  const isMuted = () => soundManager.getMuted();

  return {
    playClick,
    playCountdown,
    playEnd,
    playTimer,
    playBackground,
    stopBackground,
    toggleMute,
    isMuted,
  };
}
