import { AnswerDefaultType } from "@type/answer/answer.res.dto";

export interface QuestionDefaultType {
    boardId: number;
    title: string;
    content: string;
    memberId: number;
    nickname: string;
    viewCount: number;
    QuestionBoardStatus: string;
    answered: boolean;
    createdAt: string;
    modifiedAt: string;
    answerList: Array<AnswerDefaultType>;
}

// 질문 게시판 - 리스트 조회
export interface GetResAllQuestion {
    data: QuestionDefaultType;
}

// 질문 게시판 - 등록  - status code: 200
export interface PostResQuestion {}

// 질문 게시판 - 수정 (본인이 작성한 글만 가능)
export interface PatchResQuestion extends QuestionDefaultType {}

// 질문 게시판 - 삭제 (본인이 작성한 글만 가능) - status code: 204
export interface DeleteResQuestion {}

// 질문 게시판 - 조회수 증가 - status code: 200
export interface PostResViewCount {}
