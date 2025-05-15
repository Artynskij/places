import { ISearchQueryRequest } from "@/lib/models/api/request/search/ISearchQuery.request";

import { ISearchQueryResponse } from "@/lib/models/api/response/search/ISearch.response";
import apiClient from "../ApiClient";
import apiClientSearch from "../ApiClientSearch";

export class SearchApi {
    constructor() {}
    async querySearch(
        body: ISearchQueryRequest
    ): Promise<ISearchQueryResponse | null> {
        try {
            body.indexKey = body.indexKey === "all" ? "" : body.indexKey;
            const response = await apiClientSearch.post(`/search/query`, body);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при запросе по поиску query.`);
            return null;
        }
    }
}
