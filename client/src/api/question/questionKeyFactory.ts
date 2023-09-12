import { GetReqAllQuestion } from "@type/question/question.req.dto";

export const questionKeyFactory = {
    all: ({ search, size, page }: GetReqAllQuestion): [string, GetReqAllQuestion] => [
        "question",
        { page, size, search },
    ],
};
