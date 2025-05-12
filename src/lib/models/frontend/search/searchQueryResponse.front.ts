import { ISearchItemFront } from "./searchItem.front";

export interface ISearchQueryResponseFront {
    searchItems: ISearchItemFront[];
    info: {
        mode: string | null;
        usedLangs: string[] | null;
        proportions: {
            total: number;
            location: number | null;
            establishment: number | null;
            article: number | null;
        };
        found: {
            location: number | null;
            establishment: number | null;
            article: number | null;
        };
    };
}
