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
