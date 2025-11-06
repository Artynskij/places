import { BaseApiService } from "../base/BaseApi.service";

import {
    ICategoryRootEstablishmentWithContentPareEntity,
    ICategoryRootEstablishmentRequest,
    ICategoryRootEstablishmentFront,
    ICategoryRootEstablishmentGetAllRequest,
} from "@/lib/models";
import { extractActuallyTitleServer } from "@/lib/helpers/extract-title-server";
import apiClient from "../base/ApiClient";

export class CategoryRootEstablishmentMapper {
    constructor() {}
    toFront(
        entity: ICategoryRootEstablishmentWithContentPareEntity
    ): ICategoryRootEstablishmentFront {
        const valueActually = entity.content
            ? extractActuallyTitleServer(entity.content.details)
            : "";
        return {
            id: entity.rootCategory.Id,
            name: entity.rootCategory.Name,
            value: valueActually,
            isActive: entity.rootCategory.IsActive,
            content: entity.content,
        };
    }
}
export class CategoryRootEstablishmentService extends BaseApiService<
    ICategoryRootEstablishmentWithContentPareEntity,
    ICategoryRootEstablishmentWithContentPareEntity,
    ICategoryRootEstablishmentFront,
    ICategoryRootEstablishmentRequest
> {
    protected baseUrl = "/root-category-of-establishment";
    protected mapper = new CategoryRootEstablishmentMapper();
    async getAll(
        body: ICategoryRootEstablishmentGetAllRequest
    ): Promise<ICategoryRootEstablishmentFront[] | null> {
        try {
            const res = await apiClient.post<
                ICategoryRootEstablishmentWithContentPareEntity[]
            >(`${this.baseUrl}/get-all`, body);
            if (!res) return null;
            return res.data.map((tagCat) => this.mapper.toFront(tagCat));
        } catch (error) {
            console.error(`error [post ${this.baseUrl}/getAll`, error);
            return null;
        }
    }
}
