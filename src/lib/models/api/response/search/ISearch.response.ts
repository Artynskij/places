import { ISearchItemEntity } from "../../entities/searchItem.entity";

export interface ISearchQueryResponse {
    hits: {
        locations: ISearchItemEntity[];
        establishments: ISearchItemEntity[];
        articles: ISearchItemEntity[];
    } | ISearchItemEntity[];
    total: number;
    _meta: {
        term: string;
        projTerm: string;
        usedLangs: string[] | null;
        mode?: string;
        proportions?: {
            location: number;
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
