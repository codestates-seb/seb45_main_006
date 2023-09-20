import { useState } from "react";
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";

import { useSetRecoilState } from "recoil";
import { chatBotStatusAtom } from "@feature/chat";

import Typography from "@component/Typography";
import { GrAnnounce } from "react-icons/gr";
import { BiChevronLeft } from "react-icons/bi";

import { ChatMessage } from "@type/chat/chat.res.dto";

import { localizedChatResponse } from "@util/date-helper";

function ChatRommItemNotice({
    notice,
    latestNotice,
    nicknames,
    disconnectWebSocket,
}: {
    notice: Array<ChatMessage>;
    latestNotice: ChatMessage | null;
    nicknames: Array<string>;
    disconnectWebSocket: () => void;
}) {
    const [open, setOpen] = useState(0);

    const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
    const setChatBotStatus = useSetRecoilState(chatBotStatusAtom);

    return (
        <div className="absolute top-0 w-full bg-light-green-50">
            <div className="flex h-30 items-center border-b-1 border-light">
                <button
                    className="mr-8 p-2"
                    onClick={() => {
                        disconnectWebSocket();
                        setChatBotStatus("LIST");
                    }}
                >
                    <BiChevronLeft size="1.3rem" />
                </button>
                <Typography type="SmallLabel" text={nicknames.join(", ")} styles="font-bold" />
                <Typography text="의 채팅방" type="SmallLabel" />
            </div>
            <Accordion open={open === 1}>
                <AccordionHeader onClick={() => handleOpen(1)} className="">
                    <div className="flex w-full flex-col px-8">
                        {notice && latestNotice?.content && (
                            <>
                                <div className="flex w-full items-center">
                                    <GrAnnounce color="#44AE4E" />
                                    <Typography
                                        text={
                                            latestNotice.content.length > 15
                                                ? `${latestNotice.content.substring(0, 15)}...`
                                                : latestNotice.content || ""
                                        }
                                        type="Description"
                                        styles="ml-8 font-sm"
                                    />
                                </div>
                                <div className="w-full text-right">
                                    <Typography
                                        text={localizedChatResponse(latestNotice.createAt)}
                                        type="Description"
                                        color="font-gray-600"
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </AccordionHeader>
                <div className="max-h-320 overflow-y-scroll">
                    {notice.length > 0 &&
                        notice.reverse().map((v) => (
                            <AccordionBody key={v.createAt}>
                                <div className="border-b-1 border-borderline p-8">
                                    <div className="flex w-full items-center">
                                        <Typography text={v.content} type="SmallLabel" styles="ml-8" />
                                    </div>
                                    <div className="w-full text-right">
                                        <Typography
                                            text={localizedChatResponse(v.createAt)}
                                            type="Description"
                                            color="font-gray-600"
                                        />
                                    </div>
                                </div>
                            </AccordionBody>
                        ))}
                </div>
            </Accordion>
        </div>
    );
}

export default ChatRommItemNotice;
