import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components";
import { LABELS, ICONS, IMAGES } from "../../constants";
import { patchCharacter } from "../../api";
import type { CharacterType } from "../../types";

const mascots: { name: CharacterType; koreanName: string }[] = [
  { name: "not", koreanName: "낫" },
  { name: "to", koreanName: "투" },
  { name: "day", koreanName: "데이" },
];

const UpdateCharacterPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const [selectedMascot, setSelectedMascot] = useState<CharacterType>("not");

  const handleSave = async () => {
    if (!roomId) return;
    try {
      await patchCharacter(Number(roomId), {
        character: selectedMascot,
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
      <div className="relative flex items-center mb-4">
        <Button
          variant="noneBgApp"
          icon={<ICONS.ARROWBACK />}
          className="w-[1.2rem] h-[1.2rem] text-xl text-icon-gray"
          onClick={() => navigate(-1)}
        />

        <p className="absolute left-1/2 -translate-x-1/2 text-text-gray text-base font-medium">
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

export default UpdateCharacterPage;
