import { IBasePaginationResponse } from "../base";
import { ILocationWithContentPareEntity } from "../entities";

export interface ILocationPaginationResponse extends IBasePaginationResponse {
    data: ILocationWithContentPareEntity[];

    // total: number;
    // pageSize: number;
    // currentPage: number;
    // totalLocations: number;
    // totalPages: number;
    // hasNextPage: boolean;
    // hasPreviousPage: boolean;
}
