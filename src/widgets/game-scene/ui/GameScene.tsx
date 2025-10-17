import { OrbitControls, Stars } from "@react-three/drei";
import { GameBoard } from "@/entities/game-board";
import { Canvas } from "@/shared/ui/canvas";
import { PixelBackground } from "@/shared/ui/pixel-background";
import { PixelGrid } from "@/shared/ui/pixel-grid";
import type { GameBoard as GameBoardType } from "@/shared/types";

export type GameSceneProps = {
  board: GameBoardType;
  onCellClick?: (row: number, col: number) => void;
};

export const GameScene = (props: GameSceneProps) => {
  const { board, onCellClick } = props;

  return (
    <Canvas className="game-scene">
      {/* 8-bit фон */}
      <color attach="background" args={["#0a0e27"]} />
      <PixelBackground animated />

      {/* Пиксельные звезды */}
      <Stars
        radius={50}
        depth={50}
        count={1000}
        factor={2}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Освещение с неоновым оттенком */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={0.8}
        color="#5bc0de"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-5, 5, -5]} intensity={0.6} color="#e84393" />
      <pointLight position={[5, 3, 5]} intensity={0.4} color="#00b894" />

      {/* 8-bit сетка внизу */}
      <PixelGrid />

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
