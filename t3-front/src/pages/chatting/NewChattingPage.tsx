import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { postChatRoom } from "../../api";
import { Button, Input } from "../../components";
import type { CharacterType } from "../../types";
import { ICONS } from "../../constants/";

const NewChattingPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const title = params.get("title")!;
  const character = params.get("character") as CharacterType;

  const handleCreateRoom = async () => {
    if (!message.trim()) return;

    setIsLoading(true);

    try {
      const roomData = await postChatRoom({
        title,
        character,
        message,
      });

      navigate(`/chatting/${roomData.roomId}`);
    } catch (err) {
      console.error("채팅방 생성 실패:", err);
      alert("채팅방 생성 실패");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex justify-between items-center mb-4 flex-shrink-0">
        <Button
          variant="noneBgApp"
          icon={<ICONS.ARROWBACK />}
          className="w-[1.2rem] h-[1.2rem] text-xl text-icon-gray"
          onClick={() => navigate(-1)}
        />

        <p className="text-text-gray text-base font-medium">{title}</p>

        <div className="w-[1.2rem] h-[1.2rem]" />
      </div>

      <div className="flex-1 flex items-center justify-center">
        <p className="text-text-gray text-sm px-1">
          대화를 시작하기 위해 첫 메시지를 입력해주세요.
        </p>
      </div>

      <div className="mt-auto flex items-center flex-shrink-0">
        <Input
          placeholder="첫 메시지를 입력하세요"
          inputType="chatting"
          value={message}
          onChange={setMessage}
          className="flex-1 mr-2"
        />

        <Button
          variant="primary"
          icon={<ICONS.SEND />}
          className="w-12 h-12 p-1 ml-2 !rounded-full"
          onClick={handleCreateRoom}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default NewChattingPage;
