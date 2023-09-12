import { commonApi } from "@api/common/commonApi";
import { withAuthApi } from "@api/common/withAuthApi";
import { COMMON_API_PATH } from "@api/constant";
import {
    GetReqAllQuestion,
    PostReqQuestion,
    PatchReqQuestion,
    DeleteReqQuestion,
    PostReqViewCount,
} from "@type/question/question.req.dto";

// 질문 게시판 - 리스트 조회
export const getAllQuestion = async ({ search, page, size }: GetReqAllQuestion) => {
    let url = `${COMMON_API_PATH.QUESTION.PATH}?page=${page}&size=${size}`;
    if (search) url += `&search=${search}`;

    const { data } = await commonApi.get(url);
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

// 질문 게시판 - 조회수 증가 - status code: 200
export const postViewCount = async ({ questionId }: PostReqViewCount) => {
    const url = `${COMMON_API_PATH.QUESTION.PATH}/${questionId}`;
    const { data } = await withAuthApi.post(url);
    return data;
};
