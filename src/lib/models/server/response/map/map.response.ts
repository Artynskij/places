import { ISearchItemFront } from "@/lib/models/frontend/search.front";

export interface IMapItemsSortedResponse {
    accommodation: ISearchItemFront[];
    eater: ISearchItemFront[];
    attraction: ISearchItemFront[];
}
