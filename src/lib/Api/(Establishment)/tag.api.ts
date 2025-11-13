import { BaseApiService } from "../base/BaseApi.service";

import {
    ITagFront,
    ITagRequest,
    ITagWithContentPareEntity,
} from "@/lib/models";
import { extractActuallyTitleServer } from "@/lib/helpers/extract-title-server";
import apiClient from "../base/ApiClient";
import { buildUrlWithParams } from "@/lib/helpers/build-query-params-for-api";
interface ITagGetRequest {
    tagCategoryId?: string;
    lang?: string;
}
export class TagMapper {
    constructor() {}
    toFront(entity: ITagWithContentPareEntity): ITagFront {
        const valueActually = extractActuallyTitleServer(
            entity.content.details
        );
        return {
            id: entity.tag.Id,
            key: "",
            tagCategory: {
                id: entity.tag.TagCategory?.Id || "",
                key: entity.tag.TagCategory?.Name || "",
                value: entity.tag.TagCategory
                    ? extractActuallyTitleServer(
                          entity.tag.TagCategory?.content.details
                      )
                    : "",
                content: entity.tag.TagCategory?.content,
            },
            content: entity.content,
            iconName: entity.content.details[0].cIcon || "",
            secondaryValue: entity.content.details[0].secondaryValue || "",
            value: valueActually,
        };
    }
}
export class TagService extends BaseApiService<
    ITagWithContentPareEntity,
    ITagWithContentPareEntity,
    ITagFront,
    ITagRequest
> {
    protected baseUrl = "/tags";
    protected mapper = new TagMapper();
    async getWithFilter(params: ITagGetRequest): Promise<ITagFront[] | null> {
        const url = buildUrlWithParams(`${this.baseUrl}`, params);
        try {
            const res = await apiClient.get<ITagWithContentPareEntity[]>(url);
            if (!res) return null;
            return res.data.map((tagCat) => this.mapper.toFront(tagCat));
        } catch (error) {
            console.error(`error [get ${url}`, error);
            return [];
        }
    }
}
