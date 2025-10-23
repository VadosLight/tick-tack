import { useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useSound, SOUNDS } from "@/shared/lib";
import type { GameBoard } from "@/shared/types";

export type WinLineProps = {
  board: GameBoard;
  winner: "X" | "O" | null;
};

export const WinLine = (props: WinLineProps) => {
  const { board, winner } = props;
  const [animationProgress, setAnimationProgress] = useState(0);
  const { play: playWinSound } = useSound(SOUNDS.WIN_SOUND, 0.7, false);

  // Запуск анимации при появлении победителя
  useEffect(() => {
    if (winner) {
      setAnimationProgress(0);
      playWinSound();
    }
  }, [winner, playWinSound]);

  // Анимация вытягивания линии
  useFrame((state) => {
    if (winner && animationProgress < 1) {
      const newProgress = Math.min(
        animationProgress + state.clock.getDelta() * 1000,
        1
      );
      setAnimationProgress(newProgress);
    }
  });

  if (!winner) return null;

  // Функция для поиска выигрышной линии
  const findWinningLine = () => {
    // Проверка строк
    for (let row = 0; row < 3; row++) {
      if (
        board[row][0] &&
        board[row][0] === board[row][1] &&
        board[row][1] === board[row][2]
      ) {
        return {
          type: "horizontal",
          row,
          start: { x: -1.1, z: (row - 1) * 1.1 },
          end: { x: 1.1, z: (row - 1) * 1.1 },
        };
      }
    }

    // Проверка столбцов
    for (let col = 0; col < 3; col++) {
      if (
        board[0][col] &&
        board[0][col] === board[1][col] &&
        board[1][col] === board[2][col]
      ) {
        return {
          type: "vertical",
          col,
          start: { x: (col - 1) * 1.1, z: -1.1 },
          end: { x: (col - 1) * 1.1, z: 1.1 },
        };
      }
    }

    // Проверка диагонали (левая верхняя - правая нижняя)
    if (
      board[0][0] &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]
    ) {
      return {
        type: "diagonal",
        diagonal: "main",
        start: { x: -1.1, z: -1.1 },
        end: { x: 1.1, z: 1.1 },
      };
    }

    // Проверка диагонали (правая верхняя - левая нижняя)
    if (
      board[0][2] &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]
    ) {
      return {
        type: "diagonal",
        diagonal: "anti",
        start: { x: 1.1, z: -1.1 },
        end: { x: -1.1, z: 1.1 },
      };
    }

    return null;
  };

  const winningLine = findWinningLine();

  if (!winningLine) return null;

  // Вычисляем длину линии
  const fullLength = Math.sqrt(
    Math.pow(winningLine.end.x - winningLine.start.x, 2) +
      Math.pow(winningLine.end.z - winningLine.start.z, 2)
  );

  // Анимированная длина линии
  const currentLength = fullLength * animationProgress;

  // Вычисляем угол поворота
  const angle = Math.atan2(
    winningLine.end.z - winningLine.start.z,
    winningLine.end.x - winningLine.start.x
  );

  // Анимированная позиция начала линии
  const animatedStartX =
    winningLine.start.x +
    ((winningLine.end.x - winningLine.start.x) * (1 - animationProgress)) / 2;
  const animatedStartZ =
    winningLine.start.z +
    ((winningLine.end.z - winningLine.start.z) * (1 - animationProgress)) / 2;

  // Центральная позиция анимированной линии
  const centerX = animatedStartX + (winningLine.end.x - animatedStartX) / 2;
  const centerZ = animatedStartZ + (winningLine.end.z - animatedStartZ) / 2;

  return (
    <group position={[centerX, 0.15, centerZ]}>
      {/* Основная линия */}
      <mesh rotation={[0, -angle, 0]}>
        <boxGeometry args={[currentLength, 0.05, 0.05]} />
        <meshStandardMaterial
          color={winner === "X" ? "#ff0080" : "#00ffff"}
          emissive={winner === "X" ? "#ff0080" : "#00ffff"}
          emissiveIntensity={0.8 + animationProgress * 0.4} // Увеличиваем свечение по мере роста
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* Дополнительный эффект свечения */}
      <mesh position={[0, 0.05, 0]} rotation={[0, -angle, 0]}>
        <boxGeometry
          args={[currentLength + 0.2 * animationProgress, 0.02, 0.02]}
        />
        <meshBasicMaterial
          color={winner === "X" ? "#ff0080" : "#00ffff"}
          transparent
          opacity={0.3 * animationProgress}
        />
      </mesh>

      {/* Эффект частиц на конце линии */}
      {animationProgress > 0 && (
        <mesh position={[currentLength / 2, 0, 0]} rotation={[0, -angle, 0]}>
          <sphereGeometry args={[0.08 * animationProgress, 8, 8]} />
          <meshStandardMaterial
            color={winner === "X" ? "#ff0080" : "#00ffff"}
            emissive={winner === "X" ? "#ff0080" : "#00ffff"}
            emissiveIntensity={1.5}
            transparent
            opacity={animationProgress}
          />
        </mesh>
      )}
    </group>
  );
};
