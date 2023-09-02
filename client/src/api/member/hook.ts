import { AxiosError } from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";

import { deleteMember, getAllMembers, getMemberDetail, patchMember } from "@api/member/api";
import { memberKeyFactory } from "@api/member/memberKeyFactory";

import { DeleteReqMember, GetReqAllMembers, GetReqMemberDetail, PatchReqMember } from "@type/member/member.req.dto";
import { DeleteResMember, GetResAllMembers, GetResMemberDetail, PatchResMember } from "@type/member/member.res.dto";

// 유저 리스트 - 멤버 리스트 조회하기
export const useGetAllMembers = ({ page, size }: GetReqAllMembers) => {
    return useQuery<GetResAllMembers, AxiosError, GetResAllMembers>({
        queryKey: memberKeyFactory.all({ page, size }),
        queryFn: () => getAllMembers({ page, size }),
    });
};

// 멤버 상세 조회하기
export const useGetMemberDetail = ({ userId }: GetReqMemberDetail) => {
    return useQuery<GetResMemberDetail, AxiosError, GetResMemberDetail>({
        queryKey: memberKeyFactory.detail({ userId }),
        queryFn: () => getMemberDetail({ userId }),
    });
};

// 마이페이지 수정 - 멤버 수정하기
export const usePutMember = ({
    userId,
    nickname,
    profilePicture,
    githubId,
    introduction,
    listEnroll,
    position,
    stack,
}: PatchReqMember) => {
    return useMutation<PatchResMember, AxiosError>({
        mutationFn: () =>
            patchMember({
                userId,
                nickname,
                profilePicture,
                githubId,
                introduction,
                listEnroll,
                position,
                stack,
            }),
    });
};

// 탈퇴 - 멤버 삭제하기
export const useDeleteTodos = ({ userId }: DeleteReqMember) => {
    const navigate = useNavigate();
    return useMutation<DeleteResMember, AxiosError>({
        mutationFn: () => deleteMember({ userId }),
        onSuccess: () => {
            alert("탈퇴 처리 되었습니다.");
            navigate("/");
        },
    });
};
