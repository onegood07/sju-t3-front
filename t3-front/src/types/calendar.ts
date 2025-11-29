// 지출 카테고리
export const ExpenseCategory = {
  FOOD: "FOOD",
  TRANSPORT: "TRANSPORT",
  HOUSING: "HOUSING",
  EDUCATION: "EDUCATION",
  HEALTH: "HEALTH",
  HOBBY: "HOBBY",
  FASHION: "FASHION",
  DRINK: "DRINK",
  EVENT: "EVENT",
  TRAVEL: "TRAVEL",
  DAILY_NECESSITIES: "DAILY_NECESSITIES",
  FINANCE: "FINANCE",
  ETC_EXPENSE: "ETC_EXPENSE",
} as const;

// 수입 카테고리
export const IncomeCategory = {
  SALARY: "SALARY",
  ALLOWANCE: "ALLOWANCE",
  REFUND: "REFUND",
  INTEREST: "INTEREST",
  ETC: "ETC",
  SIDE_INCOME: "SIDE_INCOME",
} as const;

// 타입 정의
export type ExpenseCategoryType =
  (typeof ExpenseCategory)[keyof typeof ExpenseCategory];
export type IncomeCategoryType =
  (typeof IncomeCategory)[keyof typeof IncomeCategory];

// 수입/지출 합쳐서 쓸 타입
export type CategoryType = ExpenseCategoryType | IncomeCategoryType;

// 지출/수입 구분
export type IncomeOrExpense = "INCOME" | "EXPENSE";

// 계획 유형
export type planType = "IMPULSE" | "PLANNED";

// 지출/수입 항목 인터페이스
export interface Transaction {
  id: number;
  userId: number;
  dateTime: string;
  incomeOrExpense: IncomeOrExpense;
  category: CategoryType;
  itemName: string;
  price: number;
  planType: planType;
  memo: string;
}

export interface TransactionRequest {
  dateTime: string;
  incomeOrExpense: IncomeOrExpense;
  category: CategoryType;
  itemName: string;
  price: number;
  planType: planType;
  memo: string;
}

// 여러 Transaction 배열 타입
export type TransactionListResponse = Transaction[];

// 일일 요약
export interface DailySummary {
  userId: number;
  date: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

// 월간 요약
export interface MonthlySummaryResponse {
  summary: string | undefined;
  totalIncome: number;
  totalExpense: number;
  balance: number;
  dailySummaries: DailySummary[];
}

// 지출 통계
export interface ExpenseCountResponse {
  totalExpenseCount: number;
  impulseCount: number;
  plannedCount: number;
}

export interface MonthlySummaryFeedbackResponse {
  userId: number;
  month: string;
  uptoDate: string;
  summary: string;
  categoryFeedback: string;
}
