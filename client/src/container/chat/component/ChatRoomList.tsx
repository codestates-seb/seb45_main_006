import { useSetRecoilState } from "recoil";
import { isChatBotShowAtom, chatBotStatusAtom, chatRoomIdAtom } from "@feature/chat";

import { useGetMemberDetail } from "@api/member/hook";
import { useDeleteResExitChatRoom } from "@api/chat/hook";
import UserProfile from "@component/user/UserProfile";
import Typography from "@component/Typography";

import { getItemFromStorage } from "@util/localstorage-helper";
import { ChatRoom } from "@type/chat/chat.res.dto";
import { useToast } from "@hook/useToast";
import { useCheckChat } from "@hook/useCheckChat";

const ChatItem = ({ chat, refetchChatRooms }: { chat: ChatRoom; refetchChatRooms: () => void }) => {
    const { nicknames, lastMessage, lastMessageNickname } = chat;

    const setChatBotStatus = useSetRecoilState(chatBotStatusAtom);
    const setIsChatBotShow = useSetRecoilState(isChatBotShowAtom);
    const setChatRoomId = useSetRecoilState(chatRoomIdAtom);

    const myId = getItemFromStorage("memberId");
    const { data: otherUser } = useGetMemberDetail({ memberId: myId });

    const borderCss = "border-b-1 border-tertiary hover:bg-[#f0f7ef]";

    const onClickChatRoomHandler = () => {
        setChatBotStatus("DETAIL");
        setIsChatBotShow(true);
        setChatRoomId(chat.chatRoomId);
    };

    const { createToast, fireToast } = useToast();
    const { mutate: exitChatRoom } = useDeleteResExitChatRoom();

    const onClickDeleteHandler = () => {
        createToast({
            content: "채팅방을 나가시겠습니까?",
            isConfirm: true,
            callback: () => {
                exitChatRoom(
                    { chatRoomId: chat.chatRoomId },
                    {
                        onSuccess: () => {
                            fireToast({
                                content: "채팅방을 나갔습니다!",
                                isConfirm: false,
                            });
                            refetchChatRooms();
                        },
                    },
                );
            },
        });
    };

    return (
        <li
            className={`flex w-full cursor-pointer items-center justify-between p-12 ${borderCss}`}
            onClick={onClickChatRoomHandler}
        >
            <div className="flex">
                {/* <UserProfile size="sm" profilePicture={otherUser?.profilePicture} memberId={otherUser?.memberId || 0} /> */}

                <div className="flex flex-col">
                    <div className="flex">
                        <Typography type="SmallLabel" text={nicknames.join(", ")} styles="font-bold" />
                        <Typography text="의 채팅방" type="SmallLabel" />
                    </div>
                    <div className="flex items-center">
                        <div className="mr-4 flex items-center bg-light-green-50 p-2">
                            <UserProfile
                                size="xs"
                                profilePicture={otherUser?.profilePicture}
                                memberId={otherUser?.memberId || 0}
                            />
                            <Typography type="Description" text={lastMessageNickname} styles="font-bold ml-2" />
                        </div>

                        <Typography
                            type="SmallLabel"
                            text={lastMessage.length > 20 ? `${lastMessage.substring(0, 20)}...` : lastMessage}
                        />
                    </div>
                </div>
            </div>
            <button
                className="h-fit rounded-sm bg-warn px-4 py-2"
                onClick={(e) => {
                    e.stopPropagation();
                    onClickDeleteHandler();
                }}
            >
                <Typography text="삭제" type="Description" color="text-white" />
            </button>
        </li>
    );
};

function ChatRoomList() {
    const { chats, reqRefetchChatRooms } = useCheckChat();
    return (
        <>
            {chats && Array.isArray(chats) && (
                <>
                    {chats.length > 0 ? (
                        <div className="p-4">
                            <Typography
                                text="채팅 리스트"
                                type="SmallLabel"
                                styles="font-bold mb-16"
                                color="text-main"
                            />

                            {chats.map((v) => (
                                <ChatItem
                                    chat={v}
                                    key={`chat-${v.chatRoomId}`}
                                    refetchChatRooms={reqRefetchChatRooms}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex h-full flex-col items-center justify-center">
                            <Typography text="아직 생성된 채팅방이 없습니다🥲" type="Description" styles="mb-8" />
                            <Typography text="마음에 드는 프로젝트 또는 스터디에 참여해보세요!" type="Description" />
                            <Typography text="마음에 드는 유저에게 채팅을 걸어보세요!" type="Description" />
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default ChatRoomList;
