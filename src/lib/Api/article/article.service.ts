import {
    IArticleEntity,
    IArticleEntityWithContent,
    IArticleFront,
} from "@/lib/models";

import ArticleApi from "./article.endpoints";
import {
    IArticleRequest,
    IPaginationArticleRequest,
} from "@/lib/models/server/request/article/article.request";
import ArticleMapper from "./article.mapper";

export class ArticleService {
    private articleApi: ArticleApi;
    private articleMapper: ArticleMapper;
    constructor() {
        this.articleApi = new ArticleApi();
        this.articleMapper = new ArticleMapper();
    }

    async getById(id: string, lang: string): Promise<IArticleFront | null> {
        const response = await this.articleApi.getById(id, lang);

        return response ? this.articleMapper.transformToFront(response) : null;
    }

    async getByPagination(
        body: IPaginationArticleRequest
    ): Promise<IArticleFront[] | null> {
        const response = await this.articleApi.getByPagination(body);
        return response
            ? (response
                  .map((resItem) =>
                      this.articleMapper.transformToFront(resItem)
                  )
                  .filter((item) => !!item) as IArticleFront[]) || []
            : null;
    }
    async create(body: IArticleRequest): Promise<IArticleEntity | null> {
        const response = await this.articleApi.create(body);
        return response;
    }
    async update(
        id: string,
        body: IArticleRequest
    ): Promise<IArticleEntity | null> {
        const response = await this.articleApi.update(id, body);
        return response;
    }
}
