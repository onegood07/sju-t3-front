import React from "react";

type ButtonVariant = "primary" | "secondary" | "gray" | "outline";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    variant?: ButtonVariant;
    type?: "button" | "submit" | "reset";
}

export default function Button({
    children,
    onClick,
    className = "",
    disabled = false,
    type = "button",
}: ButtonProps) {
    const baseStyles =
        "w-full py-3 rounded-xl font-semibold text-center transition active:scale-[0.98]";

    const primary = `
    bg-primary-green 
    text-white-default 
    shadow-sm 
    hover:bg-[#00c53f]
  `;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
        ${baseStyles}
        ${primary}
        ${disabled ? "opacity-60 cursor-not-allowed" : ""}
        ${className}
      `}
        >
            {children}
        </button>
    );
}
