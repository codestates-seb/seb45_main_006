import Typography from "@component/Typography";
import UserProfile from "@component/user/UserProfile";

import { useGetChatRooms } from "@api/chat/hook";
import { useGetMemberDetail } from "@api/member/hook";

import { ChatRoom } from "@type/chat/chat.res.dto";
import { getItemFromStorage } from "@util/localstorage-helper";

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
    const { data: chats } = useGetChatRooms();

    return (
        <div className="flex flex-1 flex-col items-center rounded-md bg-white p-40 shadow-md">
            {Array.isArray(chats?.data) && chats?.data.map((v) => <ChatItem chat={v} key={`chat-${v.chatRoomId}`} />)}
        </div>
    );
}

export default ChatRooms;
