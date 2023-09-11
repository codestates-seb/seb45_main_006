interface Paging {
    page: number;
    memberId: number;
}

// 유저의 프로젝트
export interface GetReqProjectOfMember extends Paging {}

// 유저의 스터디
export interface GetReqStudyOfMember extends Paging {}

// 유저의 자유게시글
export interface GetReqInfoOfMember extends Paging {}

// 유저의 질문게시글
export interface GetReqQuestionOfMember extends Paging {}
