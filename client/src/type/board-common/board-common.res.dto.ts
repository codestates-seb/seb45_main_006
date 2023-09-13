import { InfoDefaultType } from "@type/info/info.res.dto";

// 정보/질문 게시판 좋아요 생성-삭제
export interface CommonResBody {}

// 정보/질문 게시판 HOT 게시글 조회
export type GetResHottestBoard = Array<InfoDefaultType>;
