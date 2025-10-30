import { BaseApiService } from "../base/BaseApi.service";

import {
    ITagFront,
    ITagRequest,
    ITagWithContentPareEntity,
} from "@/lib/models";
import { getActuallyTitleServer } from "@/lib/helpers/get-title-server";
import apiClient from "../base/ApiClient";
import { getUrlWithQueryParams } from "@/lib/helpers/get-query-params-for-api";
interface ITagGetRequest {
    tagCategoryId?: string;
    lang?: string;
}
export class TagMapper {
    constructor() {}
    toFront(entity: ITagWithContentPareEntity): ITagFront {
        const valueActually = getActuallyTitleServer(entity.content.details);
        return {
            id: entity.tag.Id,
            key: "",
            tagCategory: {
                id: entity.tag.TagCategory.Id,
                key: entity.tag.TagCategory.Name,
                value: getActuallyTitleServer(
                    entity.tag.TagCategory.content.details
                ),
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
        const url = getUrlWithQueryParams(`${this.baseUrl}`, params);
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
