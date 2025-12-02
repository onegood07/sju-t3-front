import React from "react";

type StatusVariant = "planned" | "impulse" | "income" | "achieved"
  | "notAchieved";

interface StatusProps {
  children: React.ReactNode;
  className?: string;
  variant?: StatusVariant;
  icon?: React.ReactNode;
}

const Status = ({
  children,
  className = "",
  variant = "planned",
  icon,
}: StatusProps) => {
  const variantClasses = {
    planned: "bg-bg-tag-success text-text-green border-text-green",
    income: "bg-bg-input text-text-gray",
    impulse: "bg-bg-red text-primary-red",
    achieved: "bg-bg-tag-success text-text-green border-text-green",
    notAchieved: "bg-bg-input text-text-gray",
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
