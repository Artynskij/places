import { ISearchQueryRequest } from "@/lib/models/api/request/search/search.request";

import { ISearchQueryResponse } from "@/lib/models/api/response/search/search.response";
import apiClient from "../ApiClient";
import apiClientSearch from "../ApiClientSearch";

export class SearchApi {
    constructor() {}
    async querySearch(
        body: ISearchQueryRequest
    ): Promise<ISearchQueryResponse | null> {
        try {
            const indexKey =
                body.indexKey === "all"
                    ? ""
                    : body.indexKey.toLocaleUpperCase();

            const response = await apiClient.post(`/search/query`, {
                ...body,
                indexKey,
            });

            return response.data;
        } catch (error) {
            console.log(error);

            console.error(`Ошибка при запросе по поиску queryEndpoind.`);
            return null;
        }
    }
}
