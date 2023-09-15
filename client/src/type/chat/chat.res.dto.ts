export type ChatMessage = {
    senderId: number;
    nickname: string;
    content: string;
    type: "BASIC" | "NOTICE";
    createAt: string;
};

export type ChatMessages = Array<ChatMessage>;

export type ChatRoom = {
    chatRoomId: number;
    membersId: Array<number>;
    nicknames: Array<string>;
    lastMessageNickname: string;
    lastMessage: string;
};

export type ChatRooms = Array<ChatRoom>;

// 채팅방 생성
export interface PostResCreateChatRoom {
    memberId: number;
}

// 채팅방 들어가기
export interface GetResEnrollChatRoom {
    chatRoomId: number;
    membersId: Array<number>;
    nicknames: Array<string>;
    messageList: ChatMessages;
}

// 나의 채팅방 보기
export type GetResChatRooms = ChatRooms;

// 채팅방 나가기
export interface DeleteResExitChatRoom {}

// 메세지 보내기
