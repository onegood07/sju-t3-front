import api from "./apiClient";
import type {
  MonthlyGoalAmountRequest,
  MonthlyAmountResponse,
  OnlyStringResponse,
} from "../types/";

// MARK: 이번달 목표 소비 예산, 총 수입, 총 소비 가져오기
export const getMonthlyAmount = async (
  year: number,
  month: number
): Promise<MonthlyAmountResponse> => {
  const res = await api.get<MonthlyAmountResponse>(
    `/api/calendar/monthly/${year}/${month}`
  );

  return res.data;
};

// MARK: 이번달 목표 소비 예산 업데이트
export const updateMonthlyGoalAmount = async (
  year: number,
  month: number,
  body: MonthlyGoalAmountRequest
): Promise<OnlyStringResponse> => {
  const res = await api.post<OnlyStringResponse>(
    `/api/calendar/monthly/goal/${year}/${month}`,
    body
  );

  return res.data;
};
