import { withAuthApi } from "@api/common/withAuthApi";
import { COMMON_API_PATH } from "@api/constant";
import {
    GetReqProjectOfMember,
    GetReqStudyOfMember,
    GetReqInfoOfMember,
    GetReqQuestionOfMember,
} from "@type/member-activity/member.req.dto";

// 유저의 프로젝트
export const getProjectOfMember = async ({ page, memberId }: GetReqProjectOfMember) => {
    const url = `${COMMON_API_PATH.MEMBER.PATH}/${memberId}/project?page=${page}`;
    const { data } = await withAuthApi.get(url);
    return data;
};

// 유저의 스터디
export const getStudyOfMember = async ({ page, memberId }: GetReqStudyOfMember) => {
    const url = `${COMMON_API_PATH.MEMBER.PATH}/${memberId}/study?page=${page}`;
    const { data } = await withAuthApi.get(url);
    return data;
};

// 유저의 자유게시글
export const getInfoOfMember = async ({ page, memberId }: GetReqInfoOfMember) => {
    const url = `${COMMON_API_PATH.MEMBER.PATH}/${memberId}/infoBoard?page=${page}`;
    const { data } = await withAuthApi.get(url);
    return data;
};

// 유저의 질문게시글
export const getQuestionOfMember = async ({ page, memberId }: GetReqQuestionOfMember) => {
    const url = `${COMMON_API_PATH.MEMBER.PATH}/${memberId}/question?page=${page}`;
    const { data } = await withAuthApi.get(url);
    return data;
};
