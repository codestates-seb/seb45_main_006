import { STUDY_STATUS_TYPE } from "@type/project/common";

export type GetReqAllStudies = {
    page: number;
    size: number;
    stack?: string;
    status: STUDY_STATUS_TYPE;
    title?: string;
};

export type GetReqDetailStudy = {
    boardId: number;
};

export type PostReqStudy = {
    title: string;
    content: string;
    stack: Array<string>;
    recruitNum: number;
};

export type PatchReqStudy = {
    boardId: number;
    title: string;
    content: string;
    stack: Array<string>;
    recruitNum: number;
    // projectStatus: STUDY_STATUS_TYPE;
};

export type DeleteReqStudy = {
    boardId: number;
};
