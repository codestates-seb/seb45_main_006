import { PageInfo } from "@type/common";

export interface CommentDefaultType {
    commentId: number;
    memberId: number;
    nickname: string;
    profilePicture: string;
    boardId: number;
    answerId: null | number;
    parentId: null | number;
    content: string;
    commentStatus: "COMMENT_DELETED" | "COMMENT_POSTED";
    createdAt: string;
    modifiedAt: string;
}

export interface CommentDefaultTypeWithRe extends CommentDefaultType {
    commentList: Array<CommentDefaultTypeWithRe>;
}

// 게시판 - 댓글 리스트
export interface GetResComment {
    data: Array<CommentDefaultTypeWithRe>;
    pageInfo: PageInfo;
}

// 게시판 - 댓글 등록 - status code: 201
export interface PostResComment {}

// 게시판 - 댓글 수정
export interface PatchResComment extends CommentDefaultTypeWithRe {}

// 게시판 - 대댓글 등록 - status code: 201
export interface PostResCommentRe {}

// 게시판 - 댓글 삭제 - status code: 204
export interface DeleteResComment {}
