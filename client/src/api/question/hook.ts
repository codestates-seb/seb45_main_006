import { AxiosError } from "axios";
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
    QuestionDefaultType,
} from "@type/question/question.res.dto";

import { getAllQuestion, postQuestion, patchQuestion, deleteQuestion, postViewCount, getDetailQuestion } from "./api";
import { questionKeyFactory } from "./questionKeyFactory";

// 질문 게시판 - 리스트 조회
export const useGetAllQuestion = ({ page, size, search }: GetReqAllQuestion) => {
    return useQuery<GetResAllQuestion, AxiosError, GetResAllQuestion>({
        queryKey: questionKeyFactory.all({ page, size, search }),
        queryFn: () => getAllQuestion({ page, size, search }),
    });
};

export const useGetDetailQuestion = ({ boardId }: { boardId: number }) => {
    return useQuery<QuestionDefaultType, AxiosError, QuestionDefaultType>({
        queryKey: questionKeyFactory.detail({ boardId }),
        queryFn: () => getDetailQuestion({ boardId }),
        enabled: !!boardId,
    });
};

// 질문 게시판 - 등록
export const usePostQuestion = () => {
    return useMutation<PostResQuestion, AxiosError, PostReqQuestion>(postQuestion);
};

// 질문 게시판 - 수정 (본인이 작성한 글만 가능)
export const usePatchQuestion = () => {
    return useMutation<PatchResQuestion, AxiosError, PatchReqQuestion>(patchQuestion);
};

// 질문 게시판 - 삭제 (본인이 작성한 글만 가능)
export const useDeleteQuestion = () => {
    return useMutation<DeleteResQuestion, AxiosError, DeleteReqQuestion>(deleteQuestion);
};

// 질문 게시판 - 조회수 증가
export const usePostViewCount = () => {
    return useMutation<PostResViewCount, AxiosError, PostReqViewCount>(postViewCount);
};
