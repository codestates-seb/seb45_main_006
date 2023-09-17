import { GetReqAllInfo } from "@type/info/info.req.dto";

export const infoKeyFactory = {
    all: ({ category, search, page, size }: GetReqAllInfo): [string, GetReqAllInfo] => [
        "info",
        { category, search, page, size },
    ],
    detail: ({ boardId }: { boardId: number }) => ["info", { boardId }],
};
