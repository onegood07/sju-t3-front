import React from "react";
import Card from "../components/common/Card";
import { LABELS, APP_INFO, IMAGES, ICONS, SYMBOLS } from "../constants/";
import {
  Button,
  ProgressBar,
  ProgressCircle,
  Status,
  SpendingCalendar,
  SpendingItem,
} from "../components/";

const HomePage = () => {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("ko-KR").format(Math.abs(amount));
  };

  return (
    <div className="p-4 bg-app-bg">
      <div className="flex justify-between items-start">
        <p className="font-bold text-xl pb-4">{APP_INFO.NAME}</p>
        <Button
          variant="noneBgApp"
          icon={<ICONS.SETTING />}
          className="w-[2rem] h-[2rem] text-3xl font-medium text-icon-gray mb-1"
        />
      </div>

      <Card className="flex flex-col p-5 bg-white-default mb-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-m text-text-gray font-semibold text-sm pb-1">
              데이의 한마디
            </p>
            <p className="text-text-primary text-xl font-medium pb-8">
              다경아, 잘하고 있어!
            </p>
            <p className="text-text-primary text-m">
              점심 먹고 커피를 자주 먹네요! 커피를 조금 더 줄여봐야합니다.
            </p>
          </div>
          <img
            src={IMAGES.MASCOT.SINGLE.DAY}
            className="w-[10rem] h-[10rem] mx-auto my-4"
          />
        </div>
        <Button>{LABELS.BUTTON.CHATTING}</Button>
      </Card>

      <div className="flex items-start justify-between gap-4 mb-2">
        <Card className="p-4 w-full">
          <div className="w-full">
            <div className="flex items-start justify-between gap-4 mb-2">
              <p className="text-text-gray font-semibold text-sm">
                {LABELS.GENERAL.PLANNED_SPENDING_COUNT}
              </p>
              <p className="text-text-gray text-sm font-medium">총 30개</p>
            </div>
            <div className="flex items-center justify-between">
              <img
                src={IMAGES.MASCOT.SINGLE.NOT}
                className="w-[3rem] h-[3rem] mr-4 my-4"
              />
              <ProgressBar label="즉흥" value={20} total={40} variant="red" />
            </div>

            <div className="flex items-center justify-between">
              <img
                src={IMAGES.MASCOT.SINGLE.DAY}
                className="w-[3rem] h-[3rem] mr-4 my-4"
              />
              <ProgressBar label="계획" value={10} total={40} variant="green" />
            </div>
          </div>
        </Card>

        <Card className="h-[12.8rem] bg-white-default w-[8rem] flex items-center justify-center">
          <img
            src={IMAGES.MASCOT.ACTIVE.DAY}
            className="w-[22rem] h-[7rem] mx-auto my-4"
          />
        </Card>
      </div>

      <Card className="p-6 bg-white-default mb-2">
        <div className="items-start">
          <div className="flex items-start">
            <div className="flex flex-col w-[12rem]">
              <Status className="w-[4rem] rounded-lg">D-10</Status>
              <p className="text-text-gray font-medium text-sm mt-2">
                {LABELS.GENERAL.CURRENT_MONTH_GOAL}
              </p>
              <p className="text-text-primary text-lg mt-1">
                커피 10잔만 마시기
              </p>
            </div>
            <ProgressCircle current={8} goal={10} mode="fraction" />
          </div>

          <div className="w-full h-[0.1rem] bg-border-line my-2"></div>

          <div className="flex items-center mt-4 gap-4">
            <p className="text-text-gray text-sm font-medium">
              {LABELS.GENERAL.CURRENT_MONTH_GOAL_SPENDING}
            </p>
            <p className="text-text-gray text-[1rem] font-medium">500,000원</p>
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
              {SYMBOLS.PLUS}400,000원
            </p>
          </div>

          <div className="w-px h-[4rem] bg-border-line"></div>

          <div className="flex flex-col items-center justify-center w-[8rem]">
            <p className="text-text-gray text-sm font-medium mb-2">
              {LABELS.GENERAL.CURRENT_MONTH_SPENDING}
            </p>
            <p className="text-text-green font-medium">
              {SYMBOLS.MINUS}500,000원
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-5 bg-white-default mb-2">
        <SpendingCalendar />
      </Card>

      <Card className="p-5 bg-white-default mb-2">
        <div>
          <div className="flex items-start justify-between mb-2">
            <p className="text-text-gray font-medium text-sm mb-4">11월 27일</p>
            <Button
              variant="noneBgWhite"
              icon={<ICONS.PLUS />}
              className="w-[2.9rem] h-[0rem] text-sm font-medium text-icon-gray"
            >
              {LABELS.BUTTON.PLUS}
            </Button>
          </div>

          <div className="flex-col">
            <SpendingItem
              type="Spending"
              name="블루버튼 보드게임"
              statusVariant="outLine"
              category="놀거리"
              price={formatCurrency(344400)}
            />
            <SpendingItem
              type="Spending"
              name="블루버튼 보드게임"
              statusVariant="outLine"
              category="식비"
              price={formatCurrency(101330)}
            />
            <SpendingItem
              type="Spending"
              name="우리에게 오늘도 많은 것을으릉르을으르으릉르ㅡ"
              statusVariant="grayBg"
              category="공과금"
              price={formatCurrency(40)}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HomePage;
