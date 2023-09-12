import { useSetRecoilState } from "recoil";
import { isChatBotShowAtom, chatBotStatusAtom, chatRoomIdAtom } from "@feature/chat";

import { useGetMemberDetail } from "@api/member/hook";
import UserProfile from "@component/user/UserProfile";
import Typography from "@component/Typography";

import { getItemFromStorage } from "@util/localstorage-helper";
import { ChatRoom, GetResChatRooms } from "@type/chat/chat.res.dto";

const ChatItem = ({ chat }: { chat: ChatRoom }) => {
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

    return (
        <li className={`flex w-full cursor-pointer p-12 ${borderCss}`} onClick={onClickChatRoomHandler}>
            <UserProfile size="sm" profilePicture={otherUser?.profilePicture} />
            <div className="flex flex-col">
                <div className="flex">
                    <Typography type="SmallLabel" text={nicknames.join(", ")} styles="font-bold" />
                </div>
                <Typography type="Description" text={lastMessage} />
            </div>
        </li>
    );
};

function ChatRoomList({ chats }: { chats: GetResChatRooms | undefined }) {
    return (
        <>
            {chats?.data && Array.isArray(chats?.data) && (
                <>
                    {chats.data.length > 0 ? (
                        <>
                            <Typography
                                text="채팅 리스트"
                                type="SmallLabel"
                                styles="font-bold mb-16"
                                color="text-main"
                            />

                            {chats.data.map((v) => (
                                <ChatItem chat={v} key={`chat-${v.chatRoomId}`} />
                            ))}
                        </>
                    ) : (
                        <div className="flex h-full flex-col items-center justify-center">
                            <Typography text="아직 생성된 채팅방이 없습니다🥲" type="Description" styles="mb-8" />
                            <Typography text="마음에 드는 프로젝트 또는 스터디에 참여해보세요!" type="Description" />
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default ChatRoomList;
