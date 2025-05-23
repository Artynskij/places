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
            console.error(`Ошибка при запросе по поиску query.`);
            return null;
        }
    }

    async getBlobProxy(): Promise<{ url: string } | null> {
        try {
            const response = await apiClient.get(`/blob-proxy/resolve`);
            return response.data;
        } catch (error) {
            console.error(
                `Ошибка при запросе по получению blob-proxy для картинок.`
            );
            return null;
        }
    }
}
