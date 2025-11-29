import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useChatStore } from "../../store";
import { ChatMessageItem, Button, Input } from "../../components";
import { ICONS } from "../../constants";
import { getRoomChatList, postChatting } from "../../api";

const ChattingPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const { currentRoom, setCurrentRoom } = useChatStore();
  const [chattingText, setChattingText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 채팅방 데이터 불러오기
  useEffect(() => {
    const fetchRoom = async () => {
      if (!roomId) return;
      try {
        const data = await getRoomChatList(Number(roomId));
        setCurrentRoom(data);
      } catch (err) {
        console.error("채팅방 불러오기 실패:", err);
      }
    };
    fetchRoom();
  }, [roomId, setCurrentRoom]);

  // 메시지 추가될 때 자동 스크롤
  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [currentRoom, isSending]);

  // 그룹핑 함수 수정
  const groupMessagesByDate = () => {
    if (!currentRoom?.messages) return {};
    // 현재 메시지 복사
    let messages = [...currentRoom.messages];

    // 전송 중이면 마지막에 가상 메시지 추가
    if (isSending) {
      messages.push({
        id: -1,
        role: "ASSISTANT",
        content: "생각중...",
        createdAt: new Date().toISOString(),
      });
    }

    const groups: Record<string, typeof currentRoom.messages> = {};
    messages.forEach((msg) => {
      const dateKey = new Date(msg.createdAt).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(msg);
    });
    return groups;
  };

  const groupedMessages = groupMessagesByDate();

  // 메시지 전송
  const handleSendMessage = async () => {
    if (!chattingText.trim() || !roomId) return;

    setIsSending(true); // 전송 시작
    try {
      const updatedRoom = await postChatting(Number(roomId), {
        message: chattingText,
      });

      setCurrentRoom(updatedRoom);
      setChattingText("");
    } catch (err) {
      console.error("메시지 전송 실패:", err);
    } finally {
      setIsSending(false); // 전송 종료
    }
  };

  return (
    <div className="flex flex-col h-screen p-4">
      {/* 상단 */}
      <div className="flex justify-between items-center mb-4 flex-shrink-0">
        <Button
          variant="noneBgApp"
          icon={<ICONS.ARROWBACK />}
          className="w-[1.2rem] h-[1.2rem] text-xl text-icon-gray"
          onClick={() => navigate(-1)}
        />
        <p className="text-text-gray text-base font-medium">
          {currentRoom?.roomTitle || "채팅방"}
        </p>
        <Button
          variant="noneBgApp"
          icon={<ICONS.SETTING />}
          className="w-[1.2rem] h-[1.3rem] text-xl text-icon-gray"
          onClick={() => {
            if (roomId) {
              navigate(`/chatting/${roomId}/update-character`);
            }
          }}
        />
      </div>

      {/* 메시지 영역 */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto mb-3 p-2 rounded-lg shadow-sm"
      >
        {Object.entries(groupedMessages).map(([date, messages]) => (
          <div key={date} className="mb-4">
            <p className="text-center text-gray-400 text-sm my-2">{date}</p>
            {messages.map((msg) => (
              <ChatMessageItem
                key={msg.id}
                role={msg.role === "USER" ? "USER" : "ASSISTANT"}
                content={msg.content}
                time={msg.createdAt}
              />
            ))}
          </div>
        ))}
      </div>

      {/* 하단 입력 */}
      <div className="flex items-center flex-shrink-0">
        <Input
          inputType="chatting"
          placeholder="채팅을 입력하세요..."
          value={chattingText}
          onChange={(v) => setChattingText(v)}
          className="flex-1 mr-2"
        />
        <Button
          variant="primary"
          icon={<ICONS.SEND />}
          className="w-8 h-8 p-1 text-base ml-2"
          onClick={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default ChattingPage;
