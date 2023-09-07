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
    startDate: string;
    deadline: string;
    recruitNum: number;
    recruitStatus: boolean;
};

export type PatchReqProject = {
    boardId: number;
    content: string;
    //제목, 인원 수 수정 조율
};

export type DeleteReqProject = {
    boardId: number;
};
