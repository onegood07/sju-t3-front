import { useState, useEffect } from "react";
import Card from "../components/common/Card";
import ProgressBar from "../components/charts/ProgressBar";
import CategoryDonutChart from "../components/charts/CategoryDonutChart";

import { IMAGES } from "../constants";
import { formatCurrency } from "../utils/";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getTransaction,
  getExpenseCount,
  getMonthlyAmount,
  getGoal,
  getMonthlyFeedback
} from "../api";
import { ExpenseCategoryLabel } from "../types";

const safeExpenseCategory = (cat: string): keyof typeof ExpenseCategoryLabel => {
  if (cat in ExpenseCategoryLabel) {
    return cat as keyof typeof ExpenseCategoryLabel;
  }
  return "ETC_EXPENSE"; // 기본값
};

const ExpenseCategoryColor: Record<keyof typeof ExpenseCategoryLabel, string> = {
  FOOD: "#FF9F5B",               // 식비
  TRANSPORT: "#FFD86E",          // 교통
  HOUSING: "#7BDDA1",            // 주거
  EDUCATION: "#6DD3FF",          // 교육
  HEALTH: "#A991F7",             // 건강
  HOBBY: "#F39EC2",              // 취미
  FASHION: "#FF7F7F",            // 패션
  DRINK: "#8DD1E1",              // 음료
  EVENT: "#B39DDB",              // 이벤트
  TRAVEL: "#80CBC4",             // 여행
  DAILY_NECESSITIES: "#C5E1A5",  // 생활용품
  FINANCE: "#FFCC80",            // 금융
  ETC_EXPENSE: "#B0BEC5",        // 기타
};

