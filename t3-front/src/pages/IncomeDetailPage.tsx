import { useNavigate, useLocation } from "react-router-dom";
import Card from "../components/common/Card";
import CategoryDonutChart from "../components/charts/CategoryDonutChart";
import { formatCurrency } from "../utils/";
import { getTransaction, getMonthlyAmount } from "../api";
import { useState, useEffect, useRef } from "react";
import { IncomeCategoryLabel } from "../types";
import type { IncomeCategoryType } from "../types";
import SpendingItem from "../components/spending/SpendingItem";

const safeIncomeCategory = (cat: string): IncomeCategoryType => {
    if (cat in IncomeCategoryLabel) {
        return cat as IncomeCategoryType;
    }
    return "ETC";
};

const IncomeCategoryColor: Record<keyof typeof IncomeCategoryLabel, string> = {
    SALARY: "#FFA559",      // 급여
    ALLOWANCE: "#FFE16C",   // 용돈
    REFUND: "#8FD694",      // 환급
    INTEREST: "#6DD3FF",    // 이자
    ETC: "#B0BEC5",         // 기타
    SIDE: "#A991F7",        // 부수입
};

type DailyHistoryItem = {
    date: string;
    list: {
        name: string;
        category: string;
        amount: number;
    }[];
};

type IncomeCategoryItem = {
    label: string;
    amount: number;
    percent: number;
    color: string;
};

