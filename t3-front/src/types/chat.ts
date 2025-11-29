export type CharacterType = "not" | "to" | "day";
export type CharacterUpperType = "NOT" | "TO" | "DAY";

export interface ChatRoom {
  roomId: number;
  title: string;
  lastMessagePreview: string;
  character: CharacterType;
}

export type ChatRoomListResponse = ChatRoom[];

export interface ChatMessageRequest {
  message: string;
  title: string;
  character: CharacterType;
}

export interface ChatMessage {
  id: number;
  role: string;
  content: string;
  createdAt: string;
}

export interface ChatRoomDetailResponse {
  roomId: number;
  roomTitle: string;
  messages: ChatMessage[];
  lastAiMessage: string;
}

export interface ChatSimpleRequest {
  message: string;
}

export interface DynamicRequest {
  additionalProp1: string;
  additionalProp2: string;
  additionalProp3: string;
}
