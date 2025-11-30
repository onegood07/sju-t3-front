import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LABELS, ICONS } from "../constants";
import { Button, Input } from "../components";
import { useDateStore, useMonthlyAmountStore } from "../store";
import { updateMonthlyGoalAmount, getMonthlyAmount } from "../api";
import type { MonthlyGoalAmountRequest } from "../types";

const UpdateTargetAmountPage = () => {
  const navigate = useNavigate();

  const selectedYear = useDateStore((state) => state.selectedYear);
  const selectedMonth = useDateStore((state) => state.selectedMonth);

  const { totalGoalAmount, setMonthlyAmount } = useMonthlyAmountStore();
  const [amount, setAmount] = useState<number | "">(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonthlyAmount = async () => {
      try {
        const data = await getMonthlyAmount(selectedYear, selectedMonth);
        setMonthlyAmount(data);
        setLoading(false);
      } catch (err) {
        console.error("월간 금액 불러오기 실패:", err);
        setLoading(false);
      }
    };
    fetchMonthlyAmount();
  }, [selectedYear, selectedMonth, setMonthlyAmount]);

  const handleSave = async () => {
    if (!amount) {
      alert("목표 소비 금액을 입력해주세요.");
      return;
    }

    const body: MonthlyGoalAmountRequest = { amount };

    try {
      const res = await updateMonthlyGoalAmount(
        selectedYear,
        selectedMonth,
        body
      );
      console.log("목표 업데이트 성공:", res);

      setMonthlyAmount({ totalGoalAmount: amount });

      navigate("/home");
    } catch (err) {
      console.error("목표 업데이트 실패:", err);
      alert("목표 업데이트 실패");
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-start mb-2">
        <div className="relative flex justify-between items-start">
          <Button
            variant="noneBgWhite"
            icon={<ICONS.ARROWBACK />}
            className="w-[1rem] h-[1rem] text-xl font-medium text-icon-gray mb-1"
            onClick={() => navigate(-1)}
          />
          <p className="text-text-gray text-base font-medium ml-[9rem]">
            {LABELS.PAGE.TARGET_SPENDING_AMOUNT}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-5 mt-8">
        <Input
          inputType="input"
          label={LABELS.GENERAL.CURRENT_MONTH_GOAL}
          placeholder={loading ? "불러오는 중..." : `${totalGoalAmount}원`}
          value={amount}
          onChange={(value: string) => setAmount(Number(value))}
        />
      </div>

      <Button
        variant="primary"
        className="mt-8 w-full h-12"
        onClick={handleSave}
      >
        {LABELS.BUTTON.SAVE}
      </Button>
    </div>
  );
};

export default UpdateTargetAmountPage;
