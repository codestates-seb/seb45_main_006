import { AxiosError, AxiosResponse } from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";

import { deleteMember, getAllMembers, getMemberDetail, getMyDetail, patchMember, patchMemberPw } from "@api/member/api";
import { memberKeyFactory } from "@api/member/memberKeyFactory";

import { DeleteReqMember, GetReqAllMembers, GetReqMemberDetail, PatchReqMember } from "@type/member/member.req.dto";
import {
    DeleteResMember,
    GetResAllMembers,
    GetResMemberDetail,
    PatchResMember,
    PatchResMemberPw,
} from "@type/member/member.res.dto";

// 유저 리스트 - 멤버 리스트 조회하기
export const useGetAllMembers = ({ page, stacks, posiions }: GetReqAllMembers) => {
    return useQuery<GetResAllMembers, AxiosError, GetResAllMembers>({
        queryKey: memberKeyFactory.all({ page, stacks, posiions }),
        queryFn: () => getAllMembers({ page, stacks, posiions }),
    });
};

// 유저 리스트 - 멤버 상세 조회하기
export const useGetMemberDetail = ({ memberId }: GetReqMemberDetail) => {
    return useQuery<AxiosResponse<GetResMemberDetail>, AxiosError, GetResMemberDetail>({
        queryKey: memberKeyFactory.detail({ memberId }),
        queryFn: () => getMemberDetail({ memberId }),
    });
};

// 마이페이지 - 내 정보 상세 조회하기
export const useGetMyDetail = () => {
    return useQuery<AxiosResponse<GetResMemberDetail>, AxiosError, GetResMemberDetail>({
        queryKey: memberKeyFactory.my(),
        queryFn: getMyDetail,
    });
};

// 마이페이지 - 비밀번호 수정
export const usePatchMemberPw = () => {
    return useMutation<AxiosResponse<PatchResMemberPw>, AxiosError, PatchReqMember>(patchMemberPw);
};

// 마이페이지 - 정보 수정하기
export const usePutMember = () => {
    return useMutation<AxiosResponse<PatchResMember>, AxiosError, PatchReqMember>(patchMember);
};

// 헤더 - 로그아웃
export const useDeleteTodos = () => {
    return useMutation<AxiosResponse<DeleteResMember>, AxiosError, DeleteReqMember>(deleteMember);
};
