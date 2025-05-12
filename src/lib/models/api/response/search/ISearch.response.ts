import { ISearchItemEntity } from "../../entities/searchItem.entity";

export interface ISearchQueryResponse {
    hits: ISearchItemEntity[];
    total: number;
    _meta: {
        term: string;
        usedLangs: string[] | null;
        mode?: string;
        proportions?: {
            location:number;
            object: number;
            article: number;
        };
        found?: {
            location: number;
            object: number;
            article: number;
        };
    };
}
