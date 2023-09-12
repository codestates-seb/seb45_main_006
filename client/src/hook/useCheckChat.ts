import { useEffect, useState } from "react";

import { useSetRecoilState } from "recoil";
import { chatBotStatusAtom, isChatBotShowAtom, chatRoomIdAtom } from "@feature/chat";

import { useGetChatRooms, usePostCreateChatRoom } from "@api/chat/hook";

import { useToast } from "./useToast";

export const useCheckChat = ({ memberId }: { memberId: number }) => {
    const setChatBotStatus = useSetRecoilState(chatBotStatusAtom);
    const setIsChatBotShow = useSetRecoilState(isChatBotShowAtom);
    const setChatRoomId = useSetRecoilState(chatRoomIdAtom);

    const [isChatRoomExisted, setIsAlreadyExisted] = useState(false);

    const { data: chats } = useGetChatRooms();
    const { mutate: creatChatRoom } = usePostCreateChatRoom();

    const { fireToast, errorToast } = useToast();

    useEffect(() => {
        if (chats?.data && Array.isArray(chats.data)) {
            chats.data.map((v) => {
                if (v.membersId.includes(memberId)) {
                    setIsAlreadyExisted(true);
                    setChatRoomId(v.chatRoomId);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chats]);

    const createOrEnrollChatRoom = ({ nickname, closeModal }: { nickname: string; closeModal?: () => void }) => {
        const onClickChatRoomHandler = () => {
            setChatBotStatus("DETAIL");
            setIsChatBotShow(true);
            fireToast({
                content: `오른쪽 하단에 채팅방이 열렸습니다! ${nickname}님과 대화를 이어가보세요!`,
                isConfirm: false,
            });
        };

        const onCreateChatHanlder = () => {
            creatChatRoom(
                { memberId },
                {
                    onSuccess: () => {
                        onClickChatRoomHandler();
                    },
                    onError: (err) => {
                        console.log(err);
                        errorToast();
                    },
                },
            );
        };

        if (closeModal) closeModal();
        if (isChatRoomExisted) {
            onClickChatRoomHandler();
        } else {
            onCreateChatHanlder();
        }
    };

    return { isChatRoomExisted, createOrEnrollChatRoom };
};