const IncomeDetailPage = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    const year = state?.year || new Date().getFullYear();
    const month = state?.month || new Date().getMonth() + 1;

    const [totalIncomeAmount, setTotalIncomeAmount] = useState(0);

    //  날짜별 수입 내역
    const [dailyIncomeHistory, setDailyIncomeHistory] =
        useState<DailyHistoryItem[]>([]);

    //  카테고리 통계
    const [incomeStats, setIncomeStats] = useState<{
        values: number[];
        colors: string[];
        list: IncomeCategoryItem[];
    }>({
        values: [],
        colors: ["#FFA559", "#FFE16C", "#8FD694", "#6DD3FF"],
        list: []
    });

    const didFetchRef = useRef(false);

    // ============================================================
    //  수입 전체 데이터 로딩
    // ============================================================
    const fetchAllIncomeData = async () => {
        try {
            // 1) 총 수입 불러오기
            const amountRes = await getMonthlyAmount(year, month);
            setTotalIncomeAmount(amountRes.totalIncomeAmount);

            // 2) 날짜별 수입 전체 불러오기
            const daysInMonth = new Date(year, month, 0).getDate();
            let incomes: any[] = [];

            for (let day = 1; day <= daysInMonth; day++) {
                const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(
                    day
                ).padStart(2, "0")}`;

                try {
                    const res = await getTransaction(dateStr);
                    incomes.push(...res.filter((t: any) => t.incomeType === "INCOME"));
                } catch { }
            }

            // 3) ID 기준 중복 제거
            incomes = Array.from(new Map(incomes.map((i) => [i.id, i])).values());

            // ============================================================
            //  카테고리 합산
            // ============================================================
            const categoryMap: Record<IncomeCategoryType, number> = {
                SALARY: 0,
                ALLOWANCE: 0,
                REFUND: 0,
                INTEREST: 0,
                SIDE: 0,
                ETC: 0
            };

            incomes.forEach((item) => {
                const cat = safeIncomeCategory(item.category);
                categoryMap[cat] = (categoryMap[cat] || 0) + item.price;
            });

            const categories = Object.entries(categoryMap).map(([cat, amount]) => ({
                label: IncomeCategoryLabel[cat as IncomeCategoryType],
                amount
            }));

            const total = categories.reduce((s, c) => s + c.amount, 0) || 1;

            const list = categories.map((item) => {
                const catKey =
                    (Object.keys(IncomeCategoryLabel) as (keyof typeof IncomeCategoryLabel)[])
                        .find((k) => IncomeCategoryLabel[k] === item.label) || "ETC";

                return {
                    ...item,
                    percent: Math.round((item.amount / total) * 100),
                    color: IncomeCategoryColor[catKey],
                };
            });

            //  도넛 차트 색상도 고정색 배열로 생성
            const donutColors = categories.map((item) => {
                const catKey =
                    (Object.keys(IncomeCategoryLabel) as (keyof typeof IncomeCategoryLabel)[])
                        .find((k) => IncomeCategoryLabel[k] === item.label) || "ETC";

                return IncomeCategoryColor[catKey];
            });

            // 상태 업데이트: values + colors + list
            setIncomeStats({
                values: categories.map((c) => c.amount),
                colors: donutColors,
                list
            });

            // ============================================================
            //  날짜별 그룹핑
            // ============================================================
            const dailyMap: Record<string, any[]> = {};

            incomes.forEach((item) => {
                const dateKey = item.dateTime.split("T")[0];
                const safeCat = safeIncomeCategory(item.category);

                if (!dailyMap[dateKey]) dailyMap[dateKey] = [];

                dailyMap[dateKey].push({
                    name: item.itemName,
                    category: IncomeCategoryLabel[safeCat],
                    amount: item.price
                });
            });

            const dailyList = Object.entries(dailyMap)
                .sort(([a], [b]) => (a < b ? 1 : -1))
                .map(([date, list]) => ({ date, list }));

            setDailyIncomeHistory(dailyList);
        } catch (err) {
            console.error("수입 데이터 로딩 실패:", err);
        }
    };

    // ============================================================
    // useEffect — StrictMode 중복 방지 
    // ============================================================
    useEffect(() => {
        if (didFetchRef.current) return;
        didFetchRef.current = true;

        fetchAllIncomeData();
    }, [year, month]);

    return (
        <div className="p-4 flex flex-col gap-4 bg-app-bg">
            {/* Header */}
            <div className="flex items-center justify-between">
                <button className="text-2xl"
                    onClick={() => navigate("/report", { state: { year, month } })}
                >
                    &lt;
                </button>
                <p className="text-lg font-semibold">
                    {year}년 {month}월 수입
                </p>
                <div className="w-5"></div>
            </div>

            {/* 총 수입 */}
            <p className="text-text-green text-2xl font-bold">
                +{formatCurrency(totalIncomeAmount)}원
            </p>

            {/* 도넛 차트 + 리스트 */}
            <Card className="p-6 flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <p className="text-text-gray text-sm">이번달 분야별 수입 통계</p>
                    <p className="text-text-gray text-sm">
                        총 {formatCurrency(totalIncomeAmount)}원
                    </p>
                </div>

                <div className="flex justify-center">
                    <CategoryDonutChart
                        data={incomeStats.values}
                        colors={incomeStats.colors}
                        centerText={formatCurrency(totalIncomeAmount)}
                    />
                </div>

                <div className="flex flex-col gap-3 mt-4">
                    {incomeStats.list.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex justify-between items-center text-sm"
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

                            <span className="text-black">
                                +{formatCurrency(item.amount)}원
                            </span>
                        </div>
                    ))}
                </div>
            </Card>

            {/* 날짜별 내역 */}
            {dailyIncomeHistory.map((day, idx) => (
                <Card key={idx} className="p-4 flex flex-col gap-3">
                    <p className="text-text-gray text-sm font-semibold">
                        {new Date(day.date).getMonth() + 1}월{" "}
                        {new Date(day.date).getDate()}일
                    </p>

                    {day.list.map((item, i) => (
                        <SpendingItem
                            key={i}
                            type="INCOME"                  // 수입
                            name={item.name}
                            category={item.category}
                            price={formatCurrency(item.amount)}
                        />
                    ))}
                </Card>
            ))}
        </div>
    );
};

export default IncomeDetailPage;
