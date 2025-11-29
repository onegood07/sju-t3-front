import api from "./apiClient";
import type {
  ExpenseCountResponse,
  MonthlySummaryResponse,
  TransactionListResponse,
  Transaction,
  MonthlySummaryFeedbackResponse,
  TransactionRequest,
} from "../types/";

// MARK: GET - 계획, 즉흥 소비 개수 가져오기
export const getExpenseCount = async (
  year: number,
  month: number
): Promise<ExpenseCountResponse> => {
  const res = await api.get<ExpenseCountResponse>(
    `/api/calendar/count/${year}/${month}`
  );

  return res.data;
};

// MARK: GET - 이번달 총 수입, 지출, 잔액, 날짜별 수입, 지출, 잔액
export const getThisMonthIncomeExpenseBalance = async (
  year: number,
  month: number
): Promise<MonthlySummaryResponse> => {
  const res = await api.get<MonthlySummaryResponse>(
    `/api/calendar/summary/${year}/${month}`
  );

  return res.data;
};

// MARK: GET - 이번달 내역 가져오기
export const getTransaction = async (
  date: string
): Promise<TransactionListResponse> => {
  const res = await api.get<TransactionListResponse>(
    `/api/calendar/transactions/${date}`
  );

  return res.data;
};

// MARK: POST - 내역 업데이트
export const updateTransaction = async (
  body: TransactionRequest
): Promise<Transaction> => {
  const res = await api.post<Transaction>("/api/calendar/transaction", body);

  return res.data;
};

// MARK: GET - 이번달 리포트
export const getMonthlyFeedback = async (
  year: number,
  month: number
): Promise<MonthlySummaryFeedbackResponse> => {
  const res = await api.get<MonthlySummaryFeedbackResponse>(
    `/api/calendar/report/${year}/${month}`
  );

  return res.data;
};

// MARK: POST - 내역 업데이트
export const postMonthlyFeedback = async (
  year: number,
  month: number
): Promise<MonthlySummaryFeedbackResponse> => {
  const res = await api.post<MonthlySummaryFeedbackResponse>(
    `/api/calendar/report/${year}/${month}`
  );

  return res.data;
};
