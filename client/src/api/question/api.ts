import { withAuthApi } from "@api/common/withAuthApi";
import { COMMON_API_PATH } from "@api/constant";
import {
    GetReqAllQuestion,
    PostReqQuestion,
    PatchReqQuestion,
    DeleteReqQuestion,
} from "@type/question/question.req.dto";

// 질문 게시판 - 리스트 조회
export const getAllQuestion = async ({ search }: GetReqAllQuestion) => {
    let url = `${COMMON_API_PATH.QUESTION.PATH}`;
    if (search) url += `?search=${search}`;

    const { data } = await withAuthApi.get(url);
    return data;
};

// 질문 게시판 - 등록
export const postQuestion = async (requstObj: PostReqQuestion) => {
    const url = `${COMMON_API_PATH.QUESTION.PATH}`;
    const { data } = await withAuthApi.post(url, requstObj);
    return data;
};

// 질문 게시판 - 수정 (본인이 작성한 글만 가능)
export const patchQuestion = async ({ questionId, ...requstObj }: PatchReqQuestion) => {
    const url = `${COMMON_API_PATH.QUESTION.PATH}/${questionId}`;
    const { data } = await withAuthApi.patch(url, requstObj);
    return data;
};

// 질문 게시판 - 삭제 (본인이 작성한 글만 가능)
export const deleteQuestion = async ({ questionId }: DeleteReqQuestion) => {
    const url = `${COMMON_API_PATH.QUESTION.PATH}/${questionId}`;
    const { data } = await withAuthApi.delete(url);
    return data;
};
