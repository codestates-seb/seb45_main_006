import { CATEGORY_TYPE } from "./common";

interface InfoDefaultType {
    title: string;
    content: string;
    category: CATEGORY_TYPE;
}

interface SpecifyInfoId {
    infoId: number;
}

// 정보 게시판 - 리스트 조회
export interface GetReqAllInfo {
    category?: CATEGORY_TYPE;
    search?: string;
    page: number;
    size: number;
}

// 정보 게시판 - 등록
export interface PostReqInfo extends InfoDefaultType {}

// 정보 게시판 - 수정 (본인이 작성한 글만 가능)
export interface PatchReqInfo extends InfoDefaultType {
    infoId: number;
}

// 정보 게시판 - 삭제 (본인이 작성한 글만 가능)
export interface DeleteReqInfo extends SpecifyInfoId {}

// 정보 게시판 - 조회수 증가
export interface PostReqViewCount extends SpecifyInfoId {}
