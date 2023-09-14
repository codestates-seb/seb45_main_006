import { GetReqAllProjects, GetReqDetailProject } from "@type/project/project.req.dto";

export const projectKeyFactory = {
    all: ({ page, size, stack }: GetReqAllProjects) => ["projects", { page, size, stack }],
    detail: ({ boardId }: GetReqDetailProject): [string, GetReqDetailProject] => ["projects", { boardId }],
};
