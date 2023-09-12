// 채팅방 생성
export interface PostReqCreateChatRoom {
    memberId: number;
}

// 채팅방 들어가기
export interface GetReqEnrollChatRoom {
    chatRoomId: number;
}

// 나의 채팅방 보기
export interface GetReqChatRooms {}

// 채팅방 나가기
export interface DeleteReqExitChatRoom {
    chatRoomId: number;
}

// 메세지 보내기
export interface SocketReqChatMessage {
    content: string;
}
