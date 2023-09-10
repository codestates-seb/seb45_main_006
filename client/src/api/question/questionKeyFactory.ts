import { GetReqAllQuestion } from "@type/question/question.req.dto";

export const questionKeyFactory = {
    all: ({ search }: GetReqAllQuestion): [string, GetReqAllQuestion] => ["question", { search }],
};
