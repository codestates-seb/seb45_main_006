import { commonApi } from "@api/common/commonApi";
import { withAuthApi } from "@api/common/withAuthApi";
import { CommonReqParams, GetReqHottestBoard } from "@type/board-common/board-common.req.dto";

// 정보/질문 게시판 HOT 게시글 조회
export const getHottestBoard = async ({ board }: GetReqHottestBoard) => {
    const url = `/${board}/hottest`;
    const { data } = await commonApi.get(url);
    return data;
};

// 정보/질문 게시판 좋아요 생성-삭제
export const postToggleLike = async ({ board, boardId }: CommonReqParams) => {
    const url = `/likes/${board}/${boardId}`;
    const { data } = await withAuthApi.post(url);
    return data;
};

// 프로젝트/스터디정보/질문 게시판 북마크 생성-삭제
export const postToggleBookmark = async ({ board, boardId }: CommonReqParams) => {
    const url = `/${board}/${boardId}/bookmark`;
    const { data } = await withAuthApi.post(url);
    return data;
};
