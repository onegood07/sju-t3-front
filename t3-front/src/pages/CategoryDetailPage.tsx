import { useParams, useNavigate, useLocation } from "react-router-dom";
import Card from "../components/common/Card";
import ProgressCircle from "../components/charts/ProgressCircle";
import { IMAGES } from "../constants";
import { formatCurrency } from "../utils/";
import { getMonthlyFeedback, getTransaction } from "../api";
import { useEffect, useState } from "react";
import {
    ExpenseCategory,
    ExpenseCategoryLabel,
} from "../types";
import type { ExpenseCategoryType, CategoryType } from "../types";


// ==================================================
//  1) 한글 라벨 → 영어 카테고리 KEY 역변환 함수
//     예: "식비" → "FOOD"
// ==================================================
const findCategoryKeyByLabel = (
    label: string
): keyof typeof ExpenseCategoryLabel | null => {
    return (
        (Object.keys(ExpenseCategoryLabel) as (keyof typeof ExpenseCategoryLabel)[])
            .find((key) => ExpenseCategoryLabel[key] === label) || null
    );
};

// ==================================================
//  2) CategoryType narrowing 함수
// ==================================================
const isExpenseCategory = (
    category: CategoryType
): category is ExpenseCategoryType => {
    return (Object.values(ExpenseCategory) as string[]).includes(category);
};


