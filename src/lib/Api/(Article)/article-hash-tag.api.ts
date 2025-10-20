import {
    IArticleCreateHashTagUser,
    IArticleHashTagEntity,
    IArticleHashTagFront,
    IArticleHashTagRequest,
} from "@/lib/models";

import { BaseApiService } from "../base/BaseApi.service";
import apiClient from "../base/ApiClient";
class ArticleHashTagMapper {
    toFront(entity: IArticleHashTagEntity): IArticleHashTagFront {
        return {
            id: entity.Id,

            name: entity.Id,
        };
    }
}
export class ArticleHashTagService extends BaseApiService<
    IArticleHashTagEntity,
    IArticleHashTagEntity,
    IArticleHashTagFront,
    IArticleHashTagRequest
> {
    protected baseUrl = "/hash-tags";
    protected mapper = new ArticleHashTagMapper();
    async createUserHashTag(
        body: IArticleCreateHashTagUser
    ): Promise<boolean> {
        try {
            const res = await apiClient.post(`/hash-tags-of-articles`, body);

            return !!res;
        } catch (error) {
            console.error(`error [post /hash-tags-of-articles`, error);
            return false;
        }
    }
    async getArticleHashTag(
        articleId: string
    ): Promise<IArticleHashTagFront[] | null> {
        try {
            const res = await apiClient.get<IArticleHashTagEntity[] | null>(
                `/hash-tags-of-articles?articleIds=${articleId}`
            );
            if (!res.data) return null;
            const mappedData = res.data.map((item) =>
                this.mapper.toFront(item)
            );
            return mappedData;
        } catch (error) {
            console.error(
                `error [get /hash-tags-of-articles?articleIds=${articleId}`,
                error
            );
            return null;
        }
    }
}
