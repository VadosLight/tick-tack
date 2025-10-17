import { OrbitControls, Environment } from "@react-three/drei";
import { GameBoard } from "@/entities/game-board";
import { Canvas } from "@/shared/ui/canvas";
import type { GameBoard as GameBoardType } from "@/shared/types";

export type GameSceneProps = {
  board: GameBoardType;
  onCellClick?: (row: number, col: number) => void;
};

export const GameScene = (props: GameSceneProps) => {
  const { board, onCellClick } = props;

  return (
    <Canvas className="game-scene">
      {/* Освещение */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-5, 5, -5]} intensity={0.5} />

      {/* Окружение */}
      <Environment preset="city" />

      {/* Игровое поле */}
      <GameBoard board={board} onCellClick={onCellClick} />

      {/* Управление камерой */}
      <OrbitControls
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.5}
        minDistance={6}
        maxDistance={12}
      />
    </Canvas>
  );
};
