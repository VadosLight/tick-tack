import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Color, ShaderMaterial } from "three";

export type PixelBackgroundProps = {
  animated?: boolean;
};

export const PixelBackground = (props: PixelBackgroundProps) => {
  const { animated = true } = props;
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && animated) {
      const time = state.clock.getElapsedTime();
      // Медленная пульсация цветов
      const material = meshRef.current.material as ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.uTime.value = time;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -10]} scale={[50, 50, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        uniforms={{
          uTime: { value: 0 },
          uColor1: { value: new Color("#1a1a2e") },
          uColor2: { value: new Color("#16213e") },
          uColor3: { value: new Color("#0f3460") },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform vec3 uColor3;
          varying vec2 vUv;

          // Функция для создания пикселизации
          vec2 pixelate(vec2 uv, float pixels) {
            return floor(uv * pixels) / pixels;
          }

          // Простой шум для звезд
          float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
          }

          void main() {
            // Пикселизация координат
            vec2 pixelUv = pixelate(vUv, 64.0);
            
            // Градиент сверху вниз
            float gradient = pixelUv.y;
            
            // Смешиваем цвета для 8-bit эффекта
            vec3 color = mix(uColor1, uColor2, gradient);
            color = mix(color, uColor3, gradient * gradient);
            
            // Добавляем пиксельные звезды
            float star = random(pixelUv * 20.0);
            if (star > 0.985) {
              float twinkle = sin(uTime * 2.0 + star * 100.0) * 0.5 + 0.5;
              color += vec3(twinkle * 0.8);
            }
            
            // Добавляем горизонтальные сканлинии
            float scanline = mod(floor(vUv.y * 200.0), 2.0);
            color *= 0.95 + scanline * 0.05;
            
            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  );
};
