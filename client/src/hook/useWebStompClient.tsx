import { useEffect, useState } from "react";
import * as Webstomp from "webstomp-client";
import { getItemFromStorage } from "@util/localstorage-helper";

export interface MessageItem {
    messageId: number | null;
    content: string;
    senderId: number | null;
    createAt?: string;
    isRead?: boolean;
}

const VITE_APP_WEB_SOCKET_HOST_NAME = import.meta.env.VITE_APP_WEB_SOCKET_HOST_NAME;

export const useWebStompClient = (
    chatRoomId: number,
    {
        setMessages,
        setChatList,
        setIsConnected,
    }: {
        setMessages: React.Dispatch<React.SetStateAction<MessageItem[]>>;
        setChatList: React.Dispatch<React.SetStateAction<MessageItem[]>>;
        setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
    },
) => {
    const [client, setClient] = useState<Webstomp.Client | null>(null);
    const memberId = getItemFromStorage("memberId");

    useEffect(() => {
        setMessages([]);

        if (chatRoomId) {
            const socket = new WebSocket(VITE_APP_WEB_SOCKET_HOST_NAME as string);
            const stompClient = Webstomp.over(socket);

            stompClient.connect(
                {},
                () => {
                    console.log("Connected to the WebSocket server");
                    setIsConnected(true);

                    stompClient.subscribe(`/topic/chat/${chatRoomId}`, async (message) => {
                        const messageData = JSON.parse(message.body).body;

                        const isRead = messageData.senderId === memberId;

                        setMessages((prevMessages) => {
                            const newMessages = [...prevMessages, { ...messageData, isRead }];

                            return newMessages;
                        });

                        setChatList((prevChatList) => [...prevChatList, messageData]);
                    });
                },
                (error) => {
                    console.error("STOMP protocol error:", error);
                    setIsConnected(false);
                },
            );

            setClient(stompClient);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatRoomId, setMessages, setChatList, setIsConnected]);

    return client;
};
