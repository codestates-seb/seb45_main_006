import { AxiosError, AxiosResponse } from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";

import { deleteMember, getAllMembers, getMemberDetail, patchMember, patchMemberPw } from "@api/member/api";
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
export const useGetAllMembers = ({ page, size }: GetReqAllMembers) => {
    return useQuery<GetResAllMembers, AxiosError, GetResAllMembers>({
        queryKey: memberKeyFactory.all({ page, size }),
        queryFn: () => getAllMembers({ page, size }),
    });
};

// 멤버 상세 조회하기
export const useGetMemberDetail = ({ memberId }: GetReqMemberDetail) => {
    return useQuery<GetResMemberDetail, AxiosError, GetResMemberDetail>({
        queryKey: memberKeyFactory.detail({ memberId }),
        queryFn: () => getMemberDetail({ memberId }),
    });
};

// 마이페이지 수정 - 멤버 수정하기
export const usePutMember = () => {
    return useMutation<AxiosResponse<PatchResMember>, AxiosError, PatchReqMember>(patchMember);
};

// 탈퇴 - 멤버 삭제하기
export const useDeleteTodos = () => {
    return useMutation<AxiosResponse<DeleteResMember>, AxiosError, DeleteReqMember>(deleteMember);
};

// 비밀번호 수정
export const usePatchMemberPw = () => {
    return useMutation<AxiosResponse<PatchResMemberPw>, AxiosError, PatchReqMember>(patchMemberPw);
};
