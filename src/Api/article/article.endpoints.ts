import { IApiArticle } from "@/models";
import { IPaginationCredentials } from "../api.type";
import apiClient from "../ApiClient";

export default class ArticleApi {
  constructor() {}
  async getArticleById(id: string, lang: string): Promise<IApiArticle | null> {
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
    body: IPaginationCredentials
  ): Promise<IApiArticle[] | null> {
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
