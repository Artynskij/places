import { ISearchQueryRequest } from "@/lib/models/api/request/search/ISearchQuery.request";
import apiClientSearch from "../ApiClientSearch";
import { ISearchQueryResponse } from "@/lib/models/api/response/search/ISearch.response";

export class SearchApi {
    constructor() {}
    async querySearch(
        body: ISearchQueryRequest
    ): Promise<ISearchQueryResponse | null> {
        try {
            console.log(body);

            const response = await apiClientSearch.post(`/search/query`, body);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при запросе по поиску query.`);
            return null;
        }
    }
}
