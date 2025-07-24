

import { ICategoryAndEstablishmentConnectionRequest } from "@/lib/models/api/request/(Establishment)/category/category.request";
import apiClient from "../../ApiClient";
import { ICategoryAndEstablishmentConnectionResponse } from "@/lib/models/api/response/(Establishment)/category/category.response";



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
