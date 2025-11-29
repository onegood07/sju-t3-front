// store/useChatStore.ts
import { create } from "zustand";
import type {
  ChatRoom,
  ChatRoomDetailResponse,
  ChatMessageRequest,
} from "../types";
import { postChatRoom } from "../api";

interface ChatStore {
  rooms: ChatRoom[];
  currentRoom: ChatRoomDetailResponse | null;
  setRooms: (rooms: ChatRoom[]) => void;
  setCurrentRoom: (room: ChatRoomDetailResponse) => void;
  clearRooms: () => void;
  createRoom: (data: ChatMessageRequest) => Promise<void>;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  rooms: [],
  currentRoom: null,
  setRooms: (rooms) => set({ rooms }),
  setCurrentRoom: (room) => set({ currentRoom: room }),
  clearRooms: () => set({ rooms: [] }),

  createRoom: async (data: ChatMessageRequest) => {
    const newRoom = await postChatRoom(data);

    const formatted: ChatRoom = {
      roomId: newRoom.roomId,
      title: newRoom.roomTitle,
      lastMessagePreview: newRoom.lastAiMessage ?? "",
      character: data.character,
    };

    set({
      rooms: [...get().rooms, formatted],
    });
  },
}));
