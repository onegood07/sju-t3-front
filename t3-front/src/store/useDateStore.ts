import { create } from "zustand";

interface DateState {
  selectedYear: number;
  selectedMonth: number;
  selectedDate: number;
  setYear: (year: number) => void;
  setMonth: (month: number) => void;
  setDate: (date: number) => void;
  setFullDate: (year: number, month: number, date: number) => void;
}

export const useDateStore = create<DateState>((set) => {
  const now = new Date();
  return {
    selectedYear: now.getFullYear(),
    selectedMonth: now.getMonth() + 1,
    selectedDate: now.getDate(),
    setYear: (year) => set({ selectedYear: year }),
    setMonth: (month) => set({ selectedMonth: month }),
    setDate: (date) => set({ selectedDate: date }),
    setFullDate: (year, month, date) =>
      set({ selectedYear: year, selectedMonth: month, selectedDate: date }),
  };
});
