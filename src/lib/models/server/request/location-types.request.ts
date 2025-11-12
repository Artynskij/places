import { IBaseRequest, IPaginationBaseRequest } from "../base";

export interface ILocationTypesRequest {
    source: {
        Name: string;
    };
    content: null;
}
export interface ILocationTypesGetAllRequest extends IPaginationBaseRequest {}
