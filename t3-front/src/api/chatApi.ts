import api from "./apiClient";
import type {
  ChatRoomListResponse,
  ChatMessageRequest,
  ChatRoomDetailResponse,
  ChatSimpleRequest,
  DynamicRequest,
  ChatRoom,
} from "../types/";

// MARK: GET - 채팅방 불러오기
export const getChatRooms = async (): Promise<ChatRoomListResponse> => {
  const res = await api.get<ChatRoomListResponse>("/api/chat/rooms");

  return res.data;
};

// MARK: POST - 채팅 내역 업데이트
export const postChatRoom = async (
  body: ChatMessageRequest
): Promise<ChatRoomDetailResponse> => {
  const res = await api.post<ChatRoomDetailResponse>("/api/chat/rooms", body);

  return res.data;
};

// MARK: POST - 채팅
export const postChatting = async (
  roomId: number,
  body: ChatSimpleRequest
): Promise<ChatRoomDetailResponse> => {
  const res = await api.post<ChatRoomDetailResponse>(
    `/api/chat/rooms/${roomId}/messages`,
    body
  );

  return res.data;
};

// MARK: POST - 캐릭터
export const patchCharacter = async (
  roomId: number,
  body: DynamicRequest
): Promise<ChatRoom> => {
  const res = await api.post<ChatRoom>(
    `/api/chat/rooms/${roomId}/character`,
    body
  );

  return res.data;
};

// MARK: GET - 채팅
export const getRoomChatList = async (
  roomId: number
): Promise<ChatRoomDetailResponse> => {
  const res = await api.post<ChatRoomDetailResponse>(
    `/api/chat/rooms/${roomId}`
  );

  return res.data;
};
