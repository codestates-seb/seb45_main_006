import { GetReqAllInfo } from "@type/info/info.req.dto";

export const infoKeyFactory = {
    all: ({ category, search }: GetReqAllInfo): [string, GetReqAllInfo] => ["info", { category, search }],
};
