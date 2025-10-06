import { ICategoryAndEstablishmentConnectionRequest } from "@/lib/models/server/request/(Establishment)/category.request";

import { ICategoryAndEstablishmentConnectionResponse } from "@/lib/models/server/response/(Establishment)/category.response";
import apiClient from "../../base/ApiClient";

export class CategoryOfEstablishmentApi {
    async createCategoryEstablishmentConnect(
        body: ICategoryAndEstablishmentConnectionRequest
    ): Promise<ICategoryAndEstablishmentConnectionResponse | null> {
        try {
            const response = await apiClient.post(
                `/category-of-establishments`,
                body
            );
            return response.data;
        } catch (error) {
            console.error(
                `Ошибка при получении всех тегов: для блока фильтров`
            );
            return null;
        }
    }
}
