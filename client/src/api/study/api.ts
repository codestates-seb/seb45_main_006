import { commonApi } from "@api/common/commonApi";
import { withAuthApi } from "@api/common/withAuthApi";
import { COMMON_API_PATH } from "@api/constant";
import {
    DeleteReqStudy,
    GetReqAllStudies,
    GetReqDetailStudy,
    PatchReqStudy,
    PostReqStudy,
} from "@type/study/study.req.dto";

// 스터디 - 전체 조회하기
export const getAllStudies = async ({ page, size, stack }: GetReqAllStudies) => {
    let url = `/study/list?page=${page}&size=${size}`;
    if (stack) url += `&stacks=${stack}`;
    const { data } = await commonApi.get(url);
    return data;
};

// 스터디 - 상세 조회하기
export const getDetailStudy = async ({ boardId }: GetReqDetailStudy) => {
    const url = `${COMMON_API_PATH.STUDY.PATH}/${boardId}`;
    const { data } = await withAuthApi.get(url);
    return data;
};

// 스터디 - 정보 등록하기
export const postStudy = async (requstObj: PostReqStudy) => {
    const url = `${COMMON_API_PATH.STUDY.PATH}`;
    const { data } = await withAuthApi.post(url, requstObj);
    return data;
};

// 스터디 - 정보 수정하기
export const patchStudy = async ({ boardId, ...requstObj }: PatchReqStudy) => {
    const url = `${COMMON_API_PATH.STUDY.PATH}/${boardId}`;
    const { data } = await withAuthApi.patch(url, requstObj);
    return data;
};

// 스터디 - 정보 삭제하기
export const deleteStudy = async ({ boardId }: DeleteReqStudy) => {
    const url = `${COMMON_API_PATH.STUDY.PATH}/${boardId}`;
    const { data } = await withAuthApi.delete(url);
    return data;
};
