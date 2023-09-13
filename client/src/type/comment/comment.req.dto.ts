import { BOARD_TYPE_LOWER } from "./common";

export interface SpecifyBoard {
    board: BOARD_TYPE_LOWER;
    boardId: number;
}

export interface SpecifyComment {
    board: BOARD_TYPE_LOWER;
    boardId: number;
    commentId: number;
}

// 게시판 - 댓글 리스트
export interface GetReqComment extends SpecifyBoard {
    page: number;
    size: number;
}

// 게시판 - 댓글 등록
export interface PostReqComment extends SpecifyBoard {
    content: string;
}

// 게시판 - 댓글, 대댓글 수정
export interface PatchReqComment extends SpecifyComment {
    content: string;
}

// 게시판 - 대댓글 등록
export interface PostReqCommentRe extends SpecifyComment {
    content: string;
}

// 게시판 - 댓글 삭제
export interface DeleteReqComment extends SpecifyComment {}
