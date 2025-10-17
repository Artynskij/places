import {
    IArticleTypeEntity,
    IArticleTypeFront,
    IArticleTypeRequest,
} from "@/lib/models";
import { BaseApiService } from "../base/BaseApi.service";

import apiClient from "../base/ApiClient";
interface IConnectionTypeArticle {
    articleId: string;
    categoryId: string;
}
export class ArticleTypeMapper {
    toFront(entity: IArticleTypeEntity): IArticleTypeFront {
        return {
            id: entity.Id,
            code: entity.Code,
            description: entity.Description,
            isActive: entity.IsActive,
            name: entity.Name,
            sortOrder: entity.SortOrder,
            value: entity.content.details[0].value,
            content: entity.content,
        };
    }
}
export class ArticleTypeService extends BaseApiService<
    IArticleTypeEntity,
    IArticleTypeEntity,
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
                `/article-categories/add-category`,
                body
            );

            return res || null;
        } catch (error) {
            console.error(
                `error [post /article-categories/add-category`,
                error
            );
            return null;
        }
    }
    async deleteConnectionFromArticle(
        body: IConnectionTypeArticle
    ): Promise<any | null> {
        try {
            const res = await apiClient.delete(
                `/article-categories/remove-category`,
                { data: body }
            );

            return res || null;
        } catch (error) {
            console.error(
                `error [post /article-categories/remove-category`,
                error
            );
            return null;
        }
    }
}
