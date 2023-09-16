import { useEffect } from "react";

import { useSetRecoilState } from "recoil";
import { chatBotStatusAtom, isChatBotShowAtom, chatRoomIdAtom } from "@feature/chat";

import { useGetChatRooms, usePostCreateChatRoom } from "@api/chat/hook";

import { useToast } from "./useToast";

export const useCheckChat = ({ memberId }: { memberId: number }) => {
    const setChatBotStatus = useSetRecoilState(chatBotStatusAtom);
    const setIsChatBotShow = useSetRecoilState(isChatBotShowAtom);
    const setChatRoomId = useSetRecoilState(chatRoomIdAtom);

    // const [isChatRoomExisted, setIsAlreadyExisted] = useState(false);

    const { data: chats, refetch } = useGetChatRooms();
    const { mutate: creatChatRoom } = usePostCreateChatRoom();

    const { fireToast, errorToast } = useToast();

    useEffect(() => {
        refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useEffect(() => {
    //     if (chats && Array.isArray(chats)) {
    //         chats.map((v) => {
    //             if (v.membersId.includes(memberId)) {
    //                 setIsAlreadyExisted(true);
    //                 setChatRoomId(v.chatRoomId);
    //             }
    //         });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [chats]);

    const createOrEnrollChatRoom = ({ nickname, closeModal }: { nickname: string; closeModal?: () => void }) => {
        let chatRoomExisted = false;
        if (chats && Array.isArray(chats)) {
            chats.map((v) => {
                if (v.membersId.includes(memberId)) {
                    chatRoomExisted = true;
                    setChatRoomId(v.chatRoomId);
                }
            });
        }

        console.log("1 chatRoomExisted", chatRoomExisted);

        const onClickChatRoomHandler = () => {
            console.log("3 nickname", nickname);
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
                        console.log("2 ???");
                        onClickChatRoomHandler();
                    },
                    onError: (err) => {
                        console.log(err);
                        errorToast();
                    },
                },
            );
        };

        if (chatRoomExisted) {
            onClickChatRoomHandler();
        } else {
            onCreateChatHanlder();
        }
        if (closeModal) closeModal();
    };

    return { createOrEnrollChatRoom };
};
