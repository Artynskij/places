import { ISearchItemFront } from "./searchItem.front";

export interface ISearchQueryResponseFront {
    searchItems: ISearchItemFront[];
    info: {
        mode: string | null;
        usedLangs: string[] | null;
        proportions: {
            total: number;
            location: number;
            establishment: number;
            article: number;
        };
        found: {
            location: number;
            establishment: number;
            article: number;
        };
    };
}
