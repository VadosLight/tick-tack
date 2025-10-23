import { SOUNDS, useSound } from "@/shared/lib";
import styles from "./Button.module.css";

export type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  className?: string;
};

export const Button = (props: ButtonProps) => {
  const {
    children,
    onClick,
    variant = "primary",
    disabled = false,
    className = "",
  } = props;
  const { play: playClickSound } = useSound(SOUNDS.CLICK_NORMAL, 0.3, false);

  const handleClick = () => {
    if (onClick) {
      playClickSound();
      onClick();
    }
  };
  const getVariantClass = () => {
    switch (variant) {
      case "primary":
        return styles.primary;
      case "secondary":
        return styles.secondary;
      default:
        return styles.primary;
    }
  };

  return (
    <button
      className={`${styles.button} ${getVariantClass()} ${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
