export interface GoalResponse {
  goal: string;
  targetCount: number;
  currentCount: number;
}

export interface GoalUpdateRequest {
  goal: string;
  targetCount: number;
}
