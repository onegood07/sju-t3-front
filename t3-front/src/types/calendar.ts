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

export const ExpenseCategoryLabel: Record<
  keyof typeof ExpenseCategory,
  string
> = {
  FOOD: "식비",
  TRANSPORT: "교통",
  HOUSING: "주거",
  EDUCATION: "교육",
  HEALTH: "건강",
  HOBBY: "취미",
  FASHION: "패션",
  DRINK: "음료",
  EVENT: "이벤트",
  TRAVEL: "여행",
  DAILY_NECESSITIES: "생활용품",
  FINANCE: "금융",
  ETC_EXPENSE: "기타",
};

export const IncomeCategory = {
  SALARY: "SALARY",
  ALLOWANCE: "ALLOWANCE",
  REFUND: "REFUND",
  INTEREST: "INTEREST",
  ETC: "ETC",
  SIDE_INCOME: "SIDE_INCOME",
} as const;

export const IncomeCategoryLabel: Record<keyof typeof IncomeCategory, string> =
  {
    SALARY: "급여",
    ALLOWANCE: "용돈",
    REFUND: "환급",
    INTEREST: "이자",
    ETC: "기타",
    SIDE_INCOME: "부수입",
  };

export type ExpenseCategoryType =
  (typeof ExpenseCategory)[keyof typeof ExpenseCategory];
export type IncomeCategoryType =
  (typeof IncomeCategory)[keyof typeof IncomeCategory];

export type CategoryType = ExpenseCategoryType | IncomeCategoryType;

export type IncomeOrExpense = "INCOME" | "EXPENSE";

export type planType = "IMPULSE" | "PLANNED";

export interface Transaction {
  id: number;
  userId: number;
  dateTime: string;
  incomeType: IncomeOrExpense;
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

export type TransactionListResponse = Transaction[];

export interface DailySummary {
  userId: number;
  date: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export interface MonthlySummaryResponse {
  summary: string | undefined;
  totalIncome: number;
  totalExpense: number;
  balance: number;
  dailySummaries: DailySummary[];
}

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
  summary_detailed: string;
  categoryFeedback: string;
}
