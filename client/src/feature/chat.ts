import { ChatRooms } from "@type/chat/chat.res.dto";
import { atom } from "recoil";

export const isChatBotShowAtom = atom<boolean>({
    key: "isChatBotShowAtom",
    default: false,
});

export const chatBotStatusAtom = atom<"LIST" | "DETAIL">({
    key: "chatBotStatusAtom",
    default: "LIST",
});

export const chatRoomIdAtom = atom<number>({
    key: "chatRoomIdAtom",
    default: 0,
});

export const chatRoomsAtom = atom<ChatRooms>({
    key: "chatRoomsAtom",
    default: [],
});
