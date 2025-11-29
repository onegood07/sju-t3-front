// MARK: Response - 이번달 목표, 목표 개수, 현재 개수
export interface GoalResponse {
  goal: string;
  targetCount: number;
  currentCount: number;
}

// MARK: Request - 이번달 목표, 목표 개수
export interface GoalUpdateRequest {
  goal: string;
  targetCount: number;
}
