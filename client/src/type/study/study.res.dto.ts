import { PageInfo } from "@type/common";
import { STUDY_STATUS_TYPE } from "@type/project/common";

// 가져다쓰기 편하게 interface
export interface CommonResStudies {
    boardId: number;
    title: string;
    stacks: string[];
    createdAt: string;
    modifiedAt: string;
    recruitNum: number;
    bookmarked: boolean;
    viewCount: number;
    studyStatus: STUDY_STATUS_TYPE;
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

export interface GetResAllStudies {
    data: CommonResStudies[];
    pageInfo: PageInfo;
}

export interface GetResDetailStudy extends CommonResStudies {
    content: string;
}

export interface PostResStudy extends GetResDetailStudy {}

export interface PatchResStudy extends GetResDetailStudy {}

// 응답 바디가 없음
export interface DeleteResStudy {}
