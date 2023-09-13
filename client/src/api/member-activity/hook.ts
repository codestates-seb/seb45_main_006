import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { PagingWithId, MemberId, PagingWithBoardLiked } from "@type/member-activity/member.req.dto";
import {
    GetResProjectOfMember,
    GetResStudyOfMember,
    GetResInfoOfMember,
    GetResQuestionOfMember,
    GetResMyLevel,
} from "@type/member-activity/member.res.dto";
import {
    getProjectOfMember,
    getStudyOfMember,
    getInfoOfMember,
    getQuestionOfMember,
    getMyLevel,
    getProjectLiked,
    getStudyLiked,
    getInfoLiked,
} from "./api";

// 유저의 프로젝트
export const useGetProjectOfMember = ({ page, memberId }: PagingWithId) => {
    return useQuery<GetResProjectOfMember, AxiosError, GetResProjectOfMember>({
        queryKey: ["member-activity", { isMine: true, board: "project", page, memberId }],
        queryFn: () => getProjectOfMember({ page, memberId }),
        enabled: !!memberId,
    });
};

// 유저의 스터디
export const useGetStudyOfMember = ({ page, memberId }: PagingWithId) => {
    return useQuery<GetResStudyOfMember, AxiosError, GetResStudyOfMember>({
        queryKey: ["member-activity", { isMine: true, board: "study", page, memberId }],
        queryFn: () => getStudyOfMember({ page, memberId }),
        enabled: !!memberId,
    });
};

// 유저의 자유게시글
export const useGetInfoOfMember = ({ page, memberId }: PagingWithId) => {
    return useQuery<GetResInfoOfMember, AxiosError, GetResInfoOfMember>({
        queryKey: ["member-activity", { isMine: true, board: "infoboard", page, memberId }],
        queryFn: () => getInfoOfMember({ page, memberId }),
        enabled: !!memberId,
    });
};

// 유저의 질문게시글
export const useGetQuestionOfMember = ({ page, memberId }: PagingWithId) => {
    return useQuery<GetResQuestionOfMember, AxiosError, GetResQuestionOfMember>({
        queryKey: ["member-activity", { isMine: true, board: "question", page, memberId }],
        queryFn: () => getQuestionOfMember({ page, memberId }),
        enabled: !!memberId,
    });
};

// TODO: API - 나의 레벨 조회
export const useGetMyLevel = ({ memberId }: MemberId) => {
    return useQuery<GetResMyLevel, AxiosError, GetResMyLevel>({
        queryKey: ["level", { isMine: true, memberId }],
        queryFn: () => getMyLevel({ memberId }),
        enabled: !!memberId,
    });
};

// TODO: 유저가 북마크/좋아요 한 프로젝트
export const useGetProjectLiked = ({ page, likedType }: PagingWithBoardLiked) => {
    return useQuery<GetResProjectOfMember, AxiosError, GetResProjectOfMember>({
        queryKey: ["member-activity", { likedType: likedType, board: "project", page }],
        queryFn: () => getProjectLiked({ page, likedType }),
    });
};

// TODO: 유저가 북마크/좋아요 한 스터디
export const useGetStudyLiked = ({ page, likedType }: PagingWithBoardLiked) => {
    return useQuery<GetResStudyOfMember, AxiosError, GetResStudyOfMember>({
        queryKey: ["member-activity", { likedType: likedType, board: "study", page }],
        queryFn: () => getStudyLiked({ page, likedType }),
    });
};

// TODO: 유저가 북마크/좋아요 한 자유 게시판
export const useGetInfoLiked = ({ page, likedType }: PagingWithBoardLiked) => {
    return useQuery<GetResInfoOfMember, AxiosError, GetResInfoOfMember>({
        queryKey: ["member-activity", { likedType: likedType, board: "info", page }],
        queryFn: () => getInfoLiked({ page, likedType }),
    });
};

// TODO: 유저가 북마크/좋아요 한 질문 게시판
export const useGetQuestionLiked = ({ page, likedType }: PagingWithBoardLiked) => {
    return useQuery<GetResQuestionOfMember, AxiosError, GetResQuestionOfMember>({
        queryKey: ["member-activity", { likedType: likedType, board: "question", page }],
        queryFn: () => getProjectLiked({ page, likedType }),
    });
};
