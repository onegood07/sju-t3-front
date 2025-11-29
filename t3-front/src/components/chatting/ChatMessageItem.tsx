import React from "react";

interface ChatMessageItemProps {
  role: "USER" | "ASSISTANT";
  content: string;
  time?: string;
}

const ChatMessageItem = ({ role, content, time }: ChatMessageItemProps) => {
  const isUser = role === "USER";

  return (
    <div
      className={`flex w-full mb-3 ${
        isUser ? "justify-end" : "justify-start"
      } items-end`}
    >
      <div
        className={`flex items-end gap-1 max-w-[70%] text-sm break-words ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div
          className={`px-3 py-2 rounded-lg ${
            isUser
              ? "bg-white-default text-text-primary rounded-bl-none rounded-tr-lg"
              : "bg-bg-tag-success text-text-primary rounded-br-none rounded-tl-lg"
          }`}
        >
          {content}
        </div>

        {time && (
          <p className="text-[0.6rem] text-text-gray opacity-60">
            {new Date(time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatMessageItem;
