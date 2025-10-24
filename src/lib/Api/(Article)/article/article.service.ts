import { DataLoadManagementService } from "./../../dataLoadManagement/dataLoadManagement.service";
import { IArticleEntity, IArticleFront, IArticleTypeFront } from "@/lib/models";

import ArticleApi from "./article.endpoints";
import {
    IArticleRequest,
    IArticleUpdateStatusRequest,
    IArticleWithFilterRequest,
    IPaginationArticleRequest,
} from "@/lib/models/server/request/(article)/article.request";
import ArticleMapper from "./article.mapper";
import { ArticleTypeMapper } from "../article-type.api";
import { boolean } from "yup";

export class ArticleService {
    private articleApi: ArticleApi;
    private articleMapper: ArticleMapper;
    private dataLoadManagementService: DataLoadManagementService;
    private articleTypeMapper: ArticleTypeMapper;
    constructor() {
        this.articleApi = new ArticleApi();
        this.articleMapper = new ArticleMapper();
        this.dataLoadManagementService = new DataLoadManagementService();
        this.articleTypeMapper = new ArticleTypeMapper();
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
        body: Partial<IArticleRequest>
    ): Promise<IArticleEntity | null> {
        const response = await this.articleApi.update(id, body);
        return response;
    }
    async delete(id: string): Promise<Boolean> {
        const response = await this.articleApi.delete(id);
        return !!response;
    }

    async getPopular(limit: number): Promise<IArticleFront[] | null> {
        const response = await this.articleApi.getPopular(limit);
        const cdnHost = await this.dataLoadManagementService.getBlobProxy();
        if (!response) return null;
        const mappedData =
            (response
                .map((resItem) =>
                    this.articleMapper.toFront(resItem, cdnHost?.url || "")
                )
                .filter(boolean) as IArticleFront[]) || [];
        return mappedData;
    }
    // работа с статусом
    async getByStatus(
        id: string,
        lang: string
    ): Promise<IArticleFront[] | null> {
        const response = await this.articleApi.getByStatus(id);
        const cdnHost = await this.dataLoadManagementService.getBlobProxy();
        if (!response) return null;
        const mappedData =
            (response
                .map((resItem) =>
                    this.articleMapper.toFront(resItem, cdnHost?.url || "")
                )
                .filter(boolean) as IArticleFront[]) || [];
        return mappedData;
    }
    async updateStatus(body: IArticleUpdateStatusRequest): Promise<boolean> {
        const response = await this.articleApi.updateStatus(body);
        // const cdnHost = await this.dataLoadManagementService.getBlobProxy();

        return !!response;
    }
    // работа с категориями
    async getAllCategory(
        articleId: string
    ): Promise<IArticleTypeFront[] | null> {
        const response = await this.articleApi.getAllCategory(articleId);
        if (!response) {
            return null;
        }
        const mappedData = response.map((item) =>
            this.articleTypeMapper.toFront(item)
        );
        return mappedData;
    }
    async deleteAllCategoryFromArticle(body: {
        articleId: string;
    }): Promise<any | null> {
        const response = this.articleApi.deleteAllCategory(body);
        return response;
    }
}
