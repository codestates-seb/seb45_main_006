import { GetReqNicknameDuplicated } from "@type/sign/sign.req.dto";

export const signKeyFactory = {
    nicknameDuplicated: ({ nickname }: GetReqNicknameDuplicated): [string, GetReqNicknameDuplicated] => [
        "sign",
        { nickname },
    ],
};
