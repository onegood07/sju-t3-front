import React from "react";

interface InputProps {
  htmlType?:
    | "text"
    | "password"
    | "email"
    | "number"
    | "date"
    | "time"
    | "datetime-local";
  inputType: "input" | "chatting";
  placeholder?: string;
  value?: string | number;
  label?: string;
  disabled?: boolean;
  className?: string;
  onChange?: (value: string) => void;
}

const Input: React.FC<InputProps> = ({
  htmlType = "text",
  inputType,
  placeholder,
  value,
  label,
  disabled,
  className,
  onChange,
}) => {
  const typeClassName = {
    input: "w-full px-4 py-3 border rounded-xl bg-bg-input",
    chatting:
      "w-full px-4 py-3 border rounded-3xl bg-white-default border-border-line",
  };

  const classes = `${typeClassName[inputType]} ${className}`;

  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="block text-sm font-medium text-text-primary">
          {label}
        </label>
      )}

      <input
        type={htmlType}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className={classes}
      />
    </div>
  );
};

export default Input;
