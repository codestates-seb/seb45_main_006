import { useEffect, useState } from "react";

import { MessageItem } from "@hook/useWebStompClient";
import { getItemFromStorage } from "@util/localstorage-helper";

import Textarea from "@component/Textarea";
import CommonBtn from "@component/CommonBtn";
import Typography from "@component/Typography";
import ChatRommItemNotice from "./ChatRommItemNotice";
import { MessageItemContent, ChatMessageContent } from "./ChatRoomItemContent";

import { GetResEnrollChatRoom, ChatMessage } from "@type/chat/chat.res.dto";

import * as Webstomp from "webstomp-client";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const VITE_APP_WEB_SOCKET_HOST_NAME = import.meta.env.VITE_APP_WEB_SOCKET_HOST_NAME || "";

function ChatRoomItem({ chatMessages }: { chatMessages: GetResEnrollChatRoom }) {
    const [client, setClient] = useState<Webstomp.Client | null>(null);
    // 기존 채팅 내용 중 공지
    const [notice, setNotice] = useState<Array<ChatMessage>>([]);
    // 기존 채팅 내용 중 공지 상단에 띄울 내용
    const [latestNotice, setLatestNotice] = useState<ChatMessage | null>(null);
    // 기존 채팅 내용 중 메시지
    const [basic, setBasic] = useState<Array<ChatMessage>>([]);

    // 웹소켓 통신 시 저장할 메시지 리스트
    const [chatList, setChatList] = useState<MessageItem[]>([]);

    // 웹소켓으로 전달받은 메시지
    // const [recievedMsg, setRecievedMsg] = useState<MessageItem[]>([]);
    // 웹소켓으로 전달하려는 메시지
    const [curMesg, setCurMsg] = useState("");
    const [isConnected, setIsConnected] = useState(false);

    // const memberId = getItemFromStorage("memberId");
    const accessToken = getItemFromStorage("accessToken");

    // TODO: disconnection
    // const disconnectWebSocket = () => {};

    useEffect(() => {
        setNotice([]);
        setLatestNotice(null);
        setBasic([]);
        // setRecievedMsg([]);
        setCurMsg("");
        setIsConnected(false);
        chatMessages.messageList.forEach((v) => {
            if (v.type === "NOTICE") {
                setNotice((prevNotice) => [...prevNotice, v]);
            }

            if (v.type === "BASIC") {
                setBasic((prevBasic) => [...prevBasic, v]);
            }
        });
    }, [chatMessages]);

    useEffect(() => {
        if (notice.reverse()[0] && notice.reverse()[0].content) {
            setLatestNotice(notice.reverse()[0]);
        }
    }, [notice]);

    useEffect(() => {
        // setRecievedMsg([]);

        if (chatMessages.chatRoomId) {
            const socket = new WebSocket(VITE_APP_WEB_SOCKET_HOST_NAME as string);
            const stompClient = Webstomp.over(socket);

            stompClient.connect(
                {},
                () => {
                    setIsConnected(true);

                    stompClient.subscribe(`/topic/chat/${chatMessages.chatRoomId}`, async (message) => {
                        const messageData = JSON.parse(message.body).body;

                        // const isMine = messageData.senderId === memberId;

                        // setRecievedMsg((prevMessages) => {
                        //     const newMessages = [...prevMessages, { ...messageData }];
                        //     return newMessages;
                        // });

                        setChatList((prevChatList) => {
                            if (prevChatList.filter((v) => v.createAt === messageData.createAt)[0]) {
                                return [...prevChatList];
                            }
                            return [...prevChatList, messageData];
                        });
                    });
                },
                (error) => {
                    console.error("STOMP protocol error:", error);
                    setIsConnected(false);
                },
            );

            setClient(stompClient);
        }
    }, [chatMessages.chatRoomId]);

    useEffect(() => {
        const element = document.querySelector("#chatBox");
        if (element) {
            element.scrollTop = element.scrollHeight;
        }
    }, [chatList]);

    const onSendMessage = () => {
        if (client && client.connected) {
            client.send(`/app/chat/${chatMessages.chatRoomId}`, JSON.stringify({ content: curMesg, accessToken }), {});
        } else {
            console.error("WebSocket connection is not yet established.");
        }
    };

    const onClickSendHandler = () => {
        if (curMesg.trim() === "") return;

        onSendMessage();

        // const newMessage: MessageItem = {
        //     content: curMesg,
        //     senderId: null,
        //     createdAt: new Date().toISOString(),
        //     messageId: null,
        // };
        // setChatList((prevChatList) => [...prevChatList, newMessage]);

        setCurMsg("");
    };

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key == "Enter" && onClickSendHandler) {
            e.preventDefault();
            onClickSendHandler();
        }
    };

    return (
        <>
            <div className="relative mb-8 flex min-h-423 flex-1 flex-col justify-between bg-white">
                <ChatRommItemNotice notice={notice} latestNotice={latestNotice} />
                <div className="h-63"></div>
                <div className="h-373 py-8">
                    <div className="flex max-h-373 w-full flex-col overflow-y-scroll px-4" id="chatBox">
                        {basic.length > 0 && basic.map((v) => <ChatMessageContent key={v.createAt} v={v} />)}
                        {chatList.map((v) => (
                            <MessageItemContent key={v.createAt} v={v} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex h-50 items-center justify-between px-4">
                <div className="mr-8 flex-1">
                    <Textarea
                        placeholder="내용을 입력하세요..."
                        value={curMesg}
                        onChange={(e) => setCurMsg(e.currentTarget.value)}
                        onKeyDownHandler={onKeyDownHandler}
                        maxlength={1000}
                        borderStyle="h-50 outline-none hover:outline-none"
                    />
                </div>
                {isConnected && (
                    <CommonBtn
                        size="SM"
                        styleType="OUTLINED"
                        color="MAIN"
                        onClick={onClickSendHandler}
                        styles="h-fit outline-none focus:outline-none"
                    >
                        <Typography text="전송" type="SmallLabel" />
                    </CommonBtn>
                )}
            </div>
        </>
    );
}

export default ChatRoomItem;
