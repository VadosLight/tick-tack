import { useEffect } from "react";
import { Button } from "@/shared/ui/button";
import { useSound, SOUNDS } from "@/shared/lib";
import type { GameMode } from "@/shared/types";
import styles from "../MainMenu.module.css";

export type MainMenuProps = {
  onGameModeSelect: (mode: GameMode) => void;
};

export const MainMenu = (props: MainMenuProps) => {
  const { onGameModeSelect } = props;

  // Звуки для меню
  const { play: playMenuMusic, stop: stopMenuMusic } = useSound(
    SOUNDS.MENU_MUSIC,
    0.3,
    true
  );
  const { play: playStartGame } = useSound(SOUNDS.START_GAME, 0.5, false);

  // Воспроизводим музыку меню при загрузке
  useEffect(() => {
    console.log("playMenuMusic");
    playMenuMusic();

    return () => {
      stopMenuMusic();
    };
  }, [playMenuMusic, stopMenuMusic]);

  const handleGameModeSelect = (mode: GameMode) => {
    playStartGame();
    onGameModeSelect(mode);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        {/* Заголовок */}
        <h1 className={styles.title}>TICK-TACK</h1>
        <p className={styles.subtitle}>Крестики-нолики в 8-bit стиле</p>

        {/* Меню */}
        <div className={styles.menu}>
          <Button
            variant="primary"
            onClick={() => handleGameModeSelect("vs-bot")}
          >
            🤖 Играть с ботом
          </Button>

          <Button
            variant="secondary"
            onClick={() => handleGameModeSelect("vs-friend")}
          >
            👥 Играть с другом
          </Button>
        </div>

        {/* Дополнительная информация */}
        <div className={styles.info}>
          <p>Используйте мышь для навигации по 3D сцене</p>
          <p>Кликните по клетке, чтобы сделать ход</p>
        </div>
      </div>
    </div>
  );
};
