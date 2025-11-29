import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LABELS, ICONS } from "../constants";
import { Button, Input } from "../components";
import { ExpenseCategory, IncomeCategory } from "../types";
import type {
  CategoryType,
  IncomeOrExpense,
  TransactionRequest,
} from "../types";
import { updateTransaction } from "../api";
import { useAuthStore } from "../store";

const AddPage = () => {
  const navigate = useNavigate();
  const userId = useAuthStore((state) => state.userId);

  if (userId === undefined) {
    return <p>로딩중...</p>;
  }

  if (!userId) {
    alert("로그인이 필요합니다");
    navigate("/login");
    return null;
  }

  const [incomeOrExpense, setIncomeOrExpense] =
    useState<IncomeOrExpense>("EXPENSE");
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | "">(
    ""
  );
  const [date, setDate] = useState("");
  const [price, setPrice] = useState<string>("");
  const [itemName, setItemName] = useState("");
  const [memo, setMemo] = useState("");
  const [planType, setPlanType] = useState<"IMPULSE" | "PLANNED">("PLANNED");

  const categoryOptions =
    incomeOrExpense === "INCOME"
      ? Object.values(IncomeCategory)
      : Object.values(ExpenseCategory);

  const handleSave = async () => {
    console.log("디버그: handleSave 호출, userId =", userId);

    if (!userId) {
      alert("로그인이 필요합니다");
      navigate("/login");
      return;
    }

    const missingFields: string[] = [];

    if (!date) missingFields.push("날짜");
    if (!price) missingFields.push("금액");
    if (!selectedCategory) missingFields.push("카테고리");
    if (!itemName) missingFields.push("항목 이름");

    if (missingFields.length > 0) {
      alert(`${missingFields.join(", ")}을(를) 입력해주세요.`);
      return;
    }

    const isoDate = new Date(date).toISOString();

    const body: TransactionRequest = {
      dateTime: isoDate,
      incomeOrExpense,
      category: selectedCategory as CategoryType,
      itemName: itemName,
      price: Number(price),
      planType,
      memo,
    };

    try {
      const res = await updateTransaction(body);

      console.log("저장 완료:", res);

      setDate("");
      setPrice("");
      setSelectedCategory("");
      setItemName("");
      setMemo("");
      setPlanType("PLANNED");
      setIncomeOrExpense("EXPENSE");
    } catch (err) {
      console.error("저장 실패:", err);
      alert("저장 실패");
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-start mb-6">
        <div className="relative flex justify-between items-start">
          <Button
            variant="noneBgWhite"
            icon={<ICONS.ARROWBACK />}
            className="w-[1rem] h-[1rem] text-xl font-medium text-icon-gray mb-1"
            onClick={() => navigate(-1)}
          />
          <p className="text-text-gray text-base font-medium ml-[9rem]">
            {LABELS.PAGE.ADD_SPENDING}
          </p>
        </div>
      </div>
      {/* 수입 / 지출 선택 */}
      <div className="flex items-start justify-between mb-4 mt-4 gap-4">
        <Button
          variant={incomeOrExpense === "INCOME" ? "outLine" : "grayBg"}
          onClick={() => {
            setIncomeOrExpense("INCOME");
            setSelectedCategory("");
          }}
        >
          {LABELS.BUTTON.INCOME}
        </Button>
        <Button
          variant={incomeOrExpense === "EXPENSE" ? "outLine" : "grayBg"}
          onClick={() => {
            setIncomeOrExpense("EXPENSE");
            setSelectedCategory("");
          }}
        >
          {LABELS.BUTTON.SPENDING}
        </Button>
      </div>

      {/* 입력 폼 */}
      <div className="flex flex-col gap-5">
        <Input
          inputType="input"
          label={LABELS.INPUT.DATE}
          placeholder={LABELS.INPUT.PLACEHOLDER.DATE}
          value={date}
          onChange={(value: string) => setDate(value)}
        />
        <Input
          inputType="input"
          label={LABELS.INPUT.PRICE}
          placeholder={LABELS.INPUT.PLACEHOLDER.PRICE}
          value={price}
          onChange={(value: string) => setPrice(value)}
        />
        <div className="flex flex-col">
          <label className="text-sm font-medium text-text-gray mb-1">
            {LABELS.INPUT.CATEGORY}
          </label>
          <select
            className="border rounded p-2"
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(e.target.value as CategoryType)
            }
          >
            <option value="" disabled>
              {LABELS.INPUT.CHOICE}
            </option>
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <Input
          inputType="input"
          label={LABELS.INPUT.ITEM_NAME}
          placeholder={LABELS.INPUT.PLACEHOLDER.ITEM_NAME}
          value={itemName}
          onChange={(value: string) => setItemName(value)}
        />
        <Input
          inputType="input"
          label={LABELS.INPUT.MEMO}
          placeholder={LABELS.INPUT.PLACEHOLDER.MEMO}
          value={memo}
          onChange={(value: string) => setMemo(value)}
        />
      </div>

      <label className="block text-sm font-medium text-text-primary mb-2 mt-4">
        {LABELS.INPUT.IS_IMPULSIVE_SPENDING}
      </label>

      <div className="flex items-start justify-between gap-4 mb-2">
        <Button
          variant={planType === "PLANNED" ? "outLine" : "grayBg"}
          onClick={() => setPlanType("PLANNED")}
        >
          {LABELS.BUTTON.PLANNED_SPENDING}
        </Button>
        <Button
          variant={planType === "IMPULSE" ? "outLine" : "grayBg"}
          onClick={() => setPlanType("IMPULSE")}
        >
          {LABELS.BUTTON.IMPULSIVE_SPENDING}
        </Button>
      </div>

      <Button variant="primary" className="mt-10" onClick={handleSave}>
        {LABELS.BUTTON.SAVE}
      </Button>
    </div>
  );
};

export default AddPage;
