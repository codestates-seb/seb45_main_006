// 유저 리스트 - 멤버 리스트 조회하기
export type GetReqAllMembers = {
    page: number;
    posiions?: string;
    stacks?: string;
};

// 유저 리스트 - 멤버 상세 조회하기
export type GetReqMemberDetail = {
    memberId: number;
};

// 마이페이지 - 비밀번호 수정
export type PatchReqMemberPw = {
    rawPassword: string;
    changePassword: string;
};

// 마이페이지 - 정보 수정하기
export type PatchReqMember = {
    memberId?: number;
    nickname: string;
    profilePicture: string;
    githubId: string;
    introduction: string;
    listEnroll: number;
    position: Array<string>;
    stack?: Array<string>;
};

// 헤더 - 로그아웃
export type DeleteReqMember = GetReqMemberDetail;
