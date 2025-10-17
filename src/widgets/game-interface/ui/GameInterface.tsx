import { useState } from "react";
import { GameScene } from "@/widgets/game-scene";
import { MainMenu } from "@/features/main-menu";
import {
  checkWinner,
  isBoardFull,
  getBestMove,
  getEasyBotMove,
  getMediumBotMove,
} from "@/shared/lib";
import type {
  GameBoard,
  GameMode,
  GameState,
  BotDifficulty,
} from "@/shared/types";
import styles from "../GameInterface.module.css";

export type GameInterfaceProps = Record<string, never>;

export const GameInterface = () => {
  const [gameState, setGameState] = useState<GameState>("menu");
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [botDifficulty] = useState<BotDifficulty>("medium");
  const [board, setBoard] = useState<GameBoard>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<"X" | "O" | "draw" | null>(null);
  const [isBotThinking, setIsBotThinking] = useState(false);

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
    setWinner(null);
    setIsBotThinking(false);
  };

  const makeMove = (
    currentBoard: GameBoard,
    row: number,
    col: number,
    player: "X" | "O"
  ) => {
    const newBoard = currentBoard.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? player : cell
      )
    );

    setBoard(newBoard);
    return newBoard;
  };

  const checkGameEnd = (board: GameBoard) => {
    const gameWinner = checkWinner(board);
    if (gameWinner) {
      setWinner(gameWinner);
      setGameState("game-over");
      return true;
    }
    if (isBoardFull(board)) {
      setWinner("draw");
      setGameState("game-over");
      return true;
    }
    return false;
  };

  const makeBotMove = (board: GameBoard) => {
    setIsBotThinking(true);

    // Имитация размышления бота
    setTimeout(() => {
      try {
        let botMove;
        switch (botDifficulty) {
          case "easy":
            botMove = getEasyBotMove(board);
            break;
          case "medium":
            botMove = getMediumBotMove(board);
            break;
          case "hard":
            botMove = getBestMove(board, "O");
            break;
          default:
            botMove = getMediumBotMove(board);
        }

        const newBoard = makeMove(board, botMove.row, botMove.col, "O");

        if (!checkGameEnd(newBoard)) {
          setCurrentPlayer("X");
        }
      } catch {
        console.log({ error: "Нет доступных ходов для бота" });
      } finally {
        setIsBotThinking(false);
      }
    }, 500 + Math.random() * 1000); // Случайная задержка 0.5-1.5 сек
  };

  const handleCellClick = (row: number, col: number) => {
    if (board[row][col] !== null || gameState !== "playing" || isBotThinking)
      return;
    if (gameMode === "vs-bot" && currentPlayer === "O") return; // Блокируем ход игрока во время хода бота

    const newBoard = makeMove(board, row, col, currentPlayer);

    if (checkGameEnd(newBoard)) {
      return;
    }

    if (gameMode === "vs-bot") {
      setCurrentPlayer("O");
      makeBotMove(newBoard);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const handleBackToMenu = () => {
    setGameState("menu");
    setGameMode(null);
    setWinner(null);
    setIsBotThinking(false);
  };

  const handleNewGame = () => {
    setGameState("playing");
    setBoard([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
    setCurrentPlayer("X");
    setWinner(null);
    setIsBotThinking(false);
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
            {gameMode === "vs-bot"
              ? `🤖 Против бота (${botDifficulty})`
              : "👥 Против друга"}
          </h2>
          {isBotThinking ? (
            <p className={styles.currentPlayer}>Бот размышляет...</p>
          ) : (
            <p className={styles.currentPlayer}>
              Ход игрока:{" "}
              <span className={styles.playerSymbol}>{currentPlayer}</span>
            </p>
          )}
          <button onClick={handleBackToMenu} className={styles.backButton}>
            ← Назад в меню
          </button>
        </div>
      )}

      {gameState === "game-over" && (
        <div className={styles.gameInfo}>
          <h2 className={styles.gameMode}>
            {winner === "draw" ? "🤝 Ничья!" : `🏆 Победитель: ${winner}`}
          </h2>
          <button onClick={handleNewGame} className={styles.backButton}>
            🔄 Новая игра
          </button>
          <button onClick={handleBackToMenu} className={styles.backButton}>
            ← Назад в меню
          </button>
        </div>
      )}
    </>
  );
};
