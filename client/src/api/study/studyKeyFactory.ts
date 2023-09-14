import { GetReqAllStudies, GetReqDetailStudy } from "@type/study/study.req.dto";

export const studyKeyFactory = {
    all: ({ page, size, stack }: GetReqAllStudies) => ["studies", { page, size, stack }],
    detail: ({ boardId }: GetReqDetailStudy): [string, GetReqDetailStudy] => ["studies", { boardId }],
};
