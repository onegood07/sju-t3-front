import { create } from "zustand";

export interface MonthlyAmountState {
  totalGoalAmount: number;
  totalExpenseAmount: number;
  totalIncomeAmount: number;
  setMonthlyAmount: (data: Partial<MonthlyAmountState>) => void;
}

export const useMonthlyAmountStore = create<MonthlyAmountState>((set) => ({
  totalGoalAmount: 0,
  totalExpenseAmount: 0,
  totalIncomeAmount: 0,
  setMonthlyAmount: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),
}));
