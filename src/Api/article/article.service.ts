import { IArticleEntity } from "@/models";

import ArticleApi from "./article.endpoints";
import { IPaginationArticleRequest } from "@/models/api/request/article/IPaginationArticle.request";

export class ArticleService {
  private articleApi: ArticleApi;

  constructor() {
    this.articleApi = new ArticleApi();
  }

  async getArticleById(
    id: string,
    lang: string
  ): Promise<IArticleEntity | null> {
    const response = await this.articleApi.getArticleById(id, lang);
    return response ? response : null;
  }

  async getArticlesByPagination(
    body: IPaginationArticleRequest
  ): Promise<IArticleEntity[] | null> {
    const response = await this.articleApi.getArticlesByPagination(body);
    return response ? response : null;
  }
}
