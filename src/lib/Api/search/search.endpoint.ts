import { ISearchQueryRequest } from "@/lib/models/api/request/search/ISearchQuery.request";
import apiClientSearch from "../ApiClientSearch";
import { ISearchQueryResponse } from "@/lib/models/api/response/search/ISearch.response";
import apiClient from "../ApiClient";

export class SearchApi {
    constructor() {}
    async querySearch(
        body: ISearchQueryRequest
    ): Promise<ISearchQueryResponse | null> {
        try {
            body.indexKey = body.indexKey === "all" ? "" : body.indexKey;
            console.log(body);

            const response = await apiClientSearch.post(`/search/query`, body);
            console.log(response);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при запросе по поиску query.`);
            return null;
        }
    }
}
