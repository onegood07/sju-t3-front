import Status from "../common/Status";
import { ICONS, SYMBOLS, UNITS } from "../../constants";

interface SpendingItemProps {
  type: "Income" | "Spending";
  name: string;
  statusVariant?: "outLine" | "grayBg";
  category: string;
  price: string;
}

const SpendingItem = ({
  type,
  name,
  statusVariant,
  category,
  price,
}: SpendingItemProps) => {
  return (
    <div className="flex items-start w-full pb-4">
      <Status
        variant={statusVariant}
        icon={statusVariant == "outLine" ? <ICONS.CHECK /> : <ICONS.XMARK />}
        className={`w-[4.4rem] text-xs mr-4 p-[0.2rem] ${
          type === "Income" ? "invisible" : ""
        }`}
      >
        {type === "Spending" && (statusVariant === "outLine" ? "계획" : "즉흥")}
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
            {type == "Income" ? SYMBOLS.PLUS : SYMBOLS.MINUS}
            {price}
            {UNITS.WON}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpendingItem;
