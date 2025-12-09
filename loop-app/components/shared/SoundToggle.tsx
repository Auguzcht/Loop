'use client';

import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSounds } from '@/lib/sounds';

export function SoundToggle() {
  const { toggleMute, isMuted } = useSounds();
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    setMuted(isMuted());
  }, [isMuted]);

  const handleToggle = () => {
    const newMutedState = toggleMute();
    setMuted(newMutedState);
  };

  return (
    <Button
      onClick={handleToggle}
      variant="ghost"
      size="icon"
      className="fixed top-4 right-4 z-50 bg-cream-100 hover:bg-cream-200 border-2 border-cream-400 rounded-full w-12 h-12"
      aria-label={muted ? 'Unmute sounds' : 'Mute sounds'}
    >
      {muted ? (
        <VolumeX className="w-5 h-5 text-brown-500" />
      ) : (
        <Volume2 className="w-5 h-5 text-brown-500" />
      )}
    </Button>
  );
}
