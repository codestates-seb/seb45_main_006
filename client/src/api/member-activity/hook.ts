import { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import {
    GetReqProjectOfMember,
    GetReqStudyOfMember,
    GetReqInfoOfMember,
    GetReqQuestionOfMember,
} from "@type/member-activity/member.req.dto";
import {
    GetResProjectOfMember,
    GetResStudyOfMember,
    GetResInfoOfMember,
    GetResQuestionOfMember,
} from "@type/member-activity/member.res.dto";
import { getProjectOfMember, getStudyOfMember, getInfoOfMember, getQuestionOfMember } from "./api";

// 유저의 프로젝트
export const useGetProjectOfMember = ({ page, memberId }: GetReqProjectOfMember) => {
    return useQuery<AxiosResponse<GetResProjectOfMember>, AxiosError, GetResProjectOfMember>({
        queryKey: ["member-activity", { board: "project", page, memberId }],
        queryFn: () => getProjectOfMember({ page, memberId }),
        enabled: !!memberId,
    });
};

// 유저의 스터디
export const useGetStudyOfMember = ({ page, memberId }: GetReqStudyOfMember) => {
    return useQuery<AxiosResponse<GetResStudyOfMember>, AxiosError, GetResStudyOfMember>({
        queryKey: ["member-activity", { board: "study", page, memberId }],
        queryFn: () => getStudyOfMember({ page, memberId }),
        enabled: !!memberId,
    });
};

// 유저의 자유게시글
export const useGetInfoOfMember = ({ page, memberId }: GetReqInfoOfMember) => {
    return useQuery<AxiosResponse<GetResInfoOfMember>, AxiosError, GetResInfoOfMember>({
        queryKey: ["member-activity", { board: "infoboard", page, memberId }],
        queryFn: () => getInfoOfMember({ page, memberId }),
        enabled: !!memberId,
    });
};

// 유저의 질문게시글
export const useGetQuestionOfMember = ({ page, memberId }: GetReqQuestionOfMember) => {
    return useQuery<AxiosResponse<GetResQuestionOfMember>, AxiosError, GetResQuestionOfMember>({
        queryKey: ["member-activity", { board: "question", page, memberId }],
        queryFn: () => getQuestionOfMember({ page, memberId }),
        enabled: !!memberId,
    });
};
