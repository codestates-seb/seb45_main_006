import Typography from "@component/Typography";
import UserProfile from "@component/user/UserProfile";

import { useGetChatRooms } from "@api/chat/hook";
import { useGetMemberDetail } from "@api/member/hook";

import { ChatRoom } from "@type/chat/chat.res.dto";
import { getItemFromStorage } from "@util/localstorage-helper";
import { useEffect } from "react";

const ChatItem = ({ chat }: { chat: ChatRoom }) => {
    const { nicknames, lastMessage } = chat;
    const myId = getItemFromStorage("memberId");
    const { data: otherUser } = useGetMemberDetail({ memberId: myId });

    return (
        <div className="mb-8 flex w-full rounded-xl border-1 border-borderline p-12">
            <UserProfile size="md" profilePicture={otherUser?.profilePicture} />
            <div className="flex flex-col">
                <div className="flex">
                    <Typography type="Highlight" text={nicknames.join(", ")} styles="font-bold" />
                </div>
                <Typography type="SmallLabel" text={lastMessage} />
            </div>
        </div>
    );
};

function ChatRooms() {
    const { data: chats, refetch } = useGetChatRooms();
    useEffect(() => {
        refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex flex-1 flex-col items-center rounded-md bg-white p-40 shadow-md">
            {Array.isArray(chats) && chats.length > 0 ? (
                chats.map((v) => <ChatItem chat={v} key={`chat-${v.chatRoomId}`} />)
            ) : (
                <div className="flex h-full flex-col items-center justify-center">
                    <Typography text="아직 생성된 채팅방이 없습니다🥲" type="Description" styles="mb-8" />
                    <Typography text="마음에 드는 프로젝트 또는 스터디에 참여하거나" type="Description" />
                    <Typography text="마음에 드는 유저에게 채팅을 걸어보세요!" type="Description" />
                </div>
            )}
        </div>
    );
}

export default ChatRooms;
