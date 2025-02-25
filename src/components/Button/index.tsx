import React from "react";
import "./Button.css";

type ButtonVariant = "primary" | "secondary" | "danger" | "success";

interface ButtonProps {
  variant?: ButtonVariant;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  onClick,
  disabled = false,
  children,
  className = "",
  style,
}) => {
  // Define base classes and apply conditional styles
  const baseClass = `button ${variant}`;
  const disabledClass = disabled ? "button-disabled" : "";

  return (
    <button
      className={`${baseClass} ${disabledClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
