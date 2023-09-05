import { PageInfo } from "@type/common";

// 멤버 리스트 중 하나의 객체
export type OneMember = {
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

// 멤버 상세 조회하기
export type GetResMemberDetail = {
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
    projectList: Array<unknown>;
    studyList: Array<unknown>;
    infoBoardList: Array<unknown>;
};

// 마이페이지 수정 - 멤버 수정하기
export type PatchResMember = GetResMemberDetail;

// 탈퇴 - 멤버 삭제하기 - status code: 204
export type DeleteResMember = Record<string, never>; // empty object

// 비밀번호 변경
export type PatchResMemberPw = Record<string, never>; // empty object
