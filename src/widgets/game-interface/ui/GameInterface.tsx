import { useState } from "react";
import { GameScene } from "@/widgets/game-scene";
import { MainMenu } from "@/features/main-menu";
import type { GameBoard, GameMode, GameState } from "@/shared/types";
import styles from "../GameInterface.module.css";

export type GameInterfaceProps = {
  // Здесь можно добавить пропсы для настройки игры
};

export const GameInterface = (props: GameInterfaceProps) => {
  const {} = props;

  const [gameState, setGameState] = useState<GameState>("menu");
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [board, setBoard] = useState<GameBoard>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");

  const handleGameModeSelect = (mode: GameMode) => {
    setGameMode(mode);
    setGameState("playing");
    // Сброс игрового поля
    setBoard([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
    setCurrentPlayer("X");
  };

  const handleCellClick = (row: number, col: number) => {
    if (board[row][col] !== null) return;

    const newBoard = board.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? currentPlayer : cell
      )
    );

    setBoard(newBoard);

    // Простая логика для бота (если играем с ботом)
    if (gameMode === "vs-bot") {
      // TODO: Добавить логику бота
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const handleBackToMenu = () => {
    setGameState("menu");
    setGameMode(null);
  };

  return (
    <>
      {/* 3D сцена */}
      <div style={{ width: "100vw", height: "100vh" }}>
        <GameScene board={board} onCellClick={handleCellClick} />
      </div>

      {/* Интерфейс поверх сцены */}
      {gameState === "menu" && (
        <MainMenu onGameModeSelect={handleGameModeSelect} />
      )}

      {gameState === "playing" && (
        <div className={styles.gameInfo}>
          <h2 className={styles.gameMode}>
            {gameMode === "vs-bot" ? "🤖 Против бота" : "👥 Против друга"}
          </h2>
          <p className={styles.currentPlayer}>
            Ход игрока:{" "}
            <span className={styles.playerSymbol}>{currentPlayer}</span>
          </p>
          <button onClick={handleBackToMenu} className={styles.backButton}>
            ← Назад в меню
          </button>
        </div>
      )}
    </>
  );
};
