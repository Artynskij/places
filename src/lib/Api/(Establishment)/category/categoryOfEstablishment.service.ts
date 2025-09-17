import { CategoryOfEstablishmentApi } from "./categoryOfEstablishment.endpoints";

import { ICategoryAndEstablishmentConnectionRequest } from "@/lib/models/server/request/(Establishment)/category.request";
import { ICategoryAndEstablishmentConnectionResponse } from "@/lib/models/server/response/(Establishment)/category.response";
// import { ITagClassFront, ITagClassWithEstablishmentFront } from "@/lib/models";

export class CategoryEstablishment {
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
