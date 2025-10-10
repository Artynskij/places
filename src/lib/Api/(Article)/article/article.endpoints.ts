import { IArticleEntity, IArticleEntityWithContent } from "@/lib/models";

import {
    IArticleRequest,
    IArticleWithFilterRequest,
    IPaginationArticleRequest,
} from "@/lib/models/server/request/(article)/article.request";
import apiClient from "../../base/ApiClient";
import { getQueryParamsForApi } from "@/lib/helpers/get-query-params-for-api";

export default class ArticleApi {
    constructor() {}
    async getById(
        id: string,
        lang: string
    ): Promise<IArticleEntityWithContent | null> {
        try {
            const response = await apiClient.get(
                `/articles/${id}?lang=${lang}`
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении статьи с ID ${id}:`);
            return null;
        }
    }

    async getWithFilter(
        query: IArticleWithFilterRequest
    ): Promise<IArticleEntityWithContent[] | null> {
        try {
            const queryParams = getQueryParamsForApi(query);

            const response = await apiClient.get(
                `/articles${queryParams ? `?${queryParams}` : ""}`
            );
            return response.data;
        } catch (error) {
            console.error("Ошибка при получении статей с пагинацией:");
            return null;
        }
    }
    async create(body: IArticleRequest): Promise<IArticleEntity | null> {
        try {
            const response = await apiClient.post(`/articles`, body);
            return response.data;
        } catch (error) {
            console.error("Ошибка при получении статей с пагинацией:");
            return null;
        }
    }
    async update(
        id: string,
        body: IArticleRequest
    ): Promise<IArticleEntity | null> {
        try {
            const response = await apiClient.patch(`/articles/${id}`, body);
            return response.data;
        } catch (error) {
            console.error("Ошибка при получении статей с пагинацией:");
            return null;
        }
    }
}
