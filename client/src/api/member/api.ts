import { commonApi } from "@api/common/commonApi";
import { withAuthApi } from "@api/common/withAuthApi";
import { DeleteReqMember, GetReqAllMembers, GetReqMemberDetail, PatchReqMember } from "@type/member/member.req.dto";

// 유저 리스트 - 멤버 리스트 조회하기
export const getAllMembers = ({ page, size }: GetReqAllMembers) => {
    const method = "GET";
    const path = `/members?page=${page}&size=${size}`;
    return commonApi({ method, path });
};

// 멤버 상세 조회하기 - JWT 기능이 들어가면 depth 뺄 예정
export const getMemberDetail = ({ userId }: GetReqMemberDetail) => {
    const method = "GET";
    const path = `/members/${userId}`;
    return withAuthApi({ method, path });
};

// 마이페이지 수정 - 멤버 수정하기
export const patchMember = ({
    userId,
    nickname,
    profilePicture,
    githubId,
    introduction,
    listEnroll,
    position,
    stack,
}: PatchReqMember) => {
    const method = "GET";
    const path = `/members/${userId}`;
    const data = {
        userId,
        nickname,
        profilePicture,
        githubId,
        introduction,
        listEnroll,
        position,
        stack,
    };
    return withAuthApi({ method, path, data });
};

// 탈퇴 - 멤버 삭제하기 - JWT 기능이 들어가면 depth 뺄 예정
export const deleteMember = ({ userId }: DeleteReqMember) => {
    const method = "DELETE";
    const path = `/members/${userId}`;
    return withAuthApi({ method, path });
};
