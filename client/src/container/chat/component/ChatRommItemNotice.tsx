import { useState } from "react";
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";

import Typography from "@component/Typography";
import { GrAnnounce } from "react-icons/gr";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { ChatMessage } from "@type/chat/chat.res.dto";

dayjs.extend(utc);
dayjs.extend(timezone);

function ChatRommItemNotice({
    notice,
    latestNotice,
}: {
    notice: Array<ChatMessage>;
    latestNotice: ChatMessage | null;
}) {
    const [open, setOpen] = useState(0);

    const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

    return (
        <div className="absolute top-0 w-full bg-light-green-50">
            <Accordion open={open === 1}>
                <AccordionHeader onClick={() => handleOpen(1)} className="">
                    <div className="flex w-full flex-col p-8">
                        {notice && latestNotice?.content && (
                            <>
                                <div className="flex w-full items-center">
                                    <GrAnnounce color="#44AE4E" />
                                    <Typography
                                        text={
                                            latestNotice.content.length > 17
                                                ? `${latestNotice.content.substring(0, 17)}...`
                                                : latestNotice.content || ""
                                        }
                                        type="Highlight"
                                        styles="font-ganpan ml-8"
                                    />
                                </div>
                                <div className="w-full text-right">
                                    <Typography
                                        text={dayjs(latestNotice.createAt).tz("Asia/Seoul").format("YYYY-MM-DD hh:mm")}
                                        type="Description"
                                        color="font-gray-600"
                                        styles="font-ganpan"
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
                                        <Typography text={v.content} type="Highlight" styles="font-ganpan ml-8" />
                                    </div>
                                    <div className="w-full text-right">
                                        <Typography
                                            text={dayjs(v.createAt).tz("Asia/Seoul").format("YYYY-MM-DD hh:mm")}
                                            type="Description"
                                            color="font-gray-600"
                                            styles="font-ganpan"
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
