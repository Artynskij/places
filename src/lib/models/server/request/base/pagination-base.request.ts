import { TLocale } from "../../../types";

export interface IPaginationBaseRequest {
    lang?: TLocale;
    ids?: string[];
    pagination?: {
        page: number;
        pageSize: number;
    };
}
