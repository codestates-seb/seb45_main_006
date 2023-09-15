import { GetReqAllProjects, GetReqDetailProject } from "@type/project/project.req.dto";

export const projectKeyFactory = {
    all: ({ page, size, stack, status, title }: GetReqAllProjects) => [
        "projects",
        { page, size, stack, status, title },
    ],
    detail: ({ boardId }: GetReqDetailProject): [string, GetReqDetailProject] => ["projects", { boardId }],
};
