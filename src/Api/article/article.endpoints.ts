import { IArticleEntity } from "@/models";

import apiClient from "../ApiClient";
import { IPaginationArticleRequest } from "@/models/api/request/article/IPaginationArticle.request";

export default class ArticleApi {
  constructor() {}
  async getArticleById(
    id: string,
    lang: string
  ): Promise<IArticleEntity | null> {
    try {
      const response = await apiClient.get(
        `/articles-of-business/${id}?lang=${lang}`
      );
      return response.data;
    } catch (error) {
      console.error(`Ошибка при получении статьи с ID ${id}:`, error);
      return null;
    }
  }

  async getArticlesByPagination(
    body: IPaginationArticleRequest
  ): Promise<IArticleEntity[] | null> {
    try {
      const response = await apiClient.post(
        `/articles-of-business/getAll`,
        body
      );
      return response.data;
    } catch (error) {
      console.error("Ошибка при получении статей с пагинацией:", error);
      return null;
    }
  }
}
