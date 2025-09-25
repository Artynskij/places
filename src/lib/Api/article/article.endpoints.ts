import { IArticleRequest } from "./../../models/server/request/article/article.request";
import { IArticleEntity, IArticleEntityWithContent } from "@/lib/models";

import apiClient from "../ApiClient";
import { IPaginationArticleRequest } from "@/lib/models/server/request/article/article.request";

export default class ArticleApi {
    constructor() {}
    async getById(
        id: string,
        lang: string
    ): Promise<IArticleEntityWithContent | null> {
        try {
            const response = await apiClient.get(
                `/articles-of-business/${id}?lang=${lang}`
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении статьи с ID ${id}:`);
            return null;
        }
    }

    async getByPagination(
        body: IPaginationArticleRequest
    ): Promise<IArticleEntityWithContent[] | null> {
        try {
            const response = await apiClient.post(
                `/articles-of-business/getAll`,
                body
            );
            return response.data;
        } catch (error) {
            console.error("Ошибка при получении статей с пагинацией:");
            return null;
        }
    }
    async create(body: IArticleRequest): Promise<IArticleEntity | null> {
        try {
            const response = await apiClient.post(
                `/articles-of-business`,
                body
            );
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
            const response = await apiClient.patch(
                `/articles-of-business/${id}`,
                body
            );
            return response.data;
        } catch (error) {
            console.error("Ошибка при получении статей с пагинацией:");
            return null;
        }
    }
}
