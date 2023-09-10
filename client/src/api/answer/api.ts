import { withAuthApi } from "@api/common/withAuthApi";
import { MAKE_API_PATH } from "@api/constant";
import {
    PostReqAnswer,
    PatchReqAnswer,
    DeleteReqAnswer,
    PostReqAnswerAccept,
    PostReqAnswerComment,
    PatchReqAnswerComment,
    DeleteReqAnswerComment,
    PostReqAnswerCommentRe,
} from "@type/answer/answer.req.dto";

// 질문 게시판 - 답변 등록
export const postAnswer = async ({ questionId, ...requstObj }: PostReqAnswer) => {
    const url = MAKE_API_PATH.ANSWER.add({ questionId });
    const { data } = await withAuthApi.post(url, requstObj);
    return data;
};

// 질문 게시판 - 답변 수정
export const patchAnswer = async ({ questionId, answerId, ...requstObj }: PatchReqAnswer) => {
    const url = MAKE_API_PATH.ANSWER.update({ questionId, answerId });
    const { data } = await withAuthApi.patch(url, requstObj);
    return data;
};

// 질문 게시판 - 답변 삭제
export const deleteAnswer = async ({ questionId, answerId }: DeleteReqAnswer) => {
    const url = MAKE_API_PATH.ANSWER.delete({ questionId, answerId });
    const { data } = await withAuthApi.delete(url);
    return data;
};

// 질문 게시판 - 답변 채택
export const postAnswerAccept = async ({ questionId, answerId }: PostReqAnswerAccept) => {
    const url = MAKE_API_PATH.ANSWER.accept({ questionId, answerId });
    const { data } = await withAuthApi.post(url);
    return data;
};

// 질문 게시판 - 댓글 생성
export const postAnswerComment = async ({ questionId, answerId, ...requestObj }: PostReqAnswerComment) => {
    const url = MAKE_API_PATH.ANSWER.addComment({ questionId, answerId });
    const { data } = await withAuthApi.post(url, requestObj);
    return data;
};

// 질문 게시판 - 댓글 수정
export const patchAnswerComment = async ({ questionId, answerId, commentId, ...requestObj }: PatchReqAnswerComment) => {
    const url = MAKE_API_PATH.ANSWER.updateComment({ questionId, answerId, commentId });
    const { data } = await withAuthApi.patch(url, requestObj);
    return data;
};

// 질문 게시판 - 대댓글 생성
export const postAnswerCommentRe = async ({
    questionId,
    answerId,
    commentId,
    ...requestObj
}: PostReqAnswerCommentRe) => {
    const url = MAKE_API_PATH.ANSWER.addCommentRe({ questionId, answerId, commentId });
    const { data } = await withAuthApi.post(url, requestObj);
    return data;
};

// 질문 게시판 - 댓글 삭제
export const deleteAnswerComment = async ({ questionId, answerId, commentId }: DeleteReqAnswerComment) => {
    const url = MAKE_API_PATH.ANSWER.deleteComment({ questionId, answerId, commentId });
    const { data } = await withAuthApi.delete(url);
    return data;
};
