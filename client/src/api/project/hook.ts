import { AxiosError, AxiosResponse } from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
    DeleteResProject,
    GetResAllProjects,
    GetResDetailProject,
    PatchResProject,
    PostResProject,
} from "@type/project/project.res.dto";
import {
    DeleteReqProject,
    // GetReqAllProjects,
    GetReqDetailProject,
    PatchReqProject,
    PostReqProject,
} from "@type/project/project.req.dto";
import { projectKeyFactory } from "./projectKeyFactory";
import { deleteProject, getAllProjects, getDetailProject, patchProject, postProject } from "./api";

// 프로젝트 - 전체 조회하기
export const useGetAllProjects = () => {
    return useQuery<AxiosResponse<GetResAllProjects>, AxiosError, GetResAllProjects>({
        queryKey: projectKeyFactory.all(),
        queryFn: () => getAllProjects(),
    });
};
// 프로젝트 - 상세 조회하기
export const useGetDetailProject = ({ boardId }: GetReqDetailProject) => {
    return useQuery<AxiosResponse<GetResDetailProject>, AxiosError, GetResDetailProject>({
        queryKey: projectKeyFactory.detail({ boardId }),
        queryFn: () => getDetailProject({ boardId }),
    });
};
// 프로젝트 - 정보 등록하기
export const usePostProject = () => {
    return useMutation<AxiosResponse<PostResProject>, AxiosError, PostReqProject>(postProject);
};
// 프로젝트 - 정보 수정하기
export const usePatchProject = () => {
    return useMutation<AxiosResponse<PatchResProject>, AxiosError, PatchReqProject>(patchProject);
};
// 프로젝트 - 정보 삭제하기
export const useDeleteProject = () => {
    return useMutation<AxiosResponse<DeleteResProject>, AxiosError, DeleteReqProject>(deleteProject);
};
