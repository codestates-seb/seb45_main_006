import { AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
    PostReqAnswer,
    PatchReqAnswer,
    DeleteReqAnswer,
    PostReqAnswerAccept,
    PostReqAnswerComment,
    PatchReqAnswerComment,
    DeleteReqAnswerComment,
    PostReqAnswerCommentRe,
    GetReqAnswer,
} from "@type/answer/answer.req.dto";
import {
    PostResAnswer,
    PatchResAnswer,
    DeleteResAnswer,
    PostResAnswerAccept,
    PostResAnswerComment,
    PatchResAnswerComment,
    DeleteResAnswerComment,
    PostResAnswerCommentRe,
    GetResAnswer,
} from "@type/answer/answer.res.dto";
import {
    postAnswer,
    patchAnswer,
    deleteAnswer,
    postAnswerAccept,
    postAnswerComment,
    patchAnswerComment,
    postAnswerCommentRe,
    deleteAnswerComment,
    getAnswer,
} from "@api/answer/api";

// 질문 게시판 - 답변 리스트
export const useGetAnswer = ({ page, size, questionId }: GetReqAnswer) => {
    return useQuery<GetResAnswer, AxiosError, GetResAnswer>({
        queryKey: ["answers", { page, size }],
        queryFn: () => getAnswer({ page, size, questionId }),
    });
};

// 질문 게시판 - 답변 등록
export const usePostAnswer = () => {
    return useMutation<PostResAnswer, AxiosError, PostReqAnswer>(postAnswer);
};

// 질문 게시판 - 답변 수정
export const usePatchAnswer = () => {
    return useMutation<PatchResAnswer, AxiosError, PatchReqAnswer>(patchAnswer);
};

// 질문 게시판 - 답변 삭제
export const useDeleteAnswer = () => {
    return useMutation<DeleteResAnswer, AxiosError, DeleteReqAnswer>(deleteAnswer);
};

// 질문 게시판 - 답변 채택
export const usePostAnswerAccept = () => {
    return useMutation<PostResAnswerAccept, AxiosError, PostReqAnswerAccept>(postAnswerAccept);
};

// 질문 게시판 - 댓글 생성
export const usePostAnswerComment = () => {
    return useMutation<PostResAnswerComment, AxiosError, PostReqAnswerComment>(postAnswerComment);
};

// 질문 게시판 - 댓글 수정
export const usePatchAnswerComment = () => {
    return useMutation<PatchResAnswerComment, AxiosError, PatchReqAnswerComment>(patchAnswerComment);
};

// 질문 게시판 - 대댓글 생성
export const usePostAnswerCommentRe = () => {
    return useMutation<PostResAnswerCommentRe, AxiosError, PostReqAnswerCommentRe>(postAnswerCommentRe);
};

// 질문 게시판 - 댓글 삭제
export const useDeleteAnswerComment = () => {
    return useMutation<DeleteResAnswerComment, AxiosError, DeleteReqAnswerComment>(deleteAnswerComment);
};
