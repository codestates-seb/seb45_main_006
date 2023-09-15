import { AxiosError } from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
    DeleteResStudy,
    GetResAllStudies,
    GetResDetailStudy,
    PatchResStudy,
    PostResStudy,
} from "@type/study/study.res.dto";
import {
    DeleteReqStudy,
    GetReqAllStudies,
    GetReqDetailStudy,
    PatchReqStudy,
    PostReqStudy,
} from "@type/study/study.req.dto";
import { studyKeyFactory } from "./studyKeyFactory";
import { deleteStudy, getAllStudies, getDetailStudy, patchStudy, postStudy } from "./api";

// 스터디 - 전체 조회하기
export const useGetAllStudies = ({ page, size, stack, title, status }: GetReqAllStudies) => {
    return useQuery<GetResAllStudies, AxiosError, GetResAllStudies>({
        queryKey: studyKeyFactory.all({ page, size, stack, title, status }),
        queryFn: () => getAllStudies({ page, size, stack, title, status }),
    });
};
// 스터디 - 상세 조회하기
export const useGetDetailStudy = ({ boardId }: GetReqDetailStudy) => {
    return useQuery<GetResDetailStudy, AxiosError, GetResDetailStudy>({
        queryKey: studyKeyFactory.detail({ boardId }),
        queryFn: () => getDetailStudy({ boardId }),
        enabled: !!boardId,
    });
};
// 스터디 - 정보 등록하기
export const usePostStudy = () => {
    return useMutation<PostResStudy, AxiosError, PostReqStudy>(postStudy);
};
// 스터디 - 정보 수정하기
export const usePatchStudy = () => {
    return useMutation<PatchResStudy, AxiosError, PatchReqStudy>(patchStudy);
};
// 스터디 - 정보 삭제하기
export const useDeleteStudy = () => {
    return useMutation<DeleteResStudy, AxiosError, DeleteReqStudy>(deleteStudy);
};
