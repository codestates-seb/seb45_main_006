// 유저 리스트 - 멤버 리스트 조회하기
export type GetReqAllMembers = {
    page: number;
    size: number;
};

// 멤버 상세 조회하기 - JWT 기능이 들어가면 depth 뺄 예정
export type GetReqMemberDetail = {
    memberId: number;
};

// 마이페이지 수정 - 멤버 수정하기
// TODO: listEnroll enum 공유받기
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

// 탈퇴 - 멤버 삭제하기 - JWT 기능이 들어가면 depth 뺄 예정
export type DeleteReqMember = GetReqMemberDetail;
