import { Cell } from "@/entities/cell";
import type { GameBoard as GameBoardType } from "@/shared/types";

export type GameBoardProps = {
  board: GameBoardType;
  onCellClick?: (row: number, col: number) => void;
};

export const GameBoard = (props: GameBoardProps) => {
  const { board, onCellClick } = props;

  return (
    <group>
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const x = (colIndex - 1) * 1.1;
          const z = (rowIndex - 1) * 1.1;

          return (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              position={[x, 0, z]}
              value={cell}
              onClick={() => onCellClick?.(rowIndex, colIndex)}
            />
          );
        })
      )}

      {/* Сетка поля */}
      <gridHelper
        args={[3.3, 3, "#34495e", "#34495e"]}
        position={[0, -0.05, 0]}
      />
    </group>
  );
};
