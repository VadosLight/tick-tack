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
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
