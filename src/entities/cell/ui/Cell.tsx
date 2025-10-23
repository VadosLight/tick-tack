import { useRef, useState, useEffect } from "react";
import { Mesh } from "three";
import { useSound, SOUNDS } from "@/shared/lib";
import type { CellValue } from "@/shared/types";
// import smashSound from "../assets/smash.mp3";
export type CellProps = {
  position: [number, number, number];
  value: CellValue;
  onClick?: () => void;
};

export const Cell = (props: CellProps) => {
  const { position, value, onClick } = props;
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [previousValue, setPreviousValue] = useState<CellValue>(null);
  // const { play: playSmashSound } = useSound(smashSound, 0.3, false);
  const { play: playCrossSound } = useSound(SOUNDS.CROSS_SOUND, 0.4, false);
  const { play: playCircleSound } = useSound(SOUNDS.CIRCLE_SOUND, 0.4, false);
  const { play: playClickSound } = useSound(SOUNDS.CLICK_NORMAL, 0.3, false);

  // Воспроизводим звук при установке фигуры
  useEffect(() => {
    if (value && !previousValue) {
      // playSmashSound();
      // Воспроизводим специфичный звук для крестика или нолика
      if (value === "X") {
        playCrossSound();
      } else if (value === "O") {
        playCircleSound();
      }
    }
    setPreviousValue(value);
  }, [value, previousValue, playCrossSound, playCircleSound]);

  const handleClick = () => {
    if (onClick) {
      playClickSound();
      onClick();
    }
  };

  return (
    <group position={position}>
      {/* Базовая клетка */}
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[0.9, 0.1, 0.9]} />
        <meshStandardMaterial
          color={hovered ? "#00d4ff" : "#1e3a5f"}
          emissive={hovered ? "#00d4ff" : "#000000"}
          emissiveIntensity={hovered ? 0.3 : 0}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Крестик */}
      {value === "X" && (
        <group position={[0, 0.05, 0]} rotation={[0, 0, 0]}>
          <mesh rotation={[Math.PI / 2, 0, Math.PI / 4]}>
            <boxGeometry args={[0.15, 0.7, 0.15]} />
            <meshStandardMaterial
              color="#ff0080"
              emissive="#ff0080"
              emissiveIntensity={0.2}
              metalness={0.3}
              roughness={0.4}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, -Math.PI / 4]}>
            <boxGeometry args={[0.15, 0.7, 0.15]} />
            <meshStandardMaterial
              color="#ff0080"
              emissive="#ff0080"
              emissiveIntensity={0.2}
              metalness={0.3}
              roughness={0.4}
            />
          </mesh>
        </group>
      )}

      {/* Нолик */}
      {value === "O" && (
        <mesh position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.3, 0.1, 8, 16]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.2}
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>
      )}
    </group>
  );
};
