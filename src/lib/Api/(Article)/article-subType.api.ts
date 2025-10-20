import {
    IArticleSubTypeEntity,
    IArticleSubTypeFront,
    IArticleSubTypeRequest,
} from "@/lib/models";
import { BaseApiService } from "../base/BaseApi.service";
import { BaseMapper } from "../base/BaseMapper";
import apiClient from "../base/ApiClient";
interface IConnectionSubTypeArticle {
    articleId: string;
    subCategoryId: string;
}

export class ArticleSubTypeMapper {
    toFront(entity: IArticleSubTypeEntity): IArticleSubTypeFront {
        return {
            id: entity.Id,
            code: entity.Code,
            description: entity.Description,
            isActive: entity.IsActive,
            name: entity.Name,
            sortOrder: entity.SortOrder,
            value: entity.content.details[0].value,
            content: entity.content,
            articleTypeId: entity.ArticleTypeId,
        };
    }
}
export class ArticleSubTypeService extends BaseApiService<
    IArticleSubTypeEntity,
    IArticleSubTypeEntity,
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
                `/article-categories/add-subcategory`,
                body
            );

            return res || null;
        } catch (error) {
            console.error(
                `error [post /article-categories/add-subcategory`,
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
                `article-categories/remove-subcategory`,
                { data: body }
            );

            return res || null;
        } catch (error) {
            console.error(
                `error [post /article-categories/remove-subcategory`,
                error
            );
            return null;
        }
    }
}
