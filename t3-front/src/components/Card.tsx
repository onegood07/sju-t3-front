import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div className={`flex justify-start rounded-xl ${className}`}>
      {children}
    </div>
  );
};

export default Card;
