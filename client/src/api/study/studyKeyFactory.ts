import { GetReqAllStudies, GetReqDetailStudy } from "@type/study/study.req.dto";

export const studyKeyFactory = {
    all: ({ page, size, stack, title, status }: GetReqAllStudies) => ["studies", { page, size, stack, title, status }],
    detail: ({ boardId }: GetReqDetailStudy): [string, GetReqDetailStudy] => ["studies", { boardId }],
};
