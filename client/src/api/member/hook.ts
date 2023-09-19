import { AxiosError } from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";

import {
    deleteMember,
    getAllMembers,
    getMemberDetail,
    getMyDetail,
    patchMember,
    patchMemberPw,
    postBlockMember,
    deleteBlockMember,
} from "@api/member/api";
import { memberKeyFactory } from "@api/member/memberKeyFactory";

import {
    DeleteReqMember,
    GetReqAllMembers,
    GetReqMemberDetail,
    PatchReqMember,
    PostReqBlockMember,
    DeleteReqBlockMember,
    PatchReqMemberPw,
} from "@type/member/member.req.dto";
import {
    DeleteResMember,
    GetResAllMembers,
    GetResMemberDetail,
    PatchResMember,
    PatchResMemberPw,
    PostResBlockMember,
    DeleteResBlockMember,
} from "@type/member/member.res.dto";

// 유저 리스트 - 멤버 리스트 조회하기
export const useGetAllMembers = ({ page, stacks, posiions, blockedMemberId, nickname }: GetReqAllMembers) => {
    return useQuery<GetResAllMembers, AxiosError, GetResAllMembers>({
        queryKey: memberKeyFactory.all({ page, stacks, posiions, blockedMemberId, nickname }),
        queryFn: () => getAllMembers({ page, stacks, posiions, blockedMemberId, nickname }),
    });
};

// 유저 - 멤버 상세 조회하기
export const useGetMemberDetail = ({ memberId }: GetReqMemberDetail) => {
    return useQuery<GetResMemberDetail, AxiosError, GetResMemberDetail>({
        queryKey: memberKeyFactory.detail({ memberId }),
        queryFn: () => getMemberDetail({ memberId }),
        enabled: !!memberId,
    });
};

// 마이페이지 - 내 정보 상세 조회하기
export const useGetMyDetail = () => {
    return useQuery<GetResMemberDetail, AxiosError, GetResMemberDetail>({
        queryKey: memberKeyFactory.my(),
        queryFn: getMyDetail,
        enabled: !!localStorage.getItem("memberId"),
    });
};

// 마이페이지 - 비밀번호 수정
export const usePatchMemberPw = () => {
    return useMutation<PatchResMemberPw, AxiosError, PatchReqMemberPw>(patchMemberPw);
};

// 마이페이지 - 정보 수정하기
export const usePatchMember = () => {
    return useMutation<PatchResMember, AxiosError, PatchReqMember>(patchMember);
};

// 유저리스트 - 차단하기
export const usePostBlockMember = () => {
    return useMutation<PostResBlockMember, AxiosError, PostReqBlockMember>(postBlockMember);
};

// 마이페이지 - 차단 해제
export const useDeleteBlockMember = () => {
    return useMutation<DeleteResBlockMember, AxiosError, DeleteReqBlockMember>(deleteBlockMember);
};

// 헤더 - 로그아웃
export const useDeleteMember = () => {
    return useMutation<DeleteResMember, AxiosError, DeleteReqMember>(deleteMember);
};
