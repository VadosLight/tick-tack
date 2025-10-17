import { Button } from "@/shared/ui/button";
import type { GameMode } from "@/shared/types";
import styles from "../MainMenu.module.css";

export type MainMenuProps = {
  onGameModeSelect: (mode: GameMode) => void;
};

export const MainMenu = (props: MainMenuProps) => {
  const { onGameModeSelect } = props;

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        {/* Заголовок */}
        <h1 className={styles.title}>TICK-TACK</h1>
        <p className={styles.subtitle}>Крестики-нолики в 8-bit стиле</p>

        {/* Меню */}
        <div className={styles.menu}>
          <Button variant="primary" onClick={() => onGameModeSelect("vs-bot")}>
            🤖 Играть с ботом
          </Button>

          <Button
            variant="secondary"
            onClick={() => onGameModeSelect("vs-friend")}
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
