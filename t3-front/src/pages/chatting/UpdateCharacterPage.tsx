import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components";
import { LABELS, ICONS, IMAGES } from "../../constants";
import { patchCharacter } from "../../api";
import type { CharacterUpperType } from "../../types";

const mascots: { name: CharacterUpperType; koreanName: string }[] = [
  { name: "NOT", koreanName: "낫" },
  { name: "TO", koreanName: "투" },
  { name: "DAY", koreanName: "데이" },
];

const UpdateCharacterPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const [selectedMascot, setSelectedMascot] =
    useState<CharacterUpperType>("NOT");

  const handleSave = async () => {
    if (!roomId) return;
    try {
      await patchCharacter(Number(roomId), {
        additionalProp1: selectedMascot,
        additionalProp2: "",
        additionalProp3: "",
      });
      alert("캐릭터가 저장되었습니다.");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("저장에 실패했습니다.");
    }
  };

  return (
    <div className="p-4">
      {/* 상단 */}
      <div className="flex items-center mb-4">
        <Button
          variant="noneBgApp"
          icon={<ICONS.ARROWBACK />}
          className="w-[1.2rem] h-[1.2rem] text-xl text-icon-gray"
          onClick={() => navigate(-1)}
        />
        <p className="text-text-gray text-base font-medium ml-4">
          {LABELS.PAGE.CHARACTER}
        </p>
      </div>

      {/* 캐릭터 버튼 */}
      <div className="flex justify-around mt-8">
        {mascots.map((m) => (
          <button
            key={m.name}
            className={`flex flex-col items-center p-2 rounded-lg border w-24 h-32 bg-white-default
              ${
                selectedMascot === m.name
                  ? "border-text-green"
                  : "border-gray-300"
              }`}
            onClick={() => setSelectedMascot(m.name)}
          >
            <img
              src={
                IMAGES.MASCOT.SINGLE[
                  m.name.toUpperCase() as keyof typeof IMAGES.MASCOT.SINGLE
                ]
              }
              alt={m.koreanName}
              className="w-16 h-16 mb-2"
            />
            <span className="text-sm font-medium">{m.koreanName}</span>
          </button>
        ))}
      </div>

      {/* 저장 버튼 */}
      <Button variant="primary" className="mt-8 w-full" onClick={handleSave}>
        {LABELS.BUTTON.SAVE}
      </Button>
    </div>
  );
};

export default UpdateCharacterPage;
