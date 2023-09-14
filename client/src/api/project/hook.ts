import { AxiosError } from "axios";
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
    GetReqAllProjects,
    // GetReqAllProjects,
    GetReqDetailProject,
    PatchReqProject,
    PostReqProject,
} from "@type/project/project.req.dto";
import { projectKeyFactory } from "./projectKeyFactory";
import { deleteProject, getAllProjects, getDetailProject, patchProject, postProject } from "./api";

// 프로젝트 - 전체 조회하기
export const useGetAllProjects = ({ page, size, stack }: GetReqAllProjects) => {
    return useQuery<GetResAllProjects, AxiosError, GetResAllProjects>({
        queryKey: projectKeyFactory.all({ page, size, stack }),
        queryFn: () => getAllProjects({ page, size, stack }),
    });
};
// 프로젝트 - 상세 조회하기
export const useGetDetailProject = ({ boardId }: GetReqDetailProject) => {
    return useQuery<GetResDetailProject, AxiosError, GetResDetailProject>({
        queryKey: projectKeyFactory.detail({ boardId }),
        queryFn: () => getDetailProject({ boardId }),
        enabled: !!boardId,
    });
};
// 프로젝트 - 정보 등록하기
export const usePostProject = () => {
    return useMutation<PostResProject, AxiosError, PostReqProject>(postProject);
};
// 프로젝트 - 정보 수정하기
export const usePatchProject = () => {
    return useMutation<PatchResProject, AxiosError, PatchReqProject>(patchProject);
};
// 프로젝트 - 정보 삭제하기
export const useDeleteProject = () => {
    return useMutation<DeleteResProject, AxiosError, DeleteReqProject>(deleteProject);
};
