import { PROEJCT_STATUS_TYPE } from "./common";

export type GetReqAllProjects = {
    page: number;
    size: number;
    stack?: string;
    status: PROEJCT_STATUS_TYPE;
    title?: string;
};

export type GetReqDetailProject = {
    boardId: number;
};

export type PostReqProject = {
    title: string;
    content: string;
    stack: string[];
    startDate: string;
    deadline: string;
    recruitNum: number;
};

export type PatchReqProject = {
    boardId: number;
    title: string;
    content: string;
    stack: string[];
    startDate: string;
    deadline: string;
    recruitNum: number;
    // recruitStatus: PROEJCT_STATUS_TYPE;
};

export type DeleteReqProject = {
    boardId: number;
};
