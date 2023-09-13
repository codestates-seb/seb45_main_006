export interface CommonReqParams {
    board: string;
    boardId: number;
}

// 정보/질문 게시판 HOT 게시글 조회
export interface GetReqHottestBoard {
    board: string;
}
