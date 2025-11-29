export interface MonthlyGoalAmountRequest {
  amount: number;
}

export interface MonthlyAmountResponse {
  id: number;
  userId: number;
  month: string;
  totalGoalAmount: number;
  totalExpenseAmount: number;
  totalIncomeAmount: number;
  createdAt: string;
  updatedAt: string;
}
