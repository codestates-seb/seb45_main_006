export type GetReqAllStudies = {
    // 파라미터 없음
    // 나중에 확인
};

export type GetReqDetailStudy = {
    boardId: number;
};

export type PostReqStudy = {
    title: string;
    content: string;
    recruitNum: number;
    recruitStatus: boolean;
};

export type PatchReqStudy = {
    boardId: number;
    content: string;
    //제목, 인원 수 수정 조율
};

export type DeleteReqStudy = {
    boardId: number;
};
