import { GetReqDetailProject } from "@type/project/project.req.dto";

export const projectKeyFactory = {
    all: () => ["projects"],
    detail: ({ boardId }: GetReqDetailProject): [string, GetReqDetailProject] => ["projects", { boardId }],
};
