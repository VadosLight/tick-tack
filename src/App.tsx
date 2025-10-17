import { useState } from "react";
import { GameScene } from "@/widgets/game-scene";
import type { GameBoard } from "@/shared/types";
import "./App.css";

function App() {
  const [board, setBoard] = useState<GameBoard>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");

  const handleCellClick = (row: number, col: number) => {
    if (board[row][col] !== null) return;

    const newBoard = board.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? currentPlayer : cell
      )
    );

    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <GameScene board={board} onCellClick={handleCellClick} />
    </div>
  );
}

export default App;
