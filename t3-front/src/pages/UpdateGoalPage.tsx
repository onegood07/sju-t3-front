import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LABELS, ICONS } from "../constants";
import { Button, Input } from "../components";
import { useDateStore, useGoalStore, useAuthStore } from "../store";
import { updateGoal } from "../api";
import type { GoalUpdateRequest } from "../types";

const UpdateGoalPage = () => {
  const navigate = useNavigate();
  const userId = useAuthStore((state) => state.userId);
  const selectedYear = useDateStore((state) => state.selectedYear);
  const selectedMonth = useDateStore((state) => state.selectedMonth);
  const { goal, setGoal } = useGoalStore();

  const [goalText, setGoalText] = useState(goal?.goal || "");
  const [targetCount, setTargetCount] = useState(goal?.targetCount || 0);

  if (userId === undefined) return <p>로딩중...</p>;

  if (!userId) {
    alert("로그인이 필요합니다");
    navigate("/login");
    return null;
  }

  const handleSave = async () => {
    if (!goalText || !targetCount) {
      alert("목표와 목표 수를 입력해주세요.");
      return;
    }

    const body: GoalUpdateRequest = {
      goal: goalText,
      targetCount: targetCount,
    };

    try {
      const res = await updateGoal(selectedYear, selectedMonth, body);

      console.log("목표 업데이트 성공:", res);

      setGoal({
        goal: goalText,
        targetCount,
        currentCount: goal?.currentCount || 0,
      });

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
            {LABELS.PAGE.GOAL_UPDATE}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-5 mt-8">
        <Input
          inputType="input"
          label={LABELS.GENERAL.CURRENT_MONTH_GOAL}
          placeholder="목표 입력"
          value={goalText}
          onChange={(value) => setGoalText(value)}
        />
        <Input
          inputType="input"
          label={LABELS.GENERAL.TARGET_COUNT}
          placeholder="목표 횟수"
          value={targetCount.toString()}
          onChange={(value) => setTargetCount(Number(value))}
        />
      </div>

      <Button
        variant="primary"
        className="mt-[3rem] w-full h-12"
        onClick={handleSave}
      >
        {LABELS.BUTTON.SAVE}
      </Button>
    </div>
  );
};

export default UpdateGoalPage;
