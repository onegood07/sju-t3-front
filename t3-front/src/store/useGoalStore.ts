import { create } from "zustand";
import type { GoalResponse } from "../types/";

interface GoalState {
  goal: GoalResponse | null;
  setGoal: (data: GoalResponse) => void;
}

export const useGoalStore = create<GoalState>((set) => ({
  goal: null,
  setGoal: (data) => set({ goal: data }),
}));
