import { CATEGORY_TYPE } from "./common";
import { PageInfo } from "@type/common";

export interface InfoDefaultType {
    boardId: number;
    title: string;
    content: string;
    memberId: number;
    nickname: string;
    profilePicture: string;
    viewCount: number;
    category: CATEGORY_TYPE;
    infoBoardStatus: "INFOBOARD_POSTED" | "INFOBOARD_DELETED";
    createdAt: string;
    modifiedAt: string;
    liked: boolean;
    likeCount: number;
    bookmarked: boolean;
}

// 정보 게시판 - 리스트 조회
export interface GetResAllInfo {
    data: Array<InfoDefaultType>;
    pageInfo: PageInfo;
}

// 정보 게시판 - 등록  - status code: 200
export interface PostResInfo {}

// 정보 게시판 - 수정 (본인이 작성한 글만 가능)
export interface PatchResInfo extends InfoDefaultType {}

// 정보 게시판 - 삭제 (본인이 작성한 글만 가능) - status code: 204
export interface DeleteResInfo {}

// 정보 게시판 - 조회수 증가 - status code: 200
export interface PostResViewCount {}
