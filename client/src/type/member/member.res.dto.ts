import { PageInfo } from "@type/common";
import { CommonResProjects } from "@type/project/project.res.dto";
import { CommonResStudies } from "@type/study/study.res.dto";
import { InfoDefaultType } from "@type/info/info.res.dto";

// 멤버 리스트 중 하나의 객체
export type OneMember = {
    memberId: number;
    nickname: string;
    profilePicture: string;
    githubId?: string;
    position: Array<string>;
    stack: Array<string>;
};

// 유저 리스트 - 멤버 리스트 조회하기
export type GetResAllMembers = {
    data: Array<OneMember>;
    pageInfo: PageInfo;
};

// 유저 리스트 - 멤버 상세 조회하기
export type GetResMemberDetail = {
    memberId: number;
    nickname: string;
    profilePicture: string;
    githubId: string;
    introduction: string;
    listEnroll: boolean;
    position: Array<string>;
    stack: Array<string>;
    modifiedAt: string; // 날짜 string 형식으로 도착
    oauthUser: boolean;
    blockMemberList: Array<string>;
    projectList: Array<CommonResProjects>;
    studyList: Array<CommonResStudies>;
    infoBoardList: Array<InfoDefaultType>;
};

// 마이페이지 - 비밀번호 수정 - status code: 200
export type PatchResMemberPw = Record<string, never>; // empty object

// 마이페이지 - 정보 수정하기
export type PatchResMember = GetResMemberDetail;

// 헤더 - 로그아웃 - status code: 204
export type DeleteResMember = Record<string, never>; // empty object
