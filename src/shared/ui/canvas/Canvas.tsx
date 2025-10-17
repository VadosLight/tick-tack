import { Canvas as R3FCanvas } from "@react-three/fiber";
import type { ReactNode } from "react";

export type CanvasProps = {
  children: ReactNode;
  className?: string;
};

export const Canvas = (props: CanvasProps) => {
  const { children, className } = props;

  return (
    <R3FCanvas
      className={className}
      camera={{
        position: [0, 5, 8],
        fov: 50,
      }}
      shadows
    >
      {children}
    </R3FCanvas>
  );
};
