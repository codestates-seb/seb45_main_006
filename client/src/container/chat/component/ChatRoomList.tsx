import { useSetRecoilState } from "recoil";
import { isChatBotShowAtom, chatBotStatusAtom, chatRoomIdAtom } from "@feature/chat";

import { useGetMemberDetail } from "@api/member/hook";
import { useDeleteResExitChatRoom } from "@api/chat/hook";
import UserProfile from "@component/user/UserProfile";
import Typography from "@component/Typography";

import { getItemFromStorage } from "@util/localstorage-helper";
import { ChatRoom, GetResChatRooms } from "@type/chat/chat.res.dto";
import { useToast } from "@hook/useToast";

const ChatItem = ({ chat, refetch }: { chat: ChatRoom; refetch: () => void }) => {
    const { nicknames, lastMessage } = chat;

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
                            refetch();
                        },
                    },
                );
            },
        });
    };

    return (
        <li className={`flex w-full cursor-pointer justify-between p-12 ${borderCss}`} onClick={onClickChatRoomHandler}>
            <div className="flex">
                <UserProfile size="sm" profilePicture={otherUser?.profilePicture} />
                <div className="flex flex-col">
                    <div className="flex">
                        <Typography type="SmallLabel" text={nicknames.join(", ")} styles="font-bold" />
                    </div>
                    <Typography
                        type="Description"
                        text={lastMessage.length > 17 ? `${lastMessage.substring(0, 17)}...` : lastMessage}
                    />
                </div>
            </div>
            <button
                className="rounded-sm bg-warn px-4 py-2"
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

function ChatRoomList({ chats, refetch }: { chats: GetResChatRooms | undefined; refetch: () => void }) {
    console.log(chats);
    return (
        <>
            {chats && Array.isArray(chats) && (
                <>
                    {chats.length > 0 ? (
                        <>
                            <Typography
                                text="채팅 리스트"
                                type="SmallLabel"
                                styles="font-bold mb-16"
                                color="text-main"
                            />

                            {chats.map((v) => (
                                <ChatItem chat={v} key={`chat-${v.chatRoomId}`} refetch={refetch} />
                            ))}
                        </>
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
