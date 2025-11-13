import { IBasePaginationResponse } from "../base";
import { IBusinessWithContentPareEntity } from "../entities";

export interface IBusinessPaginationResponse extends IBasePaginationResponse {
    data: IBusinessWithContentPareEntity[];
}
