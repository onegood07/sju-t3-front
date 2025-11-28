import type { Mascot } from "../types/mascot";

export const LABELS = {
  PAGE: {
    CHATTINGLIST: "채팅 목록",
    ADD_SPENDING: "내역 추가",
  },
  GENERAL: {
    CURRENT_MONTH_GOAL: "이번달 목표",
    CURRENT_MONTH_GOAL_SPENDING: "이번달 목표 소비 비용",
    CURRENT_MONTH_SPENDING: "이번달 총 소비",
    CURRENT_MONTH_INCOME: "이번달 총 수입",
    PLANNED_SPENDING_COUNT: "이번달 계획소비 개수",
  },
  BUTTON: {
    INCOME: "수입",
    SPENDING: "소비",
    LOGIN: "카카오로 시작하기",
    CHATTING: "대화하러 가기",
    CONFIRM: "확인",
    IMPULSIVE_SPENDING: "충동적 소비",
    PLANNED_SPENDING: "계획적 소비",
    PLUS: "추가",
    SAVE: "저장하기",
  },
  INPUT: {
    DATE: "날짜",
    PRICE: "금액",
    CATEGORY: "분류",
    DETAIL: "내용",
    MEMO: "메모",
    IS_IMPULSIVE_SPENDING: "충동 소비 여부",
    PLACEHOLDER: {
      DATE: "날짜를 입력하세요",
      PRICE: "금액을 입력하세요",
      CATEGORY: "카테고리를 선택하세요",
      DETAIL: "내용을 입력하세요",
      MEMO: "메모를 입력하세요",
    },
  },
  DYNAMIC: {
    ADVICE: (mascot: Mascot) => `${mascot.name}의 한마디`,
  },
} as const;
