import { AxiosError, AxiosResponse } from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";

import {
    GetReqAllQuestion,
    PostReqQuestion,
    PatchReqQuestion,
    DeleteReqQuestion,
    PostReqViewCount,
} from "@type/question/question.req.dto";
import {
    GetResAllQuestion,
    PostResQuestion,
    PatchResQuestion,
    DeleteResQuestion,
    PostResViewCount,
} from "@type/question/question.res.dto";

import { getAllQuestion, postQuestion, patchQuestion, deleteQuestion, postViewCount } from "./api";
import { questionKeyFactory } from "./questionKeyFactory";

// 질문 게시판 - 리스트 조회
export const useGetAllQuestion = ({ search }: GetReqAllQuestion) => {
    return useQuery<AxiosResponse<GetResAllQuestion>, AxiosError, GetResAllQuestion>({
        queryKey: questionKeyFactory.all({ search }),
        queryFn: () => getAllQuestion({ search }),
    });
};

// 질문 게시판 - 등록
export const usePostQuestion = () => {
    return useMutation<AxiosResponse<PostResQuestion>, AxiosError, PostReqQuestion>(postQuestion);
};

// 질문 게시판 - 수정 (본인이 작성한 글만 가능)
export const usePatchQuestion = () => {
    return useMutation<AxiosResponse<PatchResQuestion>, AxiosError, PatchReqQuestion>(patchQuestion);
};

// 질문 게시판 - 삭제 (본인이 작성한 글만 가능)
export const useDeleteQuestion = () => {
    return useMutation<AxiosResponse<DeleteResQuestion>, AxiosError, DeleteReqQuestion>(deleteQuestion);
};

// 질문 게시판 - 조회수 증가
export const usePostViewCount = () => {
    return useMutation<AxiosResponse<PostResViewCount>, AxiosError, PostReqViewCount>(postViewCount);
};
