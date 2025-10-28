export interface IBaseModerationResponse {
    directSave: boolean;
    entityId: string;
}

export interface IBasePaginationResponse {
    total: number;
    pageSize: number;
    currentPage: number;
    totalLocations: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}
