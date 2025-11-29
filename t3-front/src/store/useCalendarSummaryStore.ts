import { create } from "zustand";
import type { DailySummary, MonthlySummaryResponse } from "../types";

interface CalendarSummaryState {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  dailySummaries: DailySummary[];
  selectedDailySummary: DailySummary | null;

  setCalendarSummary: (data: MonthlySummaryResponse) => void;
  selectDate: (date: string) => void;
  reset: () => void;
}

export const useCalendarSummaryStore = create<CalendarSummaryState>(
  (set, get) => ({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    dailySummaries: [],
    selectedDailySummary: null,

    setCalendarSummary: (data) =>
      set(() => ({
        totalIncome: data.totalIncome,
        totalExpense: data.totalExpense,
        balance: data.balance,
        dailySummaries: data.dailySummaries,
      })),

    selectDate: (date: string) => {
      const list = get().dailySummaries;
      const found = list.find((d) => d.date === date) || null;

      set(() => ({
        selectedDailySummary: found,
      }));
    },

    reset: () =>
      set(() => ({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
        dailySummaries: [],
        selectedDailySummary: null,
      })),
  })
);
