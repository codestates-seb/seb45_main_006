import { withAuthApi } from "@api/common/withAuthApi";
import { MAKE_API_PATH } from "@api/constant";
import { PostReqCreateChatRoom, GetReqEnrollChatRoom, DeleteReqExitChatRoom } from "@type/chat/chat.req.dto";

// 채팅방 생성
export const postCreateChatRoom = async (requestObj: PostReqCreateChatRoom) => {
    const url = MAKE_API_PATH.CHAT.create();
    const { data } = await withAuthApi.post(url, requestObj);
    return data;
};

// 채팅방 들어가기
export const getEnrollChatRoom = async ({ chatRoomId }: GetReqEnrollChatRoom) => {
    const url = MAKE_API_PATH.CHAT.enroll({ chatRoomId });
    const { data } = await withAuthApi.get(url);
    return data;
};

// 나의 채팅방 보기
export const getMyChatRooms = async () => {
    const url = MAKE_API_PATH.CHAT.list();
    const { data } = await withAuthApi.get(url);
    return data;
};

// 채팅방 나가기
export const deleteChatRoom = async ({ chatRoomId }: DeleteReqExitChatRoom) => {
    const url = MAKE_API_PATH.CHAT.exit({ chatRoomId });
    const { data } = await withAuthApi.delete(url);
    return data;
};

// 메세지 보내기
