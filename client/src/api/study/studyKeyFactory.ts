import { GetReqDetailStudy } from "@type/study/study.req.dto";

export const studyKeyFactory = {
    all: () => ["studies"],
    detail: ({ boardId }: GetReqDetailStudy): [string, GetReqDetailStudy] => ["studies", { boardId }],
};
