import {
    IArticleSubTypeWithContentPareEntity,
    IArticleSubTypeFront,
    IArticleSubTypeRequest,
} from "@/lib/models";
import { BaseApiService } from "../base/BaseApi.service";

import apiClient from "../base/ApiClient";

interface IConnectionSubTypeArticle {
    articleId: string;
    articleSubTypeId: string;
}
interface IConnectionBulkSubTypeArticle {
    articleId: string;
    articleSubTypeIds: string[];
}

export class ArticleSubTypeMapper {
    constructor() {}
    toFront(
        entity: IArticleSubTypeWithContentPareEntity
    ): IArticleSubTypeFront {
        const title =
            entity.content?.details.find((item) => item.lang === "ru")?.value ||
            entity.content?.details[0].value;
        return {
            id: entity.articleSubType.Id,
            code: entity.articleSubType.Code,
            description: entity.articleSubType.Description,
            isActive: entity.articleSubType.IsActive,
            name: entity.articleSubType.Name,
            sortOrder: entity.articleSubType.SortOrder,
            value: title,
            content: entity.content,
            articleTypeId: entity.articleSubType.ArticleTypeId,
            articleType: entity.articleSubType.ArticleType,
            articlesCount: entity.articlesCount,
        };
    }
}
export class ArticleSubTypeService extends BaseApiService<
    IArticleSubTypeWithContentPareEntity,
    IArticleSubTypeWithContentPareEntity,
    IArticleSubTypeFront,
    IArticleSubTypeRequest
> {
    protected mapper = new ArticleSubTypeMapper();
    protected baseUrl = "/article-sub-types";
    async addConnectionToArticle(
        body: IConnectionSubTypeArticle
    ): Promise<any | null> {
        try {
            const res = await apiClient.post(
                `/article-categories/subcategories`,
                body
            );

            return res || null;
        } catch (error) {
            console.error(
                `error [post /article-categories/subcategories`,
                error
            );
            return null;
        }
    }
    async addBulkConnectionToArticle(
        body: IConnectionBulkSubTypeArticle
    ): Promise<any | null> {
        try {
            const res = await apiClient.post(
                `/article-categories/subcategories/bulk`,
                body
            );

            return res || null;
        } catch (error) {
            console.error(
                `error [post /article-categories/subcategories/bulk`,
                error
            );
            return null;
        }
    }
    async deleteConnectionFromArticle(
        body: IConnectionSubTypeArticle
    ): Promise<any | null> {
        try {
            const res = await apiClient.delete(
                `article-categories/subcategories`,
                { data: body }
            );

            return res || null;
        } catch (error) {
            console.error(
                `error [delete /article-categories/subcategories`,
                error
            );
            return null;
        }
    }
}
