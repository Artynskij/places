import { IArticleEntity, IArticleFront } from "@/lib/models";

import ArticleApi from "./article.endpoints";
import { IPaginationArticleRequest } from "@/lib/models/api/request/article/IPaginationArticle.request";
import ArticleMapper from "./article.mapper";

export class ArticleService {
    private articleApi: ArticleApi;
    private articleMapper: ArticleMapper;
    constructor() {
        this.articleApi = new ArticleApi();
        this.articleMapper = new ArticleMapper();
    }

    async getArticleById(
        id: string,
        lang: string
    ): Promise<IArticleFront | null> {
        const response = await this.articleApi.getArticleById(id, lang);

        return response ? this.articleMapper.transformToFront(response) : null;
    }

    async getArticlesByPagination(
        body: IPaginationArticleRequest
    ): Promise<IArticleFront[] | null> {
        const response = await this.articleApi.getArticlesByPagination(body);
        return response
            ? response
                  .map((resItem) =>
                      this.articleMapper.transformToFront(resItem)
                  )
                  .filter((item) => !!item) as IArticleFront[] || []
            : null;
    }
}
