import { commonApi } from "@api/common/commonApi";
import { withAuthApi } from "@api/common/withAuthApi";
import { COMMON_API_PATH } from "@api/constant";
import {
    GetReqAllProjects,
    DeleteReqProject,
    GetReqDetailProject,
    PatchReqProject,
    PostReqProject,
} from "@type/project/project.req.dto";

// 프로젝트 - 전체 조회하기
export const getAllProjects = async ({ page, size, stack, title, status }: GetReqAllProjects) => {
    let addedPath = "";

    if (status === "PROJECT_POSTED") {
        addedPath = "/posted";
    }
    let url = `/project/list${addedPath}?page=${page}&size=${size}`;
    if (stack) url += `&stacks=${stack}`;
    if (title) url += `&title=${title}`;

    const { data } = await commonApi.get(url);
    return data;
};

// 프로젝트 - 상세 조회하기
export const getDetailProject = async ({ boardId }: GetReqDetailProject) => {
    const url = `${COMMON_API_PATH.PROJECT.PATH}/${boardId}`;
    const { data } = await withAuthApi.get(url);
    return data;
};

// 프로젝트 - 정보 등록하기
export const postProject = async (requstObj: PostReqProject) => {
    const url = `${COMMON_API_PATH.PROJECT.PATH}`;
    const { data } = await withAuthApi.post(url, requstObj);
    return data;
};

// 프로젝트 - 정보 수정하기
export const patchProject = async ({ boardId, ...requstObj }: PatchReqProject) => {
    const url = `${COMMON_API_PATH.PROJECT.PATH}/${boardId}`;
    const { data } = await withAuthApi.patch(url, requstObj);
    return data;
};

// 프로젝트 - 정보 삭제하기
export const deleteProject = async ({ boardId }: DeleteReqProject) => {
    const url = `${COMMON_API_PATH.PROJECT.PATH}/${boardId}`;
    const { data } = await withAuthApi.delete(url);
    return data;
};

// 프로젝트 - 모집 마감
export const patchCloseProject = async ({ boardId }: { boardId: number }) => {
    const url = `${COMMON_API_PATH.PROJECT.PATH}/${boardId}/close`;
    const { data } = await withAuthApi.patch(url);
    return data;
};
