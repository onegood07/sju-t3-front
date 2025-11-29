import { useMemo } from "react";
import Calendar from "react-calendar";
import type { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import { useDateStore, useCalendarSummaryStore } from "../../store";
import { SYMBOLS } from "../../constants";

const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat("ko-KR").format(Math.abs(amount));

interface CustomTileProperties {
  date: Date;
  view: "century" | "decade" | "year" | "month";
}

const SpendingCalendar = () => {
  const { selectedYear, selectedMonth, selectedDate, setFullDate } =
    useDateStore();

  const { dailySummaries, selectDate, selectedDailySummary } =
    useCalendarSummaryStore();

  // 현재 선택된 날짜
  const value = useMemo(
    () => new Date(selectedYear, selectedMonth - 1, selectedDate),
    [selectedYear, selectedMonth, selectedDate]
  );

  // 날짜 클릭 시
  const handleChange: CalendarProps["onChange"] = (v) => {
    if (!v || Array.isArray(v)) return;

    const y = v.getFullYear();
    const m = v.getMonth() + 1;
    const d = v.getDate();

    setFullDate(y, m, d);

    const dateKey = dayjs(v).format("YYYY-MM-DD");
    selectDate(dateKey);
  };

  const formatMonthOnly = (_locale: string | undefined, date: Date): string =>
    dayjs(date).format("M월");

  const tileContent = ({ date, view }: CustomTileProperties) => {
    if (view === "month") {
      const dateKey = dayjs(date).format("YYYY-MM-DD");
      const summary = dailySummaries.find((s) => s.date === dateKey);

      if (summary) {
        const netAmount = summary.totalIncome - summary.totalExpense;
        return (
          <p
            className={`text-left text-[0.6rem] mt-1 leading-tight ${
              netAmount >= 0 ? "text-text-green" : "text-text-red"
            }`}
          >
            {netAmount >= 0 ? `${SYMBOLS.PLUS}` : `${SYMBOLS.MINUS}`}
            {formatCurrency(Math.abs(netAmount))}
          </p>
        );
      }
    }
    return null;
  };

  const tileClassName = ({ date, view }: CustomTileProperties) => {
    if (view === "month") {
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 0) return "text-red-500";
      if (dayOfWeek === 6) return "text-blue-500";

      const dateKey = dayjs(date).format("YYYY-MM-DD");
      if (selectedDailySummary?.date === dateKey)
        return "bg-yellow-100 rounded-md";
    }
    return "";
  };

  return (
    <div className="spending-calendar-container">
      <Calendar
        onChange={handleChange}
        value={value}
        tileContent={tileContent}
        tileClassName={tileClassName}
        calendarType="gregory"
        formatMonthYear={formatMonthOnly}
        formatDay={(_, date) => dayjs(date).format("D")}
        navigationLabel={({ label }) => (
          <span className="text-text-gray font-medium">{label}</span>
        )}
        prev2Label={null}
        next2Label={null}
        showNeighboringMonth={false}
      />
    </div>
  );
};

export default SpendingCalendar;
