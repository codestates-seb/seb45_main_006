import { commonApi } from "@api/common/commonApi";
import { withAuthApi } from "@api/common/withAuthApi";
import { MAKE_API_PATH } from "@api/constant";
import {
    GetReqComment,
    PostReqComment,
    PatchReqComment,
    DeleteReqComment,
    PostReqCommentRe,
} from "@type/comment/comment.req.dto";

// 일반 게시판 - 댓글 리스트
export const getComment = async ({ board, boardId, page, size }: GetReqComment) => {
    const url = MAKE_API_PATH.COMMENT.list({ board, boardId, page, size });
    const { data } = await commonApi.get(url);
    return data;
};

// 게시판 - 댓글 등록
export const postComment = async ({ board, boardId, ...requstObj }: PostReqComment) => {
    const url = MAKE_API_PATH.COMMENT.add({ board, boardId });
    const { data } = await withAuthApi.post(url, requstObj);
    return data;
};

// 게시판 - 댓글 수정
export const patchComment = async ({ board, boardId, commentId, ...requstObj }: PatchReqComment) => {
    const url = MAKE_API_PATH.COMMENT.update({ board, boardId, commentId });
    const { data } = await withAuthApi.patch(url, requstObj);
    return data;
};

// 게시판 - 대댓글 등록
export const postCommentRe = async ({ board, boardId, commentId, ...requstObj }: PostReqCommentRe) => {
    const url = MAKE_API_PATH.COMMENT.addRe({ board, boardId, commentId });
    const { data } = await withAuthApi.post(url, requstObj);
    return data;
};

// 게시판 - 댓글 삭제
export const deleteComment = async ({ board, boardId, commentId }: DeleteReqComment) => {
    const url = MAKE_API_PATH.COMMENT.delete({ board, boardId, commentId });
    const { data } = await withAuthApi.delete(url);
    return data;
};
