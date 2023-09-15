import { PageInfo } from "@type/common";
import { PROEJCT_STATUS_TYPE } from "./common";

// 가져다쓰기 편하게 interface
export interface CommonResProjects {
    boardId: number;
    title: string;
    stack: string[];
    createdAt: string;
    modifiedAt: string;
    startDate: string;
    deadline: string;
    recruitNum: number;
    projectStatus: PROEJCT_STATUS_TYPE;
    viewCount: number;
    bookmarked: boolean;
    memberProfile: MemberProfile;
}

export interface MemberProfile {
    memberId: number;
    profilePicture: string;
    nickname: string;
    githubId: string;
    position: string[];
    stack: string[];
}

export interface GetResAllProjects {
    data: CommonResProjects[];
    pageInfo: PageInfo;
}

export interface GetResDetailProject extends CommonResProjects {
    content: string;
    viewCount: number;
}

export interface PatchResProject extends GetResDetailProject {}

export interface PostResProject extends CommonResProjects {}

// 응답 바디가 없음
export interface DeleteResProject {}
