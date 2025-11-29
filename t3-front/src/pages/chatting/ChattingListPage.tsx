import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getChatRooms, getRoomChatList } from "../../api";
import { useChatStore } from "../../store";
import { ChattingItemButton, Button } from "../../components";
import { ICONS, LABELS } from "../../constants";
import type { CharacterType } from "../../types";

const ChattingListPage = () => {
  const navigate = useNavigate();
  const { rooms, setRooms, createRoom } = useChatStore();

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
    <div className="p-4">
      <div className="relative flex items-center w-full h-10 mb-4">
        {/* 왼쪽 빈 영역 */}
        <div className="flex-1"></div>

        {/* 가운데 글씨 */}
        <p className="absolute left-0 right-0 text-center text-base text-text-gray font-medium">
          {LABELS.PAGE.CHATTING_LIST}
        </p>

        {/* 오른쪽 버튼 */}
        <div className="flex gap-2 ml-auto">
          <Button
            variant="noneBgWhite"
            icon={<ICONS.PLUS />}
            className="w-[1.3rem] h-[1.3rem] text-3xl font-medium text-text-green"
            onClick={async () => {
              await createRoom({
                message: "안녕!",
                title: "새 채팅방",
                character: "not",
              });
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
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
