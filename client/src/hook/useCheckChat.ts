import { useEffect } from "react";

import { useSetRecoilState } from "recoil";
import { chatBotStatusAtom, isChatBotShowAtom, chatRoomIdAtom, chatRoomsAtom } from "@feature/chat";

import { useGetChatRooms, usePostCreateChatRoom } from "@api/chat/hook";

import { useToast } from "./useToast";

export const useCheckChat = () => {
    const setChatBotStatus = useSetRecoilState(chatBotStatusAtom);
    const setIsChatBotShow = useSetRecoilState(isChatBotShowAtom);
    const setChatRoomId = useSetRecoilState(chatRoomIdAtom);
    const setChatRooms = useSetRecoilState(chatRoomsAtom);

    // 정리해서 나누기
    const { data: chats, refetch: refetchChatRooms } = useGetChatRooms();
    const { mutate: creatChatRoom } = usePostCreateChatRoom();

    const { fireToast, errorToast } = useToast();

    useEffect(() => {
        if (chats && Array.isArray(chats)) {
            setChatRooms(chats);
        }
    }, [chats, setChatRooms]);

    const reqRefetchChatRooms = () => {
        refetchChatRooms();
    };

    const checkIsChatRoomExist = ({ memberId }: { memberId: number }) => {
        refetchChatRooms();

        let chatRoomId = 0;
        console.log("chats", chats, memberId);
        if (chats && Array.isArray(chats)) {
            chats.map((v) => {
                if (v.membersId.includes(memberId)) {
                    chatRoomId = v.chatRoomId;
                    console.log("settedCHatromId", v.chatRoomId);
                    setChatRoomId(v.chatRoomId);
                }
            });
        }

        return { chatRoomId };
    };

    const createChatRoom = ({
        nickname,
        memberId,
        closeModal,
    }: {
        nickname: string;
        memberId: number;
        closeModal: () => void;
    }) => {
        let chatId = 0;
        creatChatRoom(
            { memberId },
            {
                onSuccess: (res) => {
                    setChatRoomId(res.chatRoomId);
                    chatId = res.chatRoomId;
                },
                onError: (err) => errorToast(err),
                onSettled: () => {
                    setChatRoomId(chatId);
                    refetchChatRooms();
                    setChatBotStatus("DETAIL");
                    setIsChatBotShow(true);
                    fireToast({
                        content: `오른쪽 하단에 채팅방이 열렸습니다! ${nickname}님과 대화를 이어가보세요!`,
                        isConfirm: false,
                    });
                    closeModal();
                },
            },
        );
    };

    const enrollChatRoomHandler = ({
        nickname,
        chatRoomId,
        closeModal,
    }: {
        nickname: string;
        chatRoomId: number;
        closeModal: () => void;
    }) => {
        setChatRoomId(chatRoomId);
        refetchChatRooms();
        setChatBotStatus("DETAIL");
        setIsChatBotShow(true);
        fireToast({
            content: `오른쪽 하단에 채팅방이 열렸습니다! ${nickname}님과 대화를 이어가보세요!`,
            isConfirm: false,
        });
        closeModal();
    };

    return { chats, reqRefetchChatRooms, checkIsChatRoomExist, createChatRoom, enrollChatRoomHandler };
};
