import { ReactNode } from "react";

export type PaginationParams = {
    limit: number;
    skip: number;
};

export type PageInfo = {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
};

export interface IToast {
    id?: string;
    content: string | ReactNode;
    isConfirm: boolean;
    callback?: () => void;
    isWarning?: boolean;
}
