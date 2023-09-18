import { AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PostReqCreateChatRoom, GetReqEnrollChatRoom, DeleteReqExitChatRoom } from "@type/chat/chat.req.dto";
import {
    PostResCreateChatRoom,
    GetResEnrollChatRoom,
    GetResChatRooms,
    DeleteResExitChatRoom,
} from "@type/chat/chat.res.dto";
import { postCreateChatRoom, getEnrollChatRoom, getMyChatRooms, deleteChatRoom } from "./api";

// 채팅방 생성
export const usePostCreateChatRoom = () => {
    return useMutation<PostResCreateChatRoom, AxiosError, PostReqCreateChatRoom>(postCreateChatRoom);
};

// 채팅방 들어가기
export const useGetEnrollChatRoom = ({ chatRoomId }: GetReqEnrollChatRoom) => {
    return useQuery<GetResEnrollChatRoom, AxiosError, GetResEnrollChatRoom>({
        queryKey: ["chats", { chatRoomId: chatRoomId }],
        queryFn: () => getEnrollChatRoom({ chatRoomId }),
        enabled: !!chatRoomId,
    });
};

// 나의 채팅방 보기
export const useGetChatRooms = () => {
    return useQuery<GetResChatRooms, AxiosError>({
        queryKey: ["chats"],
        queryFn: getMyChatRooms,
    });
};

// 채팅방 나가기
export const useDeleteResExitChatRoom = () => {
    return useMutation<DeleteResExitChatRoom, AxiosError, DeleteReqExitChatRoom>(deleteChatRoom);
};
// 메세지 보내기
