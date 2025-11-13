import { DataLoadManagementService } from "./../../dataLoadManagement/dataLoadManagement.service";
import {
    IArticleEntity,
    IArticleFront,
    IArticleRequest,
    IArticleTypeFront,
    IArticleTypeWithArticles,
    IArticleUpdateStatusRequest,
    IArticleWithFilterRequest,
} from "@/lib/models";

import ArticleApi from "./article.endpoints";

import ArticleMapper from "./article.mapper";
import { ArticleTypeMapper, ArticleTypeService } from "../article-type.api";
import { boolean } from "yup";
import { TLocale } from "@/lib/models/types";

export class ArticleService {
    private articleApi: ArticleApi;
    private articleMapper: ArticleMapper;
    private dataLoadManagementService: DataLoadManagementService;
    private articleTypeMapper: ArticleTypeMapper;
    private articleTypeService: ArticleTypeService;
    constructor() {
        this.articleApi = new ArticleApi();
        this.articleMapper = new ArticleMapper();
        this.dataLoadManagementService = new DataLoadManagementService();
        this.articleTypeMapper = new ArticleTypeMapper();
        this.articleTypeService = new ArticleTypeService();
    }
    async getToMainPage(
        lang: TLocale
    ): Promise<IArticleTypeWithArticles[] | null> {
        const typesArticle = await this.articleTypeService.get();
        if (!typesArticle) return null;
        const responseMain: IArticleTypeWithArticles[] = [];
        for (let index = 0; index < typesArticle.length; index++) {
            const typeFront = typesArticle[index];
            const articlesByType = await this.getWithFilter({
                articleTypeIds: [typeFront.id, ""],
                lang: lang,
            });
            if (!!articlesByType?.length && typeFront) {
                responseMain.push({
                    type: typeFront,
                    articles: articlesByType,
                });
            }
        }
        return responseMain;
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
    async getById(id: string, lang?: string): Promise<IArticleFront | null> {
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
    async updatePublishedDate(
        id: string,
       
    ): Promise<boolean | null> {
        const response = await this.articleApi.updatePublishDate(id);
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
