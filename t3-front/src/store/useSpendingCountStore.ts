import { create } from "zustand";
import { MASCOT_DATA } from "../constants";
import type { MascotName, MascotKoreanName } from "../types";

const getMascotName = (impulse: number, planned: number): MascotName => {
  const diff = impulse - planned;
  if (diff >= 1) return "MascotNot";
  if (diff <= -1) return "MascotDay";
  return "MascotTo";
};

export interface SpendingCountState {
  totalExpenseCount: number;
  impulseCount: number;
  plannedCount: number;

  mascotName: MascotName;
  mascot: {
    name: MascotName;
    koreanName: MascotKoreanName;
    image: string;
    activeImage: string;
    description: string;
  };

  setSpendingCount: (data: Partial<SpendingCountState>) => void;
}

export const useSpendingCountStore = create<SpendingCountState>((set) => ({
  totalExpenseCount: 0,
  impulseCount: 0,
  plannedCount: 0,

  mascotName: "MascotTo",
  mascot: MASCOT_DATA.MascotTo,

  setSpendingCount: (data) =>
    set((state) => {
      const updated = { ...state, ...data };

      const mascotName = getMascotName(
        updated.impulseCount,
        updated.plannedCount
      );

      return {
        ...updated,
        mascotName,
        mascot: MASCOT_DATA[mascotName],
      };
    }),
}));
