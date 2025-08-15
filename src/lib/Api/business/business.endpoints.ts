import { IBusinessEntity, IBusinessWithContentEntity } from "@/lib/models/api/entities/business.entity";
import apiClient from "../ApiClient";
import { IBusinessRequest } from "@/lib/models/api/request/business/business.request";

export default class BusinessApi {
    constructor() {}
    async getBusinessById(
        id: string,
        lang?: string
    ): Promise<IBusinessWithContentEntity | null> {
        try {
            const response = await apiClient.get(
                `/businesses/${id}${lang ? `?lang=${lang}` : ""}`
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении данных Business с ID ${id}:`);
            return null;
        }
    }

    async createBusiness(
        body: IBusinessRequest
    ): Promise<IBusinessEntity | null> {
        try {
            const response = await apiClient.post(`/businesses`, body);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при создании Business `);
            return null;
        }
    }
    async updateBusiness(
        id: string,
        body: IBusinessRequest
    ): Promise<IBusinessEntity | null> {
        try {
            const response = await apiClient.patch(`/businesses/${id}`, body);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при обновлении Business ${id}`);
            return null;
        }
    }
}
