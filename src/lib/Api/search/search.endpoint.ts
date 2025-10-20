
import { ISearchQueryRequest, ISearchQueryResponse } from "@/lib/models";
import apiClient from "../base/ApiClient";

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
