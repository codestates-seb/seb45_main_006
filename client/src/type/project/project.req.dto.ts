export type GetReqAllProjects = {
    // 파라미터 없음
    // 나중에 확인
};

export type GetReqDetailProject = {
    boardId: number;
};

export type PostReqProject = {
    title: string;
    content: string;
    stack: string[];
    startDate: string;
    deadline: string;
    recruitNum: number;
    // recruitStatus: boolean;
};

export type PatchReqProject = {
    boardId: number;
    title: string;
    content: string;
    stack: string[];
    startDate: string;
    deadline: string;
    recruitNum: number;
    projectStatus?: string;
};

export type DeleteReqProject = {
    boardId: number;
};
