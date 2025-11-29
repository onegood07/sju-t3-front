import api from "./apiClient";
import type {
  GoalResponse,
  GoalUpdateRequest,
  OnlyStringResponse,
} from "../types/";

// MARK: 목표 가져오기 (이번달 목표, 목표 개수, 현재 개수)
export const getGoal = async (
  year: number,
  month: number
): Promise<GoalResponse> => {
  const res = await api.get<GoalResponse>(
    `/api/calendar/goal/${year}/${month}`
  );
  return res.data;
};

// MARK: 목표 업데이트 (이번달 목표, 목표 개수)
export const updateGoal = async (
  year: number,
  month: number,
  body: GoalUpdateRequest
): Promise<OnlyStringResponse> => {
  const res = await api.post<OnlyStringResponse>(
    `/api/calendar/goal/${year}/${month}`,
    body
  );

  return res.data;
};
