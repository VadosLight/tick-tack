import { Button } from "@/shared/ui/button";
import type { BotDifficulty } from "@/shared/types";
import styles from "../DifficultySelector.module.css";

export type DifficultySelectorProps = {
  selectedDifficulty: BotDifficulty;
  onDifficultyChange: (difficulty: BotDifficulty) => void;
  onConfirm: () => void;
  onBack: () => void;
};

export const DifficultySelector = (props: DifficultySelectorProps) => {
  const { selectedDifficulty, onDifficultyChange, onConfirm, onBack } = props;

  const difficulties: {
    value: BotDifficulty;
    label: string;
    description: string;
  }[] = [
    { value: "easy", label: "🟢 Легкий", description: "70% случайных ходов" },
    {
      value: "medium",
      label: "🟡 Средний",
      description: "30% случайных ходов",
    },
    {
      value: "hard",
      label: "🔴 Сложный",
      description: "100% оптимальных ходов",
    },
  ];

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <h1 className={styles.title}>Выберите сложность</h1>
        <p className={styles.subtitle}>Насколько умным должен быть бот?</p>

        <div className={styles.difficultyList}>
          {difficulties.map((difficulty) => (
            <button
              key={difficulty.value}
              className={`${styles.difficultyItem} ${
                selectedDifficulty === difficulty.value ? styles.selected : ""
              }`}
              onClick={() => onDifficultyChange(difficulty.value)}
            >
              <div className={styles.difficultyLabel}>{difficulty.label}</div>
              <div className={styles.difficultyDescription}>
                {difficulty.description}
              </div>
            </button>
          ))}
        </div>

        <div className={styles.buttons}>
          <Button
            variant="primary"
            onClick={onConfirm}
            className={styles.confirmButton}
          >
            Начать игру
          </Button>
          <Button
            variant="secondary"
            onClick={onBack}
            className={styles.backButton}
          >
            ← Назад
          </Button>
        </div>
      </div>
    </div>
  );
};
