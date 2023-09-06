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
    content: string | JSX.Element;
    isConfirm: boolean;
    callback?: () => void;
}
