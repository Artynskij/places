export interface ILocationInsidePaginationRequest {
    pagination: {
        page: number;
        pageSize: number;
    };
    lang: string;
    locationId: string;
}
