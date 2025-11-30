import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/common/Card";
import {
  getGoal,
  getMonthlyAmount,
  getExpenseCount,
  getThisMonthIncomeExpenseBalance,
  postMonthlyFeedback,
  getTransaction,
} from "../api/";
import { LABELS, APP_INFO, IMAGES, ICONS, SYMBOLS, UNITS } from "../constants/";
import {
  Button,
  ProgressBar,
  ProgressCircle,
  Status,
  SpendingCalendar,
  SpendingItem,
} from "../components/";
import { formatCurrency } from "../utils/";
import {
  useGoalStore,
  useDateStore,
  useMonthlyAmountStore,
  useSpendingCountStore,
  useCalendarSummaryStore,
  useMonthlyFeedbackStore,
  useTransactionStore,
} from "../store/";
import { ExpenseCategoryLabel, IncomeCategoryLabel } from "../types";

const HomePage = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const selectedYear = useDateStore((state) => state.selectedYear);
  const selectedMonth = useDateStore((state) => state.selectedMonth);
  const selectedDate = useDateStore((state) => state.selectedDate);

  const { goal, setGoal } = useGoalStore();
  const {
    totalGoalAmount,
    totalExpenseAmount,
    totalIncomeAmount,
    setMonthlyAmount,
  } = useMonthlyAmountStore();
  const { totalExpenseCount, impulseCount, plannedCount, setSpendingCount } =
    useSpendingCountStore();
  const { mascot } = useSpendingCountStore();
  const { setCalendarSummary } = useCalendarSummaryStore();
  const { summary, setFeedback } = useMonthlyFeedbackStore();
  const { transactions, setTransactions } = useTransactionStore();

  const today = new Date();
  const lastDayOfMonth = new Date(selectedYear, selectedMonth, 0);
  const remainingDays = Math.max(
    Math.ceil(
      (lastDayOfMonth.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    ),
    0
  );

  useEffect(() => {
    console.log(
      "선택된 날짜가 변경됨:",
      selectedYear,
      selectedMonth,
      selectedDate
    );
  }, [selectedYear, selectedMonth, selectedDate]);

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const data = await getGoal(selectedYear, selectedMonth);
        setGoal(data);
      } catch (error) {
        console.error("목표 불러오기 실패:", error);
      }
    };

    fetchGoal();
  }, [selectedYear, selectedMonth, setGoal]);

  useEffect(() => {
    const fetchMonthlyAmount = async () => {
      try {
        const data = await getMonthlyAmount(selectedYear, selectedMonth);
        setMonthlyAmount({
          totalGoalAmount: data.totalGoalAmount,
          totalExpenseAmount: data.totalExpenseAmount,
          totalIncomeAmount: data.totalIncomeAmount,
        });
      } catch (err) {
        console.error("이번달 금액 정보 불러오기 실패:", err);
      }
    };

    fetchMonthlyAmount();
  }, [selectedYear, selectedMonth, setMonthlyAmount]);

  useEffect(() => {
    const fetchSpendingCount = async () => {
      try {
        const data = await getExpenseCount(selectedYear, selectedMonth);
        setSpendingCount({
          totalExpenseCount: data.totalExpenseCount,
          impulseCount: data.impulseCount,
          plannedCount: data.plannedCount,
        });
      } catch (err) {
        console.error("이번달 소비 개수 불러오기 실패:", err);
      }
    };
    fetchSpendingCount();
  }, [selectedYear, selectedMonth, setSpendingCount]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getThisMonthIncomeExpenseBalance(
          selectedYear,
          selectedMonth
        );
        setCalendarSummary(data);
      } catch (err) {
        console.error("달력 요약 불러오기 실패:", err);
      }
    };

    fetchSummary();
  }, [selectedYear, selectedMonth, setCalendarSummary]);

  useEffect(() => {
    const fetchMonthlyFeedbackData = async () => {
      try {
        const data = await postMonthlyFeedback(selectedYear, selectedMonth);
        setFeedback(data);
      } catch (err) {
        console.error("월별 피드백 불러오기 실패:", err);
      }
    };

    fetchMonthlyFeedbackData();
  }, [selectedYear, selectedMonth, setFeedback]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const dateStr = `${selectedYear}-${String(selectedMonth).padStart(
          2,
          "0"
        )}-${String(selectedDate).padStart(2, "0")}`;
        const data = await getTransaction(dateStr);
        setTransactions(data);
      } catch (err) {
        console.error("거래 내역 불러오기 실패:", err);
        setTransactions([]);
      }
    };

    fetchTransactions();
  }, [selectedYear, selectedMonth, selectedDate, setTransactions]);

  return (
    <div className="p-4 bg-app-bg">
      <div className="flex justify-between items-start">
        <p className="font-bold text-xl pb-4">{APP_INFO.NAME}</p>

        {/* 톱니바퀴 버튼 */}
        <div className="relative">
          <Button
            variant="noneBgApp"
            icon={<ICONS.SETTING />}
            className="w-[2rem] h-[2rem] text-3xl font-medium text-icon-gray mb-1"
            onClick={() => setMenuOpen((prev) => !prev)}
          />

          {/* 드롭다운 메뉴 */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  navigate("/update-goal");
                  setMenuOpen(false);
                }}
              >
                {LABELS.BUTTON.GOAL_UPDATE}
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  navigate("/update-amount");
                  setMenuOpen(false);
                }}
              >
                {LABELS.BUTTON.TARGET_SPENDING_AMOUNT}
              </button>
            </div>
          )}
        </div>
      </div>

      <Card className="flex flex-col p-5 bg-white-default mb-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-m text-text-gray font-semibold text-sm pb-1">
              {mascot.koreanName}
              {LABELS.GENERAL.ADVICE}
            </p>
            <p className="text-text-primary text-xl font-medium pb-8">
              {mascot.description}
            </p>
            <p className="text-text-primary text-sm">
              {summary || "생각하는 중..."}
            </p>
          </div>
          <img
            src={mascot.image}
            className="w-[10rem] h-[10rem] mx-auto my-4"
          />
        </div>
        <Button className="h-12" onClick={() => navigate("/chatting-list")}>
          {LABELS.BUTTON.CHATTING}
        </Button>
      </Card>

      <div className="flex items-start justify-between gap-4 mb-2">
        <Card className="p-4 w-full">
          <div className="w-full">
            <div className="flex items-start justify-between gap-4 mb-2">
              <p className="text-text-gray font-semibold text-sm">
                {LABELS.GENERAL.PLANNED_SPENDING_COUNT}
              </p>
              <p className="text-text-gray text-sm font-medium">
                총 {totalExpenseCount}
                {UNITS.ITEM}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <img
                src={IMAGES.MASCOT.SINGLE.NOT}
                className="w-[3rem] h-[3rem] mr-4 my-4"
              />
              <ProgressBar
                label={LABELS.GENERAL.IMPULSIVE}
                value={impulseCount}
                total={totalExpenseCount}
                variant="red"
              />
            </div>

            <div className="flex items-center justify-between">
              <img
                src={IMAGES.MASCOT.SINGLE.DAY}
                className="w-[3rem] h-[3rem] mr-4 my-4"
              />
              <ProgressBar
                label={LABELS.GENERAL.PLANNED}
                value={plannedCount}
                total={totalExpenseCount}
                variant="green"
              />
            </div>
          </div>
        </Card>

        <Card className="h-[12.8rem] bg-white-default w-[8rem] flex items-center justify-center">
          <img
            src={mascot.activeImage}
            className="w-[22rem] h-[7rem] mx-auto my-4"
          />
        </Card>
      </div>

      <Card className="p-6 bg-white-default mb-2">
        <div className="items-start">
          <div className="flex items-start">
            <div className="flex flex-col w-[12rem]">
              <Status className="w-[4rem] rounded-lg">
                {SYMBOLS.D_DAY}
                {remainingDays}
              </Status>
              <p className="text-text-gray font-medium text-sm mt-2">
                {LABELS.GENERAL.CURRENT_MONTH_GOAL}
              </p>
              <p className="text-text-primary text-lg mt-1">
                {goal ? goal.goal : "목표 불러오는 중..."}
              </p>
            </div>
            <ProgressCircle
              current={goal ? goal.currentCount : 0}
              goal={goal ? goal.targetCount : 0}
              mode="fraction"
            />
          </div>

          <div className="w-full h-[0.1rem] bg-border-line my-2"></div>

          <div className="flex items-center mt-4 gap-4">
            <p className="text-text-gray text-sm font-medium">
              {LABELS.GENERAL.CURRENT_MONTH_GOAL_SPENDING}
            </p>
            <p className="text-text-primary text-base mt-1">
              {formatCurrency(totalGoalAmount || 0)}
              {UNITS.WON}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-5 bg-white-default mb-2">
        <div className="flex items-center justify-center gap-8">
          <div className="flex flex-col items-center justify-center w-[10rem]">
            <p className="text-text-gray text-sm font-medium mb-2">
              {LABELS.GENERAL.CURRENT_MONTH_INCOME}
            </p>
            <p className="text-text-green font-medium">
              {SYMBOLS.PLUS}
              {formatCurrency(totalIncomeAmount || 0)}
              {UNITS.WON}
            </p>
          </div>

          <div className="w-px h-[4rem] bg-border-line"></div>

          <div className="flex flex-col items-center justify-center w-[8rem]">
            <p className="text-text-gray text-sm font-medium mb-2">
              {LABELS.GENERAL.CURRENT_MONTH_SPENDING}
            </p>
            <p className="text-primary-red font-medium">
              {SYMBOLS.MINUS}
              {formatCurrency(totalExpenseAmount || 0)}
              {UNITS.WON}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-5 bg-white-default mb-2">
        <SpendingCalendar />
      </Card>

      <div className="p-5 bg-white-default mb-2 rounded-xl">
        <div>
          <div className="w-full flex justify-between items-center mb-4">
            <p className="text-text-gray font-medium text-sm">
              {selectedMonth}
              {UNITS.MONTH} {selectedDate}
              {UNITS.DATE}
            </p>

            <div className="relative flex-shrink-0">
              <Button
                variant="noneBgWhite"
                icon={<ICONS.PLUS />}
                className="w-12 h-4 !py-0 flex items-center justify-center text-sm text-icon-gray"
                onClick={() => navigate("/add")}
              >
                {LABELS.BUTTON.PLUS}
              </Button>
            </div>
          </div>

          <div className="flex flex-col">
            {transactions.map((t) => {
              const categoryLabel =
                t.incomeType === "EXPENSE"
                  ? ExpenseCategoryLabel[
                      t.category as keyof typeof ExpenseCategoryLabel
                    ] || t.category
                  : IncomeCategoryLabel[
                      t.category as keyof typeof IncomeCategoryLabel
                    ] || t.category;

              return (
                <SpendingItem
                  key={t.id}
                  type={t.incomeType === "EXPENSE" ? "Spending" : "Income"}
                  name={t.itemName}
                  statusVariant={
                    t.planType === "PLANNED" ? "outLine" : "grayBg"
                  }
                  category={categoryLabel}
                  price={formatCurrency(t.price)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
