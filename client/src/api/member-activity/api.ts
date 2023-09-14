import { withAuthApi } from "@api/common/withAuthApi";
import { COMMON_API_PATH } from "@api/constant";
import { PagingWithId, MemberId, PagingWithBoardLiked } from "@type/member-activity/member.req.dto";

// 유저의 프로젝트
export const getProjectOfMember = async ({ page, memberId }: PagingWithId) => {
    const url = `${COMMON_API_PATH.PROJECT.PATH}/member/${memberId}?page=${page}`;
    const { data } = await withAuthApi.get(url);
    return data;
};

// 유저의 스터디
export const getStudyOfMember = async ({ page, memberId }: PagingWithId) => {
    const url = `${COMMON_API_PATH.STUDY.PATH}/member/${memberId}?page=${page}`;
    const { data } = await withAuthApi.get(url);
    return data;
};

// 유저의 자유게시글
export const getInfoOfMember = async ({ page, memberId }: PagingWithId) => {
    const url = `${COMMON_API_PATH.INFO.PATH}/member/${memberId}?page=${page}`;
    const { data } = await withAuthApi.get(url);
    return data;
};

// 유저의 질문게시글
export const getQuestionOfMember = async ({ page, memberId }: PagingWithId) => {
    const url = `${COMMON_API_PATH.QUESTION.PATH}/member/${memberId}?page=${page}`;
    const { data } = await withAuthApi.get(url);
    return data;
};

// TODO: API - 나의 레벨 조회
export const getMyLevel = async ({ memberId }: MemberId) => {
    const url = `/level/${memberId}`;
    const { data } = await withAuthApi.get(url);
    return data;
};

// TODO: API - 유저가 북마크/좋아요 한 프로젝트
export const getProjectLiked = async ({ likedType, page }: PagingWithBoardLiked) => {
    const url = `${COMMON_API_PATH.MEMBER.PATH}/${likedType}/project?page=${page}`;
    const { data } = await withAuthApi.get(url);
    return data;
};

// TODO: API - 유저가 북마크/좋아요 한 스터디
export const getStudyLiked = async ({ likedType, page }: PagingWithBoardLiked) => {
    const url = `${COMMON_API_PATH.MEMBER.PATH}/${likedType}/study?page=${page}`;
    const { data } = await withAuthApi.get(url);
    return data;
};

// TODO: API - 유저가 북마크/좋아요 한 자유 게시판
export const getInfoLiked = async ({ likedType, page }: PagingWithBoardLiked) => {
    const url = `${COMMON_API_PATH.MEMBER.PATH}/${likedType}/info?page=${page}`;
    const { data } = await withAuthApi.get(url);
    return data;
};

// TODO: API - 유저가 북마크/좋아요 한 질문 게시판
export const getQuestionLiked = async ({ likedType, page }: PagingWithBoardLiked) => {
    const url = `${COMMON_API_PATH.MEMBER.PATH}/${likedType}/question?page=${page}`;
    const { data } = await withAuthApi.get(url);
    return data;
};
