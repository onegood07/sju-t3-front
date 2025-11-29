import React from "react";
import { LABELS, APP_INFO, IMAGES, ICONS, SYMBOLS } from "../../constants/";

interface ChattingItemButtonProps {
  name?: string;
  text?: string;
  date?: string;
  status?: "DAY" | "TO" | "NOT";
  className?: string;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  onClick?: () => void;
}

const ChattingItemButton = ({
  name = "새로운 채팅",
  text = "대화를 시작해보세요.",
  date,
  status = "DAY",
  className = "",
  type = "button",
  onClick,
}: ChattingItemButtonProps) => {
  const baseStyles =
    "w-full py-3 rounded-xl font-semibold text-center transition active:scale-[0.98]";

  const mascotImg = IMAGES.MASCOT.SINGLE[status];

  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center justify-center gap-2 bg-white-default
        ${baseStyles}
        ${className}
      `}
    >
      <div className="flex items-start w-full pb-4 bg-white-default">
        <img src={mascotImg} className="w-10" />

        <div className="flex justify-start items-start w-full mb-2 ml-4">
          <div className="flex flex-col w-[calc(100%-10rem)] text-left">
            <p className="text-text-primary text-[0.9rem] mb-1 truncate">
              {name}
            </p>
            <p className="text-text-gray text-[0.8rem] truncate">{text}</p>
          </div>
          <div className="min-w-[6rem] text-right">
            <p className="text-text-primary text-[0.9rem] font-medium">
              {date}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
};

export default ChattingItemButton;
