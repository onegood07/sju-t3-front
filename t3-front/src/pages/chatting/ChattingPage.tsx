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

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [currentRoom, isSending]);

  const groupMessagesByDate = () => {
    if (!currentRoom?.messages) return {};
    let messages = [...currentRoom.messages];

    if (isSending) {
      messages.push({
        id: -1,
        role: "ASSISTANT",
        content: "답변 작성 중...",
        createdAt: "",
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

  const handleSendMessage = async () => {
    if (!chattingText.trim() || !roomId) return;

    const tempMessage = {
      id: Date.now(),
      role: "USER",
      content: chattingText,
      createdAt: "",
    };
    setCurrentRoom({
      ...currentRoom!,
      messages: [...currentRoom!.messages, tempMessage],
    });
    setChattingText("");
    setIsSending(true);

    try {
      const updatedRoom = await postChatting(Number(roomId), {
        message: chattingText,
      });

      setCurrentRoom(updatedRoom);
    } catch (err) {
      console.error("메시지 전송 실패:", err);
    } finally {
      setIsSending(false);
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
          onClick={() => navigate("/chatting-list")}
        />
        <p className="text-text-gray text-base font-medium">
          {currentRoom?.roomTitle || "채팅방"}
        </p>
        <Button
          variant="noneBgApp"
          icon={<ICONS.SETTING />}
          className="w-[1.5rem] h-[1.5rem] text-xl text-icon-gray"
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
        className="flex-1 overflow-y-auto mb-3 p-2 rounded-lg"
      >
        {Object.entries(groupedMessages).map(([date, messages]) => (
          <div key={date} className="mb-4">
            {!isSending && (
              <div className="flex justify-center my-4 mb-6">
                <div className="flex items-center px-3 py-1 rounded-full bg-gray-100">
                  <ICONS.CALENDAR className="w-4 h-4 mr-2 text-text-gray" />
                  <p className="text-gray-500 text-sm font-medium">{date}</p>
                </div>
              </div>
            )}

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
          className={`w-12 h-12 p-1 ml-2 !rounded-full ${
            isSending ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleSendMessage}
          disabled={isSending}
        />
      </div>
    </div>
  );
};

export default ChattingPage;
