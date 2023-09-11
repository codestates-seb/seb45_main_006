import { withAuthApi } from "@api/common/withAuthApi";
import { COMMON_API_PATH } from "@api/constant";
import {
    GetReqAllMembers,
    PatchReqMember,
    GetReqMemberDetail,
    PostReqBlockMember,
    DeleteReqBlockMember,
    GetReqMyDetail,
    PatchReqMemberPw,
} from "@type/member/member.req.dto";

// 유저 리스트 - 멤버 리스트 조회하기 & 차단 유저 제외
export const getAllMembers = async ({ page, stacks, posiions }: GetReqAllMembers) => {
    const query = `page=${page}${stacks ? "&stacks=" + stacks : ""}${posiions ? "&positions=" + posiions : ""}`;
    const url = `${COMMON_API_PATH.MEMBER.MY_LIST}?${query}`;
    const { data } = await withAuthApi.get(url);
    return data;
};

// 유저 리스트 - 멤버 리스트 조회하기
export const getAllMembersWithoutBlock = async ({ page, stacks, posiions }: GetReqAllMembers) => {
    const query = `page=${page}${stacks ? "&stacks=" + stacks : ""}${posiions ? "&positions=" + posiions : ""}`;
    const url = `${COMMON_API_PATH.MEMBER.LIST}?${query}`;
    const { data } = await withAuthApi.get(url);
    return data;
};

// 유저 리스트 - 멤버 상세 조회하기
export const getMemberDetail = async ({ memberId }: GetReqMemberDetail) => {
    const url = `${COMMON_API_PATH.MEMBER.PATH}/${memberId}`;
    const { data } = await withAuthApi.get(url);
    return data;
};

// 마이페이지 - 내 정보 상세 조회하기
export const getMyDetail = async ({ rawPassword }: GetReqMyDetail) => {
    const url = `${COMMON_API_PATH.MEMBER.PATH}`;
    const { data } = await withAuthApi.get(url, { data: rawPassword });
    return data;
};

// 마이페이지 - 비밀번호 수정
export const patchMemberPw = async (requstObj: PatchReqMemberPw) => {
    const url = `${COMMON_API_PATH.MEMBER.CHANGE_PASSWORD}`;
    const { data } = await withAuthApi.patch(url, requstObj);
    return data;
};

// 마이페이지 - 정보 수정하기
export const patchMember = async (requestObj: PatchReqMember) => {
    const url = `${COMMON_API_PATH.MEMBER.PATH}`;
    const { data } = await withAuthApi.patch(url, requestObj);
    return data;
};

// 유저리스트 - 차단하기
export const postBlockMember = async (requstObj: PostReqBlockMember) => {
    const url = `${COMMON_API_PATH.MEMBER.BLOCK}`;
    const { data } = await withAuthApi.post(url, requstObj);
    return data;
};

// 마이페이지 - 차단 해제
export const deleteBlockMember = async ({ memberId }: DeleteReqBlockMember) => {
    const url = `${COMMON_API_PATH.MEMBER.BLOCK}/${memberId}`;
    const { data } = await withAuthApi.delete(url);
    return data;
};

// 헤더 - 로그아웃
export const deleteMember = async () => {
    const url = `${COMMON_API_PATH.MEMBER.PATH}`;
    const { data } = await withAuthApi.delete(url);
    return data;
};
