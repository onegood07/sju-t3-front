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

  const value = useMemo(
    () => new Date(selectedYear, selectedMonth - 1, selectedDate),
    [selectedYear, selectedMonth, selectedDate]
  );

  // 날짜 클릭
  const handleChange: CalendarProps["onChange"] = (v) => {
    if (!v || Array.isArray(v)) return;

    const y = v.getFullYear();
    const m = v.getMonth() + 1;
    const d = v.getDate();

    setFullDate(y, m, d);

    const dateKey = dayjs(v).format("YYYY-MM-DD");
    selectDate(dateKey);
  };

  // 월(또는 연도) 이동
  const handleActiveStartDateChange: CalendarProps["onActiveStartDateChange"] =
    ({ activeStartDate, view }) => {
      if (!activeStartDate) return;

      // 우리는 "월 단위 화면"에서만 처리하면 됨
      if (view !== "month") return;

      const y = activeStartDate.getFullYear();
      const m = activeStartDate.getMonth() + 1;

      // 새 달로 넘어갈 때 선택 날짜는 1일로 고정 (원하면 로직 바꿔도 됨)
      const d = 1;

      setFullDate(y, m, d);

      // 선택된 일자 기준 daily summary도 맞춰줌 (필요 없으면 이 부분은 빼도 됨)
      const dateKey = dayjs(new Date(y, m - 1, d)).format("YYYY-MM-DD");
      selectDate(dateKey);
    };

  const formatMonthOnly = (_locale: string | undefined, date: Date): string =>
    dayjs(date).format("M월");

  const tileContent = ({ date, view }: CustomTileProperties) => {
    if (view === "month") {
      const dateKey = dayjs(date).format("YYYY-MM-DD");
      const summary = dailySummaries.find((s) => s.date === dateKey);

      if (summary && summary.totalExpense > 0) {
        return (
          <p className="absolute bottom-0 left-0 right-0 text-center text-[0.6rem] leading-tight text-text-red-500">
            {SYMBOLS.MINUS}
            {formatCurrency(summary.totalExpense)}
          </p>
        );
      }
    }
    return null;
  };

  const tileClassName = ({ date, view }: CustomTileProperties) => {
    let classes = "relative";
    const today = dayjs().startOf("day");
    const tileDay = dayjs(date).startOf("day");
    const isToday = tileDay.isSame(today);

    if (view === "month") {
      const dayOfWeek = date.getDay();

      if (dayOfWeek === 0) classes += " text-red-500";
      if (dayOfWeek === 6) classes += " text-blue-500";

      const dateKey = dayjs(date).format("YYYY-MM-DD");
      const isSelected = selectedDailySummary?.date === dateKey;

      if (isToday) {
        if (!isSelected) {
          classes += " text-primary-green-text";
        }
      }

      if (isSelected) {
        if (isToday) {
          classes += " today-selected-style";
        } else {
          classes += " selected-style";
        }
      }
    }
    return classes;
  };

  return (
    <div className="spending-calendar-container mx-auto">
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
        onActiveStartDateChange={handleActiveStartDateChange}
      />
    </div>
  );
};

export default SpendingCalendar;