const CategoryDetailPage = () => {
    const { categoryName } = useParams();
    const navigate = useNavigate();
    const { state } = useLocation();

    // ReportPage에서 받은 값
    // label = "식비"
    const { label, amount, year, month, percent, mascotStatus } = state || {};

    const [evaluation, setEvaluation] = useState("");
    const [advice, setAdvice] = useState("");

    const [dailyHistory, setDailyHistory] = useState<
        {
            date: string;
            list: { name: string; category: string; amount: number }[];
        }[]
    >([]);

    const [totalCount, setTotalCount] = useState(0);

    // ==================================================
    // 1) 카테고리 피드백 로딩
    // ==================================================
    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                if (!year || !month) return;

                const res = await getMonthlyFeedback(year, month);
                const feedbackJson = JSON.parse(res.categoryFeedback || "{}");
                const catFeedback = feedbackJson[label];
                if (catFeedback) {
                    setEvaluation(catFeedback);
                    setAdvice("");
                }
            } catch (err) {
                console.error("카테고리 피드백 로딩 실패", err);
            }
        };

        fetchFeedback();
    }, [year, month, categoryName]);


    // ==================================================
    // 2) 월 전체 트랜잭션 → 해당 카테고리만 필터링
    // ==================================================
    useEffect(() => {
        const fetchCategoryTransactions = async () => {
            try {
                if (!year || !month || !label) return;

                // 🔥 한글 "식비" → "FOOD" 자동 변환
                const categoryKey = findCategoryKeyByLabel(label);
                if (!categoryKey) return;

                const daysInMonth = new Date(year, month, 0).getDate();
                let allExpenses: any[] = [];

                for (let day = 1; day <= daysInMonth; day++) {
                    const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(
                        day
                    ).padStart(2, "0")}`;

                    try {
                        const res = await getTransaction(dateStr);
                        const expenses = res.filter(
                            (t: any) => t.incomeType === "EXPENSE"
                        );
                        allExpenses.push(...expenses);
                    } catch { }
                }

                // 중복 제거
                allExpenses = Array.from(
                    new Map(allExpenses.map((i) => [i.id, i])).values()
                );

                // 🔥 영어 key 기준으로 필터링 (완벽 매칭)
                const filtered = allExpenses.filter((item) => {
                    const cat = item.category as CategoryType;
                    return cat === categoryKey;
                });

                setTotalCount(filtered.length);

                // 날짜별 묶기
                const dailyMap: Record<string, any[]> = {};

                filtered.forEach((item) => {
                    const dateKey = item.dateTime.split("T")[0];

                    if (!dailyMap[dateKey]) dailyMap[dateKey] = [];

                    dailyMap[dateKey].push({
                        name: item.itemName,
                        category: label, // 한글 표시
                        amount: -item.price,
                    });
                });

                const grouped = Object.entries(dailyMap)
                    .sort(([a], [b]) => (a < b ? 1 : -1))
                    .map(([date, list]) => ({ date, list }));

                setDailyHistory(grouped);
            } catch (err) {
                console.error("카테고리 상세 내역 불러오기 실패", err);
            }
        };

        fetchCategoryTransactions();
    }, [year, month, label]);

    const getDetailMascotImage = (status: string | undefined) => {
        if (status === "DAY") return IMAGES.MASCOT.HALF.DAY;
        if (status === "TO") return IMAGES.MASCOT.HALF.TO;
        return IMAGES.MASCOT.HALF.NOT; // 기본값
    };
    const MASCOT_COLOR_MAP: Record<string, string> = {
        DAY: "text-primary-green",   // 초록
        TO: "text-yellow-500",       // 노랑
        NOT: "text-primary-red"      // 빨강
    };
    const currentColor = MASCOT_COLOR_MAP[mascotStatus] || "text-primary-green";

    // ==================================================
    // UI 
    // ==================================================
    return (
        <div className="p-4 flex flex-col gap-4 bg-app-bg pb-6">

            {/* Header */}
            <div className="relative flex items-center py-2 mb-2">
                <button className="text-2xl absolute left-0" onClick={() => navigate("/report", { state: { year, month } })}>
                    &lt;
                </button>
                <p className="text-lg font-semibold absolute left-1/2 -translate-x-1/2">
                    세부내역
                </p>
            </div>

            <p className="text-text-gray text-sm">{label}</p>

            <p className="text-primary-red text-3xl font-bold">
                -{formatCurrency(amount)}원
            </p>

            {/* 소비 분석 */}
            <Card className="p-5 flex justify-between items-start relative">
                <div className="pr-28">
                    <p className="text-text-gray text-sm">
                        <span className={`${currentColor} font-semibold`}>{mascotStatus}</span>의{" "}
                        <span className={`${currentColor} font-semibold`}>{label}</span>{" "}
                        소비 분석
                    </p>

                    <p className="text-text-primary text-sm leading-[1.4] mt-2">
                        {evaluation || "해당 카테고리의 소비 분석을 불러오는 중이에요"}
                        {advice && (
                            <span className="block text-text-gray mt-1">{advice}</span>
                        )}
                    </p>
                </div>

                <img
                    src={getDetailMascotImage(mascotStatus)}
                    className="absolute right-0 w-[125px] h-[125px] object-contain translate-y-[0px]"
                    alt="frog mascot"
                />
            </Card>

            {/* 비율 */}
            <div className="grid grid-cols-2 gap-3">
                <Card className="flex flex-col items-center justify-center py-5">
                    <p className="text-text-gray text-xs mb-2">
                        전체 소비 중 {label} 비율
                    </p>
                    <ProgressCircle current={percent} goal={100} mode="percent" />
                </Card>

                <Card className="flex flex-col items-center justify-center py-5">
                    <p className="text-text-gray text-xs">이번달 전체 소비 개수</p>
                    <p className={`text-2xl font-bold mt-1 ${currentColor}`}>
                        총 {totalCount}개
                    </p>
                    <p className="text-text-gray text-sm mt-1">{percent}%</p>
                </Card>
            </div>

            {/* 날짜별 내역 */}
            {dailyHistory.map((day, idx) => (
                <Card key={idx} className="p-4 flex flex-col gap-3">
                    <p className="text-text-gray text-sm font-semibold">
                        {new Date(day.date).getMonth() + 1}월{" "}
                        {new Date(day.date).getDate()}일
                    </p>

                    {day.list.map((item, i) => (
                        <div key={i} className="flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="font-medium">{item.name}</span>
                                <span className="text-xs text-text-gray">{item.category}</span>
                            </div>

                            <span className="text-primary-red font-semibold">
                                {formatCurrency(item.amount)}원
                            </span>
                        </div>
                    ))}
                </Card>
            ))}
        </div>
    );
};

export default CategoryDetailPage;
