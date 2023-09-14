export type GetReqAllStudies = {
    page: number;
    size: number;
    stack?: string;
    // search?: string;
    // orderBy: string;
};

export type GetReqDetailStudy = {
    boardId: number;
};

export type PostReqStudy = {
    title: string;
    content: string;
    stack: Array<string>;
    recruitNum: number;
};

export type PatchReqStudy = {
    boardId: number;
    content: string;
    //제목, 인원 수 수정 조율
};

export type DeleteReqStudy = {
    boardId: number;
};
