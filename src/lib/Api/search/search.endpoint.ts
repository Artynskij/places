import { ISearchQueryRequest } from "@/lib/models/api/request/search/ISearchQuery.request";
import apiClient from "../ApiClient";
import { ISearchQueryResponse } from "@/lib/models/api/response/search/ISearch.response";

export class SearchApi {
    constructor() {}
    async querySearch(
        body: ISearchQueryRequest
    ): Promise<ISearchQueryResponse | null> {
        try {
            console.log(body);

            const response = await apiClient.post(`/search/query`, body);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при запросе по поиску query.`);
            return null;
        }
    }
}
