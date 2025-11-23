import type { Mascot } from "../types/mascot";

export const LABELS = {
  GENERAL: {
    CURRENT_MONTH_GOAL: "이번달 목표",
    CURRENT_MONTH_GOAL_SPENDING: "이번달 목표 소비 비용",
    CURRENT_MONTH_SPENDING: "이번달 소비 비용",
    PLANNED_SPENDING_COUNT: "이번달 계획소비 개수",
  },
  BUTTON: {
    LOGIN: "카카오로 시작하기",
    CHATTING: "대화하러 가기",
    CONFIRM: "확인",
    IMPULSIVE_SPENDING: "충동적 소비",
    PLANNED_SPENDING: "계획적 소비",
  },
  DYNAMIC: {
    ADVICE: (mascot: Mascot) => `${mascot.name}의 한마디`,
  },
} as const;
