import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../../components";
import { LABELS, ICONS, MASCOT_DATA } from "../../constants";
import type { MascotName } from "../../types/mascot";
import type { CharacterType } from "../../types";

const mascotMap: Record<MascotName, CharacterType> = {
  MascotNot: "not",
  MascotTo: "to",
  MascotDay: "day",
};

const reverseMascotMap: Record<CharacterType, MascotName> = {
  not: "MascotNot",
  to: "MascotTo",
  day: "MascotDay",
};

const CreateNewChattingPage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [character, setCharacter] = useState<CharacterType>("not");

  const handleNext = () => {
    if (!title.trim()) return alert("채팅방 이름을 입력해주세요!");

    navigate(
      `/chatting/new/message?title=${encodeURIComponent(
        title
      )}&character=${character}`
    );
  };

  return (
    <div className="p-4">
      {/* 헤더 */}
      <div className="flex items-start mb-8">
        <div className="relative flex justify-between items-start w-full">
          <Button
            variant="noneBgWhite"
            icon={<ICONS.ARROWBACK />}
            className="w-[1rem] h-[1rem] text-xl font-medium text-icon-gray mb-1"
            onClick={() => navigate(-1)}
          />
          <p className="text-text-gray text-base font-medium absolute left-1/2 -translate-x-1/2">
            {LABELS.PAGE.NEW_CHAT}
          </p>
        </div>
      </div>

      {/* 채팅방 이름 입력 */}
      <Input
        inputType="input"
        label={LABELS.INPUT.NEW_CHAT}
        placeholder="채팅방 이름"
        value={title}
        onChange={setTitle}
      />

      {/* 캐릭터 선택 */}
      <div className="mt-8">
        <label className="block text-sm font-medium text-text-primary mt-4">
          {LABELS.INPUT.SELECT_CHARACTER}
        </label>

        <div className="grid grid-cols-3 gap-3 mt-4">
          {(Object.keys(MASCOT_DATA) as MascotName[]).map((mascotKey) => {
            const mascot = MASCOT_DATA[mascotKey];

            return (
              <Button
                key={mascotKey}
                className="flex flex-col items-center p-3 h-auto mt-2"
                variant={
                  reverseMascotMap[character] === mascotKey
                    ? "outLine"
                    : "grayBg"
                }
                onClick={() => setCharacter(mascotMap[mascotKey])}
              >
                <img
                  src={mascot.image}
                  alt={mascot.koreanName}
                  className="w-12 h-12 object-contain mb-1"
                />
                <p className="text-sm font-medium text-text-primary">
                  {mascot.koreanName}
                </p>
              </Button>
            );
          })}
        </div>

        <Button
          className="mt-10 w-full h-12"
          variant="primary"
          onClick={handleNext}
        >
          {LABELS.BUTTON.NEXT}
        </Button>
      </div>
    </div>
  );
};

export default CreateNewChattingPage;
