import { useRef, useState } from "react";
import { Mesh } from "three";
import type { CellValue } from "@/shared/types";

export type CellProps = {
  position: [number, number, number];
  value: CellValue;
  onClick?: () => void;
};

export const Cell = (props: CellProps) => {
  const { position, value, onClick } = props;
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      {/* Базовая клетка */}
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[0.9, 0.1, 0.9]} />
        <meshStandardMaterial
          color={hovered ? "#4a90e2" : "#2c3e50"}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* Крестик */}
      {value === "X" && (
        <group position={[0, 0.3, 0]}>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.1, 0.8, 0.1]} />
            <meshStandardMaterial color="#e74c3c" />
          </mesh>
          <mesh rotation={[0, 0, -Math.PI / 4]}>
            <boxGeometry args={[0.1, 0.8, 0.1]} />
            <meshStandardMaterial color="#e74c3c" />
          </mesh>
        </group>
      )}

      {/* Нолик */}
      {value === "O" && (
        <mesh position={[0, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.3, 0.08, 16, 32]} />
          <meshStandardMaterial color="#3498db" />
        </mesh>
      )}
    </group>
  );
};
