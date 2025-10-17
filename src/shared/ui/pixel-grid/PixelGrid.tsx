export type PixelGridProps = {
  size?: number;
  divisions?: number;
  color?: string;
};

export const PixelGrid = (props: PixelGridProps) => {
  const { size = 20, divisions = 40, color = "#1a508b" } = props;

  return (
    <>
      {/* Нижняя сетка в стиле 8-bit */}
      <gridHelper
        args={[size, divisions, color, color]}
        position={[0, -2, 0]}
        rotation={[0, 0, 0]}
      />
      {/* Дополнительный пол для эффекта глубины */}
      <mesh
        position={[0, -2.01, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial color="#0a1929" metalness={0.1} roughness={0.9} />
      </mesh>
    </>
  );
};
