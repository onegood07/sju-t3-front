import React from "react";

type StatusVariant = "outLine" | "grayBg";

interface StatusProps {
  children: React.ReactNode;
  className?: string;
  variant?: StatusVariant;
  icon?: React.ReactNode;
}

const Status = ({
  children,
  className = "",
  variant = "outLine",
  icon,
}: StatusProps) => {
  const variantClasses = {
    outLine: "bg-bg-tag-success text-text-green border-text-green",
    grayBg: "bg-bg-input text-text-gray",
  };

  return (
    <div
      className={`flex items-center justify-center gap-2 rounded-xl ${variantClasses[variant]}
        ${className}
      `}
    >
      {icon && icon}
      {children}
    </div>
  );
};

export default Status;
