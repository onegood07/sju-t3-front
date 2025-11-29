import { create } from "zustand";
import type { MonthlySummaryFeedbackResponse } from "../types";

interface MonthlyFeedbackState {
  summary: string;
  setFeedback: (data: MonthlySummaryFeedbackResponse) => void;
}

export const useMonthlyFeedbackStore = create<MonthlyFeedbackState>((set) => ({
  summary: "",
  setFeedback: (data) => set({ summary: data.summary }),
}));
