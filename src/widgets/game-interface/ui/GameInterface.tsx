import { useState, useEffect } from "react";
import { GameScene } from "@/widgets/game-scene";
import { MainMenu } from "@/features/main-menu";
import { DifficultySelector } from "@/features/difficulty-selector";
import { SoundInit } from "@/features/sound-init";
import {
  checkWinner,
  isBoardFull,
  getBestMove,
  getEasyBotMove,
  getMediumBotMove,
  useSound,
  SOUNDS,
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
  const [gameState, setGameState] = useState<GameState>("sound-init");
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [botDifficulty, setBotDifficulty] = useState<BotDifficulty>("medium");
  const [board, setBoard] = useState<GameBoard>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<"X" | "O" | "draw" | null>(null);
  const [isBotThinking, setIsBotThinking] = useState(false);

  // Звуки для игры
  const { play: playGameMusic, stop: stopGameMusic } = useSound(
    SOUNDS.GAME_MUSIC,
    0.2,
    true
  );
  const { play: playWinSound } = useSound(SOUNDS.WIN_SOUND, 0.6, false);
  const { play: playLoseSound } = useSound(SOUNDS.LOSE_SOUND, 0.6, false);

  // Воспроизводим музыку игры при начале игры
  useEffect(() => {
    if (gameState === "playing") {
      playGameMusic();
    } else {
      stopGameMusic();
    }
  }, [gameState, playGameMusic, stopGameMusic]);

  const handleGameModeSelect = (mode: GameMode) => {
    setGameMode(mode);
    if (mode === "vs-bot") {
      setGameState("select-difficulty");
    } else {
      setGameState("playing");
      resetGame();
    }
  };

  const resetGame = () => {
    setBoard([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
    setCurrentPlayer("X");
    setWinner(null);
    setIsBotThinking(false);
  };

  const handleDifficultyConfirm = () => {
    setGameState("playing");
    resetGame();
  };

  const handleSoundEnabled = () => {
    setGameState("menu");
  };

  const handleBackToMenu = () => {
    setGameState("menu");
    setGameMode(null);
    setWinner(null);
    setIsBotThinking(false);
  };

  const handleBackToModeSelect = () => {
    setGameState("menu");
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
      // Воспроизводим звук победы/поражения
      if (gameWinner === "X") {
        playWinSound();
      } else {
        playLoseSound();
      }
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

  const handleNewGame = () => {
    if (gameMode === "vs-bot") {
      setGameState("select-difficulty");
    } else {
      setGameState("playing");
      resetGame();
    }
  };

  return (
    <>
      {/* 3D сцена */}
      <div style={{ width: "100vw", height: "100vh" }}>
        <GameScene
          board={board}
          onCellClick={handleCellClick}
          winner={winner === "draw" ? null : winner}
        />
      </div>

      {/* Интерфейс поверх сцены */}
      {gameState === "sound-init" && (
        <SoundInit onSoundEnabled={handleSoundEnabled} />
      )}

      {gameState === "menu" && (
        <MainMenu onGameModeSelect={handleGameModeSelect} />
      )}

      {gameState === "select-difficulty" && (
        <DifficultySelector
          selectedDifficulty={botDifficulty}
          onDifficultyChange={setBotDifficulty}
          onConfirm={handleDifficultyConfirm}
          onBack={handleBackToModeSelect}
        />
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
