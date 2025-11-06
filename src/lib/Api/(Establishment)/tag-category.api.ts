import { BaseApiService } from "../base/BaseApi.service";
import apiClient from "../base/ApiClient";
import {
    ICategoryFront,
    ITagCategoryRequest,
    ITagCategoryWithContentPareEntity,
} from "@/lib/models";
import { extractActuallyTitleServer } from "@/lib/helpers/extract-title-server";
export class TagCategoryMapper {
    constructor() {}
    toFront(entity: ITagCategoryWithContentPareEntity): ICategoryFront {
        const valueActually = extractActuallyTitleServer(
            entity.content.details
        );
        return {
            id: entity.tagCategory.Id,
            key: entity.tagCategory.Name,
            content: entity.content,
            value: valueActually,
        };
    }
}
export class TagCategoryService extends BaseApiService<
    ITagCategoryWithContentPareEntity,
    ITagCategoryWithContentPareEntity,
    ICategoryFront,
    ITagCategoryRequest
    // IBaseModerationResponse
> {
    protected baseUrl = "/tag-category";
    protected mapper = new TagCategoryMapper();
    async getAll(): Promise<ICategoryFront[] | null> {
        try {
            const res = await apiClient.post<
                ITagCategoryWithContentPareEntity[]
            >(`${this.baseUrl}/get-all`);
            if (!res) return null;
            return res.data.map((tagCat) => this.mapper.toFront(tagCat));
        } catch (error) {
            console.error(`error [post ${this.baseUrl}/getAll`, error);
            return [];
        }
    }
}
