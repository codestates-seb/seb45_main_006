import Typography from "@component/Typography";

import { MessageItem } from "@hook/useWebStompClient";
import { ChatMessage } from "@type/chat/chat.res.dto";

import { getItemFromStorage } from "@util/localstorage-helper";

export const ChatMessageContent = ({ v }: { v: ChatMessage }) => {
    const memberId = getItemFromStorage("memberId");

    return (
        <div
            key={v.createAt || v.content}
            className={`mb-8 flex w-full ${v.senderId === memberId ? "justify-end" : "justify-start"} `}
        >
            <div
                className={`w-fit max-w-200 rounded-md  px-12 py-8 ${
                    v.senderId === memberId ? "bg-light-green-100" : "border-1 border-main"
                }`}
            >
                <Typography text={v.content} type="Description" styles="mb-4" />
                <Typography text={v.content} type="Description" styles="text-[10px]" color="text-gray-600" />
            </div>
        </div>
    );
};

export const MessageItemContent = ({ v }: { v: MessageItem }) => {
    const memberId = getItemFromStorage("memberId");

    return (
        <div
            key={v.createdAt || v.content}
            className={`mb-8 flex w-full ${v.senderId === memberId ? "justify-end" : "justify-start"} `}
        >
            <div
                className={`w-fit max-w-200 rounded-md  px-12 py-8 ${
                    v.senderId === memberId ? "bg-light-green-100" : "border-1 border-main"
                }`}
            >
                <Typography text={v.content} type="Description" styles="mb-4" />
                <Typography text={v.content} type="Description" styles="text-[10px]" color="text-gray-600" />
            </div>
        </div>
    );
};
