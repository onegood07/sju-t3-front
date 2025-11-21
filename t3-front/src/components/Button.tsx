import React from "react";

type ButtonVariant = "primary" | "login" | "outLine" | "grayBg";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  variant?: ButtonVariant;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
}

export default function Button({
  children,
  onClick,
  className = "",
  disabled = false,
  type = "button",
  variant = "primary",
  icon,
}: ButtonProps) {
  const baseStyles =
    "w-full py-3 rounded-xl font-semibold text-center transition active:scale-[0.98]";

  const variantClasses = {
    primary:
      "bg-primary-green border-primary-green text-white-default hover:bg-text-green hover:border-primary-green",
    login:
      "bg-primary-yellow border-primary-yellow text-text-primary hover:bg-hover-yellow hover:border-hover-yellow",
    outLine:
      "bg-white-default text-text-green border-text-green hover:bg-bg-tag-success hover:border-text-green",
    grayBg:
      "bg-bg-input text-text-gray hover:bg-icon-gray hover:border-icon-gray",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 ${
        variantClasses[variant]
      }
        ${baseStyles}
        ${disabled ? "opacity-60 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {icon && icon}
      {children}
    </button>
  );
}
