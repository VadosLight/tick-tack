import { useRef, useCallback } from 'react';

export const useSound = (src: string, volume: number = 0.5, loop: boolean = false) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      audioRef.current.volume = volume;
      audioRef.current.loop = loop;
    }
    
    // Сбрасываем время воспроизведения и играем
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch((error) => {
      console.log({ error: 'Не удалось воспроизвести звук', details: error });
    });
  }, [src, volume, loop]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  return { play, stop };
};
