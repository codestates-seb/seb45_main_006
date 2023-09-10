import { CommentDefaultTypeWithRe } from "@type/comment/comment.res.dto";

export interface AnswerDefaultType {
    answerId: number;
    memberId: number;
    nickname: string;
    boardId: number;
    accepted: false;
    content: string;
    answerStatus: "ANSWER_POSTED" | "ANSER_DELETED";
    createdAt: string;
    modifiedAt: string;
    commentList: Array<CommentDefaultTypeWithRe>;
}

// 질문 게시판 - 답변 등록 - status code: 201
export interface PostResAnswer {}

// 질문 게시판 - 답변 수정
export interface PatchResAnswer extends AnswerDefaultType {}

// 질문 게시판 - 답변 삭제 - status code: 204
export interface DeleteResAnswer {}

// 질문 게시판 - 답변 채택 - status code: 200
export interface PostResAnswerAccept {}

// 질문 게시판 - 댓글 생성 - status code: 201
export interface PostResAnswerComment {}

// 질문 게시판 - 댓글 수정
export interface PatchResAnswerComment extends CommentDefaultTypeWithRe {}

// 질문 게시판 - 대댓글 생성 - status code: 201
export interface PostResAnswerCommentRe {}

// 질문 게시판 - 댓글 삭제 - status code: 204
export interface DeleteResAnswerComment {}
