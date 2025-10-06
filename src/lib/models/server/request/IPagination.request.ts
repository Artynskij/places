import { TLocale } from "../../types";

export interface IPaginationRequest {
    lang?: TLocale;
    ids?: string[];
    pagination?: {
        page: number;
        pageSize: number;
    };
}
