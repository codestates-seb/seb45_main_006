export interface SpecifyQuestion {
    questionId: number;
}

export interface SpecifyAnswer {
    questionId: number;
    answerId: number;
}

export interface SpecifyAnswerComment extends SpecifyAnswer {
    commentId: number;
}

// 질문 게시판 - 답변 리스트
export interface GetReqAnswer extends SpecifyQuestion {
    page: number;
    size: number;
}

// 질문 게시판 - 대댓글 리스트
export interface GetReqAnswerComment extends SpecifyAnswer {
    page: number;
    size: number;
}

// 질문 게시판 - 답변 등록
export interface PostReqAnswer extends SpecifyQuestion {
    content: string;
}

// 질문 게시판 - 답변 수정
export interface PatchReqAnswer extends SpecifyAnswer {
    content: string;
}

// 질문 게시판 - 답변 삭제
export interface DeleteReqAnswer extends SpecifyAnswer {}

// 질문 게시판 - 답변 채택
export interface PostReqAnswerAccept extends SpecifyAnswer {}

// 질문 게시판 - 댓글 생성
export interface PostReqAnswerComment extends SpecifyAnswer {
    content: string;
}

// 질문 게시판 - 댓글 수정
export interface PatchReqAnswerComment extends SpecifyAnswerComment {
    content: string;
}

// 질문 게시판 - 대댓글 생성
export interface PostReqAnswerCommentRe extends SpecifyAnswerComment {
    content: string;
}

// 질문 게시판 - 댓글 삭제
export interface DeleteReqAnswerComment extends SpecifyAnswerComment {}
