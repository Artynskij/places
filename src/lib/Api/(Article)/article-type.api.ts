import {
    IArticleTypeWithContentPareEntity,
    IArticleTypeFront,
    IArticleTypeRequest,
} from "@/lib/models";
import { BaseApiService } from "../base/BaseApi.service";

import apiClient from "../base/ApiClient";
interface IConnectionTypeArticle {
    articleId: string;
    articleTypeId: string;
}
interface IConnectionBulkTypeArticle {
    articleId: string;
    articleTypeIds: string[];
}
export class ArticleTypeMapper {
    constructor() {}
    toFront(entity: IArticleTypeWithContentPareEntity): IArticleTypeFront {
        const title =
            entity.content?.details.find((item) => item.lang === "ru")?.value ||
            entity.content?.details[0].value;

        return {
            id: entity.articleType.Id,
            code: entity.articleType.Code,
            description: entity.articleType.Description,
            isActive: entity.articleType.IsActive,
            name: entity.articleType.Name,
            sortOrder: entity.articleType.SortOrder,
            value: title,
            content: entity.content,
            subTypes: entity.articleType.SubTypes,
        };
    }
}
export class ArticleTypeService extends BaseApiService<
    IArticleTypeWithContentPareEntity,
    IArticleTypeWithContentPareEntity,
    IArticleTypeFront,
    IArticleTypeRequest
> {
    protected baseUrl = "/article-types";
    protected mapper = new ArticleTypeMapper();
    async addConnectionToArticle(
        body: IConnectionTypeArticle
    ): Promise<any | null> {
        try {
            const res = await apiClient.post(
                `/article-categories/categories`,
                body
            );

            return res || null;
        } catch (error) {
            console.error(`error [post /article-categories/categories`, error);
            return null;
        }
    }
    async addBulkConnectionToArticle(
        body: IConnectionBulkTypeArticle
    ): Promise<any | null> {
        try {
            const res = await apiClient.post(
                `/article-categories/categories/bulk`,
                body
            );

            return res || null;
        } catch (error) {
            console.error(`error [post /article-categories/categories/bulk`, error);
            return null;
        }
    }
    async deleteConnectionFromArticle(
        body: IConnectionTypeArticle
    ): Promise<any | null> {
        try {
            const res = await apiClient.delete(
                `/article-categories/categories`,
                { data: body }
            );

            return res || null;
        } catch (error) {
            console.error(`error [delete /article-categories/categories`, error);
            return null;
        }
    }
}
