import { CategoryOfEstablishmentApi } from "./categoryOfEstablishment.endpoints";

import { ITagsOfEstablishmentRequest } from "@/lib/models/api/request/(Establishment)/tags/IPaginationTags.request";
import { IPaginationRequest } from "@/lib/models/api/request/IPagination.request";
import {
    ITagsOfEstablishmentFilterResponse,
    ITagsOfEstablishmentResponse,
} from "@/lib/models/api/response/(Establishment)/tags/ITags.response";
import { ITagBlockFront } from "@/lib/models/frontend/tags/tagsBlock.front";

import { ITagWithEstablishmentFront } from "@/lib/models/frontend/tags/tagWithEstablishment.front";
import { ITagFront } from "@/lib/models";
import { ITagAndEstablishmentConnectionRequest } from "@/lib/models/api/request/(Establishment)/tags/ITagConnection.request";
import { ICategoryAndEstablishmentConnectionRequest } from "@/lib/models/api/request/(Establishment)/category/category.request";
import { ICategoryAndEstablishmentConnectionResponse } from "@/lib/models/api/response/(Establishment)/category/category.response";
// import { ITagClassFront, ITagClassWithEstablishmentFront } from "@/lib/models";

export class TagsService {
    private categoryOfEstablishmentApi: CategoryOfEstablishmentApi;

    constructor() {
        this.categoryOfEstablishmentApi = new CategoryOfEstablishmentApi();
    }

    async createTagEstablishmentConnect(
        body: ICategoryAndEstablishmentConnectionRequest
    ): Promise<ICategoryAndEstablishmentConnectionResponse | null> {
        const response =
            this.categoryOfEstablishmentApi.createCategoryEstablishmentConnect(
                body
            );
        return response;
    }
 
}