const ReportPage = () => {
  const [showDetail, setShowDetail] = useState(false);

  //===== 날짜 관리 =====//
  const location = useLocation();
  const navState = location.state;
  const today = new Date();
  const [year, setYear] = useState(navState?.year || today.getFullYear());
  const [month, setMonth] = useState(navState?.month || today.getMonth() + 1);
  //===== 요약 =====//
  const [summary, setSummary2] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoadingSummary(true);
        const res = await getMonthlyFeedback(year, month);
        setSummary2(res.summary2);
      } catch (err) {
        console.error("summary 불러오기 실패:", err);
      } finally {
        setLoadingSummary(false);
      }
    };

    fetchSummary();
  }, [year, month]);

  //===== 목표 =====//
  const [goalData, setGoalData] = useState({
    goal: "",
    targetCount: 0,
    currentCount: 0
  });
  const [loadingGoal, setLoadingGoal] = useState(true);
  const isAchieved = goalData.currentCount <= goalData.targetCount;

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        setLoadingGoal(true);
        const res = await getGoal(year, month);
        setGoalData(res);
      } catch (err) {
        console.error("목표 불러오기 실패:", err);
      } finally {
        setLoadingGoal(false);
      }
    };

    fetchGoal();
  }, [year, month]);

  //===== 이번달 금액 =====//
  const [monthlyAmount, setMonthlyAmount] = useState({
    totalGoalAmount: 0,
    totalExpenseAmount: 0,
    totalIncomeAmount: 0
  });
  const [loadingAmount, setLoadingAmount] = useState(true);

  const isBudgetAchieved =
    monthlyAmount.totalExpenseAmount <= monthlyAmount.totalGoalAmount;

  useEffect(() => {
    const fetchMonthlyAmount = async () => {
      try {
        setLoadingAmount(true);
        const res = await getMonthlyAmount(year, month);
        setMonthlyAmount(res);
      } catch (err) {
        console.error("이번달 금액 불러오기 실패:", err);
      } finally {
        setLoadingAmount(false);
      }
    };

    fetchMonthlyAmount();
  }, [year, month]);

  //===== 이번달 소비 개수 =====//
  const [countData, setCountData] = useState({
    totalExpenseCount: 0,
    impulseCount: 0,
    plannedCount: 0
  });
  const [loadingCount, setLoadingCount] = useState(true);

  const isPlanAchieved = countData.plannedCount >= countData.impulseCount;
  const totalExpenseCount = countData.totalExpenseCount;
  const impulseCount = countData.impulseCount;
  const plannedCount = countData.plannedCount;

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        setLoadingCount(true);
        const res = await getExpenseCount(year, month);
        setCountData(res);
      } catch (err) {
        console.error("소비 개수 불러오기 실패:", err);
      } finally {
        setLoadingCount(false);
      }
    };

    fetchCounts();
  }, [year, month]);

  //============================================================
  //  카테고리 통계 (중복 문제 해결)
  //============================================================

  type CategoryItem = {
    label: string;
    amount: number;
    percent: number;
    color: string;
  };

  type CategoryStatsType = {
    values: number[];
    colors: string[];
    list: CategoryItem[];
  };

  const [categoryStats, setCategoryStats] = useState<CategoryStatsType>({
    values: [],
    colors: ["#FF9F5B", "#FFD86E", "#7BDDA1", "#6DD3FF", "#A991F7", "#F39EC2"],
    list: []
  });

  const [loadingCategory, setLoadingCategory] = useState(true);

  useEffect(() => {
    const fetchMonthlyTransactions = async () => {
      try {
        setLoadingCategory(true);

        const daysInMonth = new Date(year, month, 0).getDate();
        let allTransactions: any[] = [];

        // 🔥 날짜별로 수집
        for (let day = 1; day <= daysInMonth; day++) {
          const dateString = `${year}-${String(month).padStart(2, "0")}-${String(
            day
          ).padStart(2, "0")}`;

          try {
            const res = await getTransaction(dateString);
            const expenses = res.filter(
              (t: any) => t.incomeType === "EXPENSE"
            );
            allTransactions.push(...expenses);
          } catch { }
        }

        // 중복 제거 (ID 기준)
        allTransactions = Array.from(
          new Map(allTransactions.map((i) => [i.id, i])).values()
        );

        // 카테고리 초기화
        const categoryMap: Record<keyof typeof ExpenseCategoryLabel, number> = {
          FOOD: 0,
          TRANSPORT: 0,
          HOUSING: 0,
          EDUCATION: 0,
          HEALTH: 0,
          HOBBY: 0,
          FASHION: 0,
          DRINK: 0,
          EVENT: 0,
          TRAVEL: 0,
          DAILY_NECESSITIES: 0,
          FINANCE: 0,
          ETC_EXPENSE: 0,
        };

        //  카테고리 합산 (정규화 적용)
        allTransactions.forEach((item) => {
          const cat = safeExpenseCategory(item.category);
          categoryMap[cat] += item.price;
        });

        //  배열 변환
        const categories = Object.entries(categoryMap).map(([cat, amount]) => ({
          label: ExpenseCategoryLabel[cat as keyof typeof ExpenseCategoryLabel],
          amount
        }));

        const total = categories.reduce(
          (acc, cur) => acc + cur.amount,
          0
        ) || 1;

        const list = categories.map((item) => {
          const catKey =
            (Object.keys(ExpenseCategoryLabel) as (keyof typeof ExpenseCategoryLabel)[])
              .find((k) => ExpenseCategoryLabel[k] === item.label) || "ETC_EXPENSE";

          return {
            ...item,
            percent: Math.round((item.amount / total) * 100),
            color: ExpenseCategoryColor[catKey]   // ← 고정 색 적용
          };
        });

        //  도넛 차트 색상 배열 생성
        const donutColors = categories.map((item) => {
          const catKey =
            (Object.keys(ExpenseCategoryLabel) as (keyof typeof ExpenseCategoryLabel)[])
              .find((k) => ExpenseCategoryLabel[k] === item.label) || "ETC_EXPENSE";

          return ExpenseCategoryColor[catKey];
        });

        // 상태 업데이트 (colors도 고정색으로 변경)
        setCategoryStats({
          values: categories.map((c) => c.amount),
          colors: donutColors,
          list
        });

      } catch (err) {
        console.error("카테고리 통계 불러오기 실패:", err);
      } finally {
        setLoadingCategory(false);
      }
    };

    fetchMonthlyTransactions();
  }, [year, month]);

  //============================================================

  const navigate = useNavigate();

  const goPrevMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };

  const goNextMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };

  const achievedCount = [
    isAchieved,
    isBudgetAchieved,
    isPlanAchieved
  ].filter(Boolean).length;

  const getMascotImage = () => {
    if (achievedCount === 3) return IMAGES.MASCOT.ACTIVE.DAY;
    if (achievedCount === 2) return IMAGES.MASCOT.ACTIVE.TO;
    return IMAGES.MASCOT.ACTIVE.NOT; // 0개 또는 1개
  };
  const getMascotStatus = () => {
    if (achievedCount === 3) return "DAY";
    if (achievedCount === 2) return "TO";
    return "NOT"; // 0~1개
  };
  //============================================================
  //  UI 렌더링
  //============================================================

  return (
    <div className="p-4 flex flex-col gap-4 bg-app-bg">
      {/* 월 이동 */}
      <div className="w-full flex items-center justify-between px-2 py-3">
        <button
          onClick={goPrevMonth}
          className="text-[20px] text-text-gray font-light"
        >
          &lt;
        </button>

        <p className="text-text-gray font-semibold text-lg">
          {year}년 {month}월
        </p>

        <button
          onClick={goNextMonth}
          className="text-[20px] text-text-gray font-light"
        >
          &gt;
        </button>
      </div>

      {/* 이번달 요약 */}
      <div className="flex gap-3 items-stretch">
        <Card className="flex-1 p-5 flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <p className="text-text-gray text-xs">이번달 요약</p>

            <button
              onClick={() => setShowDetail((prev) => !prev)}
              className="text-xs text-text-gray"
            >
              {showDetail ? "접기 ▲" : "자세히 보기 ▼"}
            </button>
          </div>

          <p className="text-text-primary font-semibold text-[14px] mt-1">
            목표 3개 중 {achievedCount}개 달성했어요!
          </p>

          {showDetail && (
            <p className="text-text-gray text-[13px] mt-1 leading-[1.3] whitespace-pre-line">
              {loadingSummary
                ? "요약을 불러오는 중이에요..."
                : summary || "이번달 분석 리포트를 불러올 수 없어요."}
            </p>
          )}
        </Card>

        <Card className="w-[110px] flex items-center justify-center p-3">
          <img
            src={getMascotImage()}
            className={`transition-all duration-300 
              ${showDetail ? "w-[6rem] h-[7rem]" : "w-[5.5rem] h-[5.5rem]"}
              object-contain`}
            alt="mascot"
          />
        </Card>
      </div>

      {/* 이번달 목표/예산 */}
      <div className="flex gap-3">
        <Card className="flex-1 p-5 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <p className="text-text-gray text-xs">이번달 목표</p>

            {loadingGoal ? (
              <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-0.5 rounded-md">
                로딩중
              </span>
            ) : isAchieved ? (
              <span className="text-[10px] bg-[#D7F7C6] text-green-700 px-2 py-0.5 rounded-md flex items-center gap-1">
                <svg
                  className="w-3 h-3 text-green-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                달성
              </span>
            ) : (
              <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-0.5 rounded-md flex items-center gap-1">
                <svg
                  className="w-3 h-3 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                미달성
              </span>
            )}
          </div>

          {/* 제목 - 폰트 조금 줄임 */}
          <p className="text-text-primary text-base font-semibold mt-1">
            {loadingGoal ? "목표 불러오는 중..." : goalData.goal}
          </p>

          {/* 설명 - 위쪽 간격 추가! */}
          <p className="text-text-gray text-xs mt-5 leading-relaxed">
            목표 소비 횟수 {goalData.targetCount}번 중{" "}
            {goalData.currentCount}번 소비했어요!
          </p>
        </Card>

        <Card className="flex-1 p-5 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-text-gray text-xs">이번달 예산</p>

            {loadingAmount ? (
              <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-0.5 rounded-md">
                로딩중
              </span>
            ) : isBudgetAchieved ? (
              <span className="text-[10px] bg-[#D7F7C6] text-green-700 px-2 py-0.5 rounded-md flex items-center gap-1">
                <svg
                  className="w-3 h-3 text-green-700"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                달성
              </span>
            ) : (
              <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-0.5 rounded-md flex items-center gap-1">
                <svg
                  className="w-3 h-3 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                미달성
              </span>
            )}
          </div>

          <div className="mt-1">
            <p className="text-text-gray text-[11px]">이번달 총 소비</p>
            <p className="text-primary-red text-lg font-bold">
              -{formatCurrency(monthlyAmount.totalExpenseAmount)}원
            </p>
          </div>

          <div className="mt-1">
            <p className="text-text-gray text-[11px]">이번달 총 소비 목표 비용</p>
            <p className="text-text-primary text-base font-semibold">
              {formatCurrency(monthlyAmount.totalGoalAmount)}원
            </p>
          </div>
        </Card>
      </div>

      {/* 계획소비/즉흥소비 */}
      <Card className="p-5 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <p className="text-text-gray text-sm">이번달 계획소비 개수</p>
          <p className="text-text-gray text-sm">총 {totalExpenseCount}개</p>
        </div>

        <div className="flex items-center gap-3">
          <img
            src={IMAGES.MASCOT.SINGLE.NOT}
            className="w-[3rem] h-[3rem]"
          />
          <ProgressBar
            label="즉흥"
            value={impulseCount}
            total={totalExpenseCount}
            variant="red"
          />
        </div>

        <div className="flex items-center gap-3">
          <img src={IMAGES.MASCOT.SINGLE.DAY} className="w-[3rem] h-[3rem]" />
          <ProgressBar
            label="계획"
            value={plannedCount}
            total={totalExpenseCount}
            variant="green"
          />
        </div>
      </Card>

      {/* 이번달 총 수입 */}
      <Card
        className="flex flex-row items-center justify-between px-6 py-4 cursor-pointer"
        onClick={() => navigate("/income", { state: { year, month } })}
      >
        <div className="flex items-center gap-3 whitespace-nowrap">
          <span className="text-text-gray text-sm">이번달 총 수입</span>
          <span className="text-text-green font-bold text-base">
            +{formatCurrency(monthlyAmount.totalIncomeAmount)}원
          </span>
        </div>
        <span className="text-text-gray text-xl flex-shrink-0">&gt;</span>
      </Card>

      {/* 카테고리 도넛 차트 */}
      <Card className="p-6 flex flex-col gap-6">
        <div className="flex justify-between">
          <p className="text-text-gray text-sm">이번달 분야별 지출 통계</p>
          <p className="text-text-gray text-sm">
            총 {formatCurrency(monthlyAmount.totalExpenseAmount)}원
          </p>
        </div>

        <div className="flex justify-center">
          <CategoryDonutChart
            data={categoryStats.values}
            colors={categoryStats.colors}
            centerText={formatCurrency(monthlyAmount.totalExpenseAmount)}
          />
        </div>

        <div className="flex flex-col gap-2">
          {categoryStats.list.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center text-sm cursor-pointer"
              onClick={() => navigate(`/report/category/${item.label}`, {
                state: {
                  label: item.label,
                  amount: item.amount,
                  year,
                  month,
                  percent: item.percent,
                  mascotStatus: getMascotStatus(),
                }
              })
              }
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></span>

                <span className="text-text-primary">
                  {item.label} ({item.percent}%)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-black">
                  -{formatCurrency(item.amount)}원
                </span>
                <span className="text-text-gray text-lg">&gt;</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ReportPage;
