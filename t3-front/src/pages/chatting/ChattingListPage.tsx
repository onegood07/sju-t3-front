import React from "react";
import { LABELS, APP_INFO, IMAGES, ICONS, SYMBOLS } from "../../constants/";
import { Button, ChattingItemButton } from "../../components";

const ChattingListPage = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center w-full">
        <p className="text-base text-text-gray ml-[11rem] mb-[2rem]">
          {LABELS.PAGE.CHATTING_LIST}
        </p>

        <div className="flex gap-2">
          <Button
            variant="noneBgWhite"
            icon={<ICONS.PLUS />}
            className="w-[1.3rem] h-[1.3rem] text-3xl font-medium text-icon-gray mb-1"
          />
          <Button
            variant="noneBgWhite"
            icon={<ICONS.SETTING />}
            className="w-[1.3rem] h-[1.3rem] text-3xl font-medium text-icon-gray mb-1"
          />
        </div>
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
    </div>
  );
};

export default ChattingListPage;
