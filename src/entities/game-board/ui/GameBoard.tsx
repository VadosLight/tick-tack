import { Cell } from "@/entities/cell";
import { WinLine } from "@/entities/win-line";
import type { GameBoard as GameBoardType } from "@/shared/types";

export type GameBoardProps = {
  board: GameBoardType;
  onCellClick?: (row: number, col: number) => void;
  winner?: "X" | "O" | null;
};

export const GameBoard = (props: GameBoardProps) => {
  const { board, onCellClick, winner } = props;

  return (
    <group>
      {/* Дополнительный ambient light для мягкого освещения */}
      <ambientLight intensity={3} color="#ff0080" />
      {/* Очень мягкая розовая подсветка под полем - многослойный градиент */}
      {/* Самый внешний слой - едва заметный */}
      <mesh position={[0, -0.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4.5, 64]} />
        <meshBasicMaterial
          color="#ff0080"
          transparent
          opacity={0.015}
          side={2}
        />
      </mesh>

      {/* Внешний слой */}
      <mesh position={[0, -0.22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3.8, 64]} />
        <meshBasicMaterial
          color="#ff0080"
          transparent
          opacity={0.025}
          side={2}
        />
      </mesh>

      {/* Средний внешний слой */}
      <mesh position={[0, -0.19, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3.2, 64]} />
        <meshBasicMaterial
          color="#ff0080"
          transparent
          opacity={0.04}
          side={2}
        />
      </mesh>

      {/* Средний слой */}
      <mesh position={[0, -0.17, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.6, 64]} />
        <meshBasicMaterial
          color="#ff0080"
          transparent
          opacity={0.06}
          side={2}
        />
      </mesh>

      {/* Внутренний слой */}
      <mesh position={[0, -0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2, 64]} />
        <meshBasicMaterial
          color="#ff0080"
          transparent
          opacity={0.08}
          side={2}
        />
      </mesh>

      {/* Самый внутренний слой */}
      <mesh position={[0, -0.13, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.5, 64]} />
        <meshBasicMaterial color="#ff0080" transparent opacity={0.1} side={2} />
      </mesh>

      {/* Очень деликатные точечные источники света */}
      <pointLight
        position={[0, -0.6, 0]}
        intensity={0.1}
        color="#ff0080"
        distance={10}
        decay={2}
      />
      <pointLight
        position={[1.5, -0.4, 1.5]}
        intensity={0.05}
        color="#ff0080"
        distance={7}
        decay={2}
      />
      <pointLight
        position={[-1.5, -0.4, -1.5]}
        intensity={0.05}
        color="#ff0080"
        distance={7}
        decay={2}
      />

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
        args={[3.3, 3, "#00d4ff", "#1a508b"]}
        position={[0, -0.05, 0]}
      />

      {/* Выигрышная линия */}
      <WinLine board={board} winner={winner ?? null} />
    </group>
  );
};
