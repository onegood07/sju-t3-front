import React from "react";
import { LABELS, APP_INFO, IMAGES, ICONS, SYMBOLS } from "../../constants/";
import { Button, ChattingItemButton } from "../../components";

const ChattingListPage = () => {
  return (
    <div className="p-4">
      <div className="flex items-start gap-3 mb-2">
        <p className="text-base text-text-gray ml-[11rem] mb-[2rem]">
          {LABELS.PAGE.CHATTINGLIST}
        </p>
        <Button
          variant="noneBgWhite"
          icon={<ICONS.SEARCH />}
          className="w-[1.4rem] h-[1.4rem] text-3xl font-medium text-icon-gray ml-[4rem] mb-1"
        />
        <Button
          variant="noneBgWhite"
          icon={<ICONS.SETTING />}
          className="w-[1.7rem] h-[1.7rem] text-3xl font-medium text-icon-gray mb-1"
        />
      </div>

      <ChattingItemButton
        name="야식 그만 먹자"
        text="또 치킨을 먹겠다고요? 그 치킨집..."
        date="2025.09.10"
        status="TO"
      />
      <ChattingItemButton
        name="요거트 킬러"
        text="그정도면 피가 요거트로 되어있을 것 같은데... "
        date="2025.09.07"
      />

      <Button
        variant="primary"
        icon={<ICONS.PLUS />}
        className="fixed bottom-20 right-6 w-[2.7rem] h-[2.7rem] text-xl font-medium text-icon-gray rounded-full"
      />
    </div>
  );
};

export default ChattingListPage;
