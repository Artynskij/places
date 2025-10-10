import { DataLoadManagementService } from "./../../dataLoadManagement/dataLoadManagement.service";
import { IArticleEntity, IArticleFront } from "@/lib/models";

import ArticleApi from "./article.endpoints";
import {
    IArticleRequest,
    IArticleWithFilterRequest,
    IPaginationArticleRequest,
} from "@/lib/models/server/request/(article)/article.request";
import ArticleMapper from "./article.mapper";

export class ArticleService {
    private articleApi: ArticleApi;
    private articleMapper: ArticleMapper;
    private dataLoadManagementService: DataLoadManagementService;
    constructor() {
        this.articleApi = new ArticleApi();
        this.articleMapper = new ArticleMapper();
        this.dataLoadManagementService = new DataLoadManagementService();
    }
    async getWithFilter(
        query: IArticleWithFilterRequest
    ): Promise<IArticleFront[] | null> {
        const response = await this.articleApi.getWithFilter(query);
        const cdnHost = await this.dataLoadManagementService.getBlobProxy();
        const mappedData = response
            ? (response
                  .map((resItem) =>
                      this.articleMapper.toFront(resItem, cdnHost?.url || "")
                  )
                  .filter((item) => !!item) as IArticleFront[]) || []
            : null;
        return mappedData;
    }
    async getById(id: string, lang: string): Promise<IArticleFront | null> {
        const response = await this.articleApi.getById(id, lang);
        const cdnHost = await this.dataLoadManagementService.getBlobProxy();
        return response
            ? this.articleMapper.toFront(response, cdnHost?.url || "")
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
