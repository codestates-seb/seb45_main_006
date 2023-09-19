import { AxiosError } from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";

import { GetReqAllInfo, PostReqInfo, PatchReqInfo, DeleteReqInfo, PostReqViewCount } from "@type/info/info.req.dto";
import {
    GetResAllInfo,
    PostResInfo,
    PatchResInfo,
    DeleteResInfo,
    PostResViewCount,
    InfoDefaultType,
} from "@type/info/info.res.dto";

import { getAllInfo, postInfo, patchInfo, deleteInfo, postViewCount, getDetailInfo } from "./api";
import { infoKeyFactory } from "./infoKeyFactory";

// 정보 게시판 - 리스트 조회
export const useGetAllInfo = ({ category, search, page, size }: GetReqAllInfo) => {
    return useQuery<GetResAllInfo, AxiosError, GetResAllInfo>({
        queryKey: infoKeyFactory.all({ category, search, page, size }),
        queryFn: () => getAllInfo({ category, search, page, size }),
    });
};

export const useGetDetailQuestion = ({ boardId }: { boardId: number }) => {
    return useQuery<InfoDefaultType, AxiosError, InfoDefaultType>({
        queryKey: infoKeyFactory.detail({ boardId }),
        queryFn: () => getDetailInfo({ boardId }),
        enabled: !!boardId,
    });
};

// 정보 게시판 - 등록
export const usePostInfo = () => {
    return useMutation<PostResInfo, AxiosError, PostReqInfo>(postInfo);
};

// 정보 게시판 - 수정 (본인이 작성한 글만 가능)
export const usePatchInfo = () => {
    return useMutation<PatchResInfo, AxiosError, PatchReqInfo>(patchInfo);
};

// 정보 게시판 - 삭제 (본인이 작성한 글만 가능)
export const useDeleteInfo = () => {
    return useMutation<DeleteResInfo, AxiosError, DeleteReqInfo>(deleteInfo);
};

// 정보 게시판 - 조회수 증가
export const usePostViewCount = () => {
    return useMutation<PostResViewCount, AxiosError, PostReqViewCount>(postViewCount);
};
