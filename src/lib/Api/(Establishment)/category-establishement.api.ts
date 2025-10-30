import { BaseApiService } from "../base/BaseApi.service";

import {
    ICategoryEstablishmentGetAllRequest,
    ICategoryEstablishmentWithContentPareEntity,
    ICategoryEstablishmentRequest,
    ICategoryEstablishmentFront,
} from "@/lib/models";
import { getActuallyTitleServer } from "@/lib/helpers/get-title-server";
import apiClient from "../base/ApiClient";

export class CategoryEstablishmentMapper {
    constructor() {}
    toFront(
        entity: ICategoryEstablishmentWithContentPareEntity
    ): ICategoryEstablishmentFront {
        const valueActuallyCategory = entity.content?.details
            ? getActuallyTitleServer(entity.content?.details)
            : "";
        const RootCategoryEntity = entity.category.RootCategory;
        const valueActuallyRootCategory = RootCategoryEntity?.content?.details
            ? getActuallyTitleServer(RootCategoryEntity.content.details)
            : "";
        return {
            id: entity.category.Id,
            name: entity.category.Name,
            value: valueActuallyCategory,
            rootCategory: RootCategoryEntity
                ? {
                      id: RootCategoryEntity?.Id,
                      value: valueActuallyRootCategory,
                      isActive: RootCategoryEntity?.IsActive,
                      name: RootCategoryEntity.Name,
                      content: RootCategoryEntity?.content,
                  }
                : null,
            type: entity.category.Type,
            content: entity.content,
        };
    }
}
export class CategoryEstablishmentService extends BaseApiService<
    ICategoryEstablishmentWithContentPareEntity,
    ICategoryEstablishmentWithContentPareEntity,
    ICategoryEstablishmentFront,
    ICategoryEstablishmentRequest
> {
    protected baseUrl = "/category-of-establishment";
    protected mapper = new CategoryEstablishmentMapper();
    async getAll(
        body: ICategoryEstablishmentGetAllRequest
    ): Promise<ICategoryEstablishmentFront[] | null> {
        try {
            const res = await apiClient.post<
                ICategoryEstablishmentWithContentPareEntity[]
            >(`${this.baseUrl}/get-all`, body);
            if (!res) return null;
            return res.data.map((tagCat) => this.mapper.toFront(tagCat));
        } catch (error) {
            console.error(`error [post ${this.baseUrl}/getAll`, error);
            return null;
        }
    }
}
