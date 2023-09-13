import { AxiosError } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
    GetReqComment,
    PostReqComment,
    PatchReqComment,
    DeleteReqComment,
    PostReqCommentRe,
} from "@type/comment/comment.req.dto";
import {
    GetResComment,
    PostResComment,
    PatchResComment,
    DeleteResComment,
    PostResCommentRe,
} from "@type/comment/comment.res.dto";
import { postComment, postCommentRe, patchComment, deleteComment, getComment } from "./api";

// 게시판 - 댓글 리스트
export const useGetComment = ({ page, size, board, boardId }: GetReqComment) => {
    return useQuery<GetResComment, AxiosError, GetResComment>({
        queryKey: ["comments", { page, size, board, boardId }],
        queryFn: () => getComment({ page, size, board, boardId }),
        enabled: !!boardId,
    });
};

// 게시판 - 댓글 등록
export const usePostComment = () => {
    return useMutation<PostResComment, AxiosError, PostReqComment>(postComment);
};

// 게시판 - 댓글 수정
export const usePatchComment = () => {
    return useMutation<PatchResComment, AxiosError, PatchReqComment>(patchComment);
};

// 게시판 - 대댓글 등록
export const usePostCommentRe = () => {
    return useMutation<PostResCommentRe, AxiosError, PostReqCommentRe>(postCommentRe);
};

// 게시판 - 댓글 삭제
export const useDeleteComment = () => {
    return useMutation<DeleteResComment, AxiosError, DeleteReqComment>(deleteComment);
};
