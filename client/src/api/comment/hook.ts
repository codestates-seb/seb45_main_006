import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "@tanstack/react-query";

import { PostReqComment, PatchReqComment, DeleteReqComment, PostReqCommentRe } from "@type/comment/comment.req.dto";
import { PostResComment, PatchResComment, DeleteResComment, PostResCommentRe } from "@type/comment/comment.res.dto";
import { postComment, postCommentRe, patchComment, deleteComment } from "./api";

// 게시판 - 댓글 등록
export const usePostComment = () => {
    return useMutation<AxiosResponse<PostResComment>, AxiosError, PostReqComment>(postComment);
};

// 게시판 - 댓글 수정
export const usePatchComment = () => {
    return useMutation<AxiosResponse<PatchResComment>, AxiosError, PatchReqComment>(patchComment);
};

// 게시판 - 대댓글 등록
export const usePostCommentRe = () => {
    return useMutation<AxiosResponse<PostResCommentRe>, AxiosError, PostReqCommentRe>(postCommentRe);
};

// 게시판 - 댓글 삭제
export const useDeleteComment = () => {
    return useMutation<AxiosResponse<DeleteResComment>, AxiosError, DeleteReqComment>(deleteComment);
};
