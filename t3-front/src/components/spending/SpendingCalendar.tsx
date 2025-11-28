import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import dayjs from "dayjs";

const mockSpendingData: Record<string, number> = {
  "2025-11-01": -3050000,
  "2025-11-05": -1500,
  "2025-11-12": -124500,
  "2025-11-16": -56000,
  "2025-11-26": -78000,
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("ko-KR").format(Math.abs(amount));
};

interface CustomTileProperties {
  date: Date;
  view: "century" | "decade" | "year" | "month";
}

const SpendingCalendar = () => {
  const [value, setValue] = useState<Date>(new Date());

  const handleChange = (v: any): void => {
    if (v && v instanceof Date) {
      setValue(v);
    }
  };

  // formatMonthYear prop을 위한 함수 정의 (월만 표시)
  const formatMonthOnly = (locale: string | undefined, date: Date): string => {
    return dayjs(date).format("M월");
  };

  const tileContent = ({ date, view }: CustomTileProperties) => {
    if (view === "month") {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const dateKey = `${year}-${month}-${day}`;

      const spendingAmount = mockSpendingData[dateKey];

      if (spendingAmount && spendingAmount < 0) {
        return (
          <p className="text-left text-[0.6rem] text-text-green mt-1 leading-tight">
            {formatCurrency(spendingAmount)}
          </p>
        );
      }
    }
    return null;
  };

  return (
    <div className="spending-calendar-container">
      <Calendar
        onChange={handleChange}
        value={value}
        tileContent={tileContent}
        tileClassName={({ date, view }) => {
          if (view === "month") {
            const dayOfWeek = date.getDay();
            if (dayOfWeek === 0) return "text-red-500";
            if (dayOfWeek === 6) return "text-blue-500";
          }
          return "";
        }}
        calendarType="gregory"
        formatMonthYear={formatMonthOnly}
        formatDay={(_, date) => dayjs(date).format("D")}
        navigationLabel={({ label }) => {
          return <span className="text-text-gray font-medium">{label}</span>;
        }}
        prev2Label={null}
        next2Label={null}
        showNeighboringMonth={false}
      />
    </div>
  );
};

export default SpendingCalendar;
