import { CATEGORY_ENUM } from "./common";

interface InfoDefaultType {
    boardId: number;
    title: string;
    content: string;
    memberId: number;
    nickname: string;
    viewCount: number;
    category: CATEGORY_ENUM;
    infoBoardStatus: string;
    commentList: Array<unknown>;
    createdAt: string;
    unpdatedAt: string;
}

// 정보 게시판 - 리스트 조회
export interface GetResAllInfo {
    data: InfoDefaultType;
}

// 정보 게시판 - 등록  - status code: 200
export interface PostResInfo {}

// 정보 게시판 - 수정 (본인이 작성한 글만 가능)
export interface PatchResInfo extends InfoDefaultType {}

// 정보 게시판 - 삭제 (본인이 작성한 글만 가능) - status code: 204
export interface DeleteResInfo {}
