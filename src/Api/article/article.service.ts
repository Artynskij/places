import { IApiArticle } from "@/models";
import { IPaginationCredentials } from "../api.type";
import ArticleApi from "./article.endpoints";

export class ArticleService {
  private articleApi: ArticleApi;

  constructor() {
    this.articleApi = new ArticleApi();
  }

  async getArticleById(id: string, lang: string): Promise<IApiArticle | null> {
    const response = await this.articleApi.getArticleById(id, lang);
    return response ? response : null;
  }

  async getArticlesByPagination(
    body: IPaginationCredentials
  ): Promise<IApiArticle[] | null> {
    const response = await this.articleApi.getArticlesByPagination(body);
    return response ? response : null;
  }
}
