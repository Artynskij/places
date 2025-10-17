import {
    IArticleCreateUserReaction,
    IArticleReactionEntity,
    IArticleReactionFront,
    IArticleReactionRequest,
} from "@/lib/models";

import { BaseApiService } from "../base/BaseApi.service";
import apiClient from "../base/ApiClient";
class ArticleReactionMapper {
    toFront(entity: IArticleReactionEntity): IArticleReactionFront {
        return {
            id: entity.Id,
            code: entity.Id,
            name: entity.Id,
            isActive: entity.IsActive,
        };
    }
}
export class ArticleReactionService extends BaseApiService<
    IArticleReactionEntity,
    IArticleReactionEntity,
    IArticleReactionFront,
    IArticleReactionRequest
> {
    protected baseUrl = "/articles-reaction";
    protected mapper = new ArticleReactionMapper();
    async createUserReaction(
        body: IArticleCreateUserReaction
    ): Promise<boolean> {
        try {
            const res = await apiClient.post(`/article-user-reactions`, body);

            return !!res;
        } catch (error) {
            console.error(`error [post /article-user-reactions`, error);
            return false;
        }
    }
    async getArticleReaction(
        articleId: string
    ): Promise<IArticleReactionFront[] | null> {
        try {
            const res = await apiClient.get<IArticleReactionEntity[] | null>(
                `/article-user-reactions?articleId=${articleId}`
            );
            if (!res.data) return null;
            const mappedData = res.data.map((item) =>
                this.mapper.toFront(item)
            );
            return mappedData;
        } catch (error) {
            console.error(
                `error [get /article-user-reactions/${articleId}`,
                error
            );
            return null;
        }
    }
}
