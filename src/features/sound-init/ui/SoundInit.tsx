import { Button } from "@/shared/ui/button";
import { useSound, SOUNDS } from "@/shared/lib";
import styles from "./SoundInit.module.css";

export type SoundInitProps = {
  onSoundEnabled: () => void;
};

export const SoundInit = (props: SoundInitProps) => {
  const { onSoundEnabled } = props;
  const { play: playStartGame } = useSound(SOUNDS.START_GAME, 0.5, false);

  const handleEnableSound = () => {
    // Воспроизводим тестовый звук для активации аудио контекста
    playStartGame();
    onSoundEnabled();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <h1 className={styles.title}>🎵 TICK-TACK 🎵</h1>

        <div className={styles.soundInfo}>
          <p className={styles.infoText}>
            Для полного погружения в игру включите звук!
          </p>
          <p className={styles.infoSubtext}>
            Нажмите кнопку ниже, чтобы начать игру
          </p>
        </div>

        <div className={styles.buttons}>
          <Button variant="primary" onClick={handleEnableSound}>
            Начать игру
          </Button>
        </div>

        <div className={styles.tips}>
          <p>
            💡 Совет: Звук можно выключить в любой момент в настройках браузера
          </p>
        </div>
      </div>
    </div>
  );
};
