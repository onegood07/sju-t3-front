import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = "", ...props }: CardProps) => {
  return (
    <div
      className={`flex justify-start rounded-xl bg-white-default p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
