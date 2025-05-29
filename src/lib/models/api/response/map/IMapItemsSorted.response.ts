import { ISearchItemFront } from "@/lib/models/frontend/search/searchItem.front";

export interface IMapItemsSortedResponse {
    accommodation: ISearchItemFront[];
    eater: ISearchItemFront[];
    attraction: ISearchItemFront[];
}
