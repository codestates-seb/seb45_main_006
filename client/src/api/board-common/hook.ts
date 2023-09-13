import { AxiosError } from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";

import { CommonReqParams, GetReqHottestBoard } from "@type/board-common/board-common.req.dto";
import { GetResHottestBoard, CommonResBody } from "@type/board-common/board-common.res.dto";
import { getHottestBoard, postToggleLike, postToggleBookmark } from "./api";
import dayjs from "dayjs";

// 정보/질문 게시판 HOT 게시글 조회
export const useGetHottestBoard = ({ board }: GetReqHottestBoard) => {
    return useQuery<GetResHottestBoard, AxiosError, GetResHottestBoard>({
        queryKey: ["hottest", { board, date: dayjs().format("YYYY-MM-DD") }],
        queryFn: () => getHottestBoard({ board }),
    });
};

// 정보/질문 게시판 좋아요 생성-삭제
export const usePostToggleLike = () => {
    return useMutation<CommonResBody, AxiosError, CommonReqParams>(postToggleLike);
};

// 프로젝트/스터디정보/질문 게시판 북마크 생성-삭제
export const usePostToggleBookmark = () => {
    return useMutation<CommonResBody, AxiosError, CommonReqParams>(postToggleBookmark);
};
