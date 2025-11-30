import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getChatRooms } from "../../api";
import { useChatStore } from "../../store";
import { ChattingItemButton, Button } from "../../components";
import { ICONS, LABELS } from "../../constants";
import type { CharacterType } from "../../types";

const ChattingListPage = () => {
  const navigate = useNavigate();
  const { rooms, setRooms } = useChatStore();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getChatRooms();
        setRooms(data);
      } catch (err) {
        console.error("채팅방 불러오기 실패:", err);
      }
    };

    fetchRooms();
  }, [setRooms]);

  const mapCharacter = (c: CharacterType): "NOT" | "TO" | "DAY" => {
    switch (c) {
      case "not":
        return "NOT";
      case "to":
        return "TO";
      case "day":
        return "DAY";
    }
  };

  return (
    <div className="p-4 pb-24 relative">
      <div className="relative flex items-center justify-end w-full h-10 mb-4">
        <p className="absolute left-0 right-0 text-center text-base text-text-gray font-medium">
          {LABELS.PAGE.CHATTING_LIST}
        </p>

        <Button
          variant="noneBgWhite"
          icon={<ICONS.CHAT_PLUS />}
          className="w-8 h-8 text-2xl text-icon-gray relative z-10"
          onClick={() => navigate("/chatting/new")}
        />
      </div>

      <div className="relative flex flex-col gap-2">
        {rooms.map((room) => (
          <ChattingItemButton
            key={room.roomId}
            name={room.title}
            text={room.lastMessagePreview}
            date=""
            status={mapCharacter(room.character)}
            onClick={() => navigate(`/chatting/${room.roomId}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChattingListPage;
