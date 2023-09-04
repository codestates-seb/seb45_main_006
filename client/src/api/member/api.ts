import { commonApi } from "@api/common/commonApi";
import { withAuthApi } from "@api/common/withAuthApi";
import { COMMON_API_PATH } from "@api/constant";
import { DeleteReqMember, GetReqAllMembers, GetReqMemberDetail, PatchReqMember } from "@type/member/member.req.dto";

// 유저 리스트 - 멤버 리스트 조회하기
export const getAllMembers = async ({ page, size }: GetReqAllMembers) => {
    const url = `${COMMON_API_PATH.MEMBER.PATH}?page=${page}&size=${size}`;
    const { data } = await commonApi.get(url);
    return data;
};

// 멤버 상세 조회하기 - JWT 기능이 들어가면 depth 뺄 예정
export const getMemberDetail = async ({ memberId }: GetReqMemberDetail) => {
    const url = `${COMMON_API_PATH.MEMBER.PATH}/${memberId}`;
    const { data } = await withAuthApi.get(url);
    return data;
};

// 마이페이지 수정 - 멤버 수정하기
export const patchMember = async ({ memberId, ...requestObj }: PatchReqMember) => {
    const url = `${COMMON_API_PATH.MEMBER.PATH}/${memberId}`;
    const { data } = await withAuthApi.put(url, {
        memberId,
        ...requestObj,
    });
    return data;
};

// 탈퇴 - 멤버 삭제하기 - JWT 기능이 들어가면 depth 뺄 예정
export const deleteMember = async ({ memberId }: DeleteReqMember) => {
    const url = `${COMMON_API_PATH.MEMBER.PATH}/${memberId}`;
    const { data } = await withAuthApi.delete(url);
    return data;
};

// 비밀번호 수정
export const patchMemberPw = async (requstObj: PatchReqMember) => {
    const url = `${COMMON_API_PATH.MEMBER.CHANGE_PASSWORD}`;
    const { data } = await commonApi.patch(url, requstObj);
    return data;
};
