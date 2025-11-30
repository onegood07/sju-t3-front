import Status from "../common/Status";
import { ICONS, SYMBOLS, UNITS } from "../../constants";

interface SpendingItemProps {
  type: "INCOME" | "EXPENSE";
  expenseType?: "IMPULSE" | "PLANNED";
  name: string;
  statusVariant?: "planned" | "impulse" | "income";
  category: string;
  price: string;
}

const SpendingItem = ({
  type,
  expenseType,
  name,
  category,
  price,
}: SpendingItemProps) => {
  const renderIcon = () => {
    if (type === "INCOME") {
      return <ICONS.INCOME />;
    } else if (type === "EXPENSE" && expenseType == "PLANNED") {
      return <ICONS.CHECK />;
    } else if (type === "EXPENSE" && expenseType == "IMPULSE") {
      return <ICONS.XMARK />;
    }
    return null;
  };

  const getStatusVariant = () => {
    if (type === "INCOME") return "income";
    if (type === "EXPENSE" && expenseType == "PLANNED") return "planned";
    if (type === "EXPENSE" && expenseType == "IMPULSE") return "impulse";
    return "impulse";
  };

  const getLabel = () => {
    if (type === "INCOME") return "수입";
    if (type === "EXPENSE" && expenseType == "PLANNED") return "계획";
    if (type === "EXPENSE" && expenseType == "IMPULSE") return "충동";
    return "충동";
  };

  return (
    <div className="flex items-start w-full pb-4">
      <Status
        variant={getStatusVariant()}
        icon={renderIcon()}
        className={"w-[4.4rem] text-xs mr-4 p-[0.2rem]"}
      >
        {getLabel()}

      </Status>

      <div className="flex justify-between w-full mb-2">
        <div className="flex flex-col w-[10rem]">
          <p className="text-text-primary text-[0.9rem] mb-1 truncate">
            {name}
          </p>
          <p className="text-text-gray text-[0.8rem]">
            {SYMBOLS.HASHTAG}
            {category}
          </p>
        </div>

        <div className="w-[7rem] text-right">
          <p className="text-text-primary text-[0.9rem] font-medium whitespace-nowrap overflow-hidden text-ellipsis">
            {type === "INCOME" ? SYMBOLS.PLUS : SYMBOLS.MINUS}
            {price}
            {UNITS.WON}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpendingItem;
