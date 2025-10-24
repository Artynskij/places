import {
    IArticleEntity,
    IArticleEntityWithPareContent,
    IArticleTypeWithContentPareEntity,
    IArticleTypeFront,
} from "@/lib/models";

import {
    IArticleRequest,
    IArticleUpdateStatusRequest,
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
    ): Promise<IArticleEntityWithPareContent | null> {
        try {
            const response = await apiClient.get(
                `/articles/${id}?lang=${lang}`
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении статьи с ID ${id}:`, error);
            return null;
        }
    }

    async getWithFilter(
        query: IArticleWithFilterRequest
    ): Promise<IArticleEntityWithPareContent[] | null> {
        try {
            const queryParams = getQueryParamsForApi(query);

            const response = await apiClient.get(
                `/articles${queryParams ? `?${queryParams}` : ""}`
            );
            return response.data;
        } catch (error) {
            console.error("Ошибка при получении статей по фильтрам", error);
            return null;
        }
    }
    async create(body: IArticleRequest): Promise<IArticleEntity | null> {
        try {
            const response = await apiClient.post(`/articles`, body);
            return response.data;
        } catch (error) {
            console.error("Ошибка при создании статьи", error);
            return null;
        }
    }
    async update(
        id: string,
        body: Partial<IArticleRequest>
    ): Promise<IArticleEntity | null> {
        try {
            const response = await apiClient.patch(`/articles/${id}`, body);
            return response.data;
        } catch (error) {
            console.error("Ошибка при обновлении статьи", error);
            return null;
        }
    }

    async delete(id: string): Promise<Boolean | null> {
        try {
            const response = await apiClient.delete(`/articles/${id}`);
            return response.data;
        } catch (error) {
            console.error("Ошибка при удалении статьи", error);
            return null;
        }
    }

    async getPopular(
        limit: number
    ): Promise<IArticleEntityWithPareContent[] | null> {
        try {
            const response = await apiClient.get(
                `/articles/popular?limit=${limit}`
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении статьи по статус`, error);
            return null;
        }
    }
    // работа с статусом
    async getByStatus(
        id: string
    ): Promise<IArticleEntityWithPareContent[] | null> {
        try {
            const response = await apiClient.get(`/articles/by-status/${id}`);
            return response.data;
        } catch (error) {
            console.error("Ошибка при получении статей по статусу");
            return null;
        }
    }
    async updateStatus(body: IArticleUpdateStatusRequest): Promise<any | null> {
        try {
            const response = await apiClient.patch(
                `articles/bulk-update-status`,
                body
            );
            return response.data;
        } catch (error) {
            console.error("Ошибка при обновлении статуса");
            return null;
        }
    }

    // работа с категориями
    async getAllCategory(
        articleId: string
    ): Promise<IArticleTypeWithContentPareEntity[] | null> {
        try {
            const res = await apiClient.get(
                `/article-categories/article/${articleId}`
            );

            return res.data || null;
        } catch (error) {
            console.error(`ошибка при получении категорий`, error);
            return null;
        }
    }
    async deleteAllCategory(body: {
        articleId: string;
    }): Promise<string | null> {
        try {
            const res = await apiClient.delete(
                `/article-categories/remove-all`,
                { data: body }
            );

            return res.data || null;
        } catch (error) {
            console.error(`error [post /article-categories/remove-all`, error);
            return null;
        }
    }
}
