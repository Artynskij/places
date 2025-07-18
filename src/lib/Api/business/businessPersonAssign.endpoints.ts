
import { IBusinessPersonAssignEntity } from "@/lib/models/api/entities/business/businessPersonAssign.entity";
import apiClient from "../ApiClient";
import { ISocialContactsRequest } from "@/lib/models/api/request/(Person)/socialContacts.request";

export default class BusinessPersonAssignApi {
    constructor() {}
    async getBusinessPersonAssignById(
        id: string,
        lang?: string
    ): Promise<IBusinessPersonAssignEntity | null> {
        try {
            const response = await apiClient.get(
                `/businessPersonAssignes/${id}${lang ? `?lang=${lang}` : ""}`
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении данных BusinessPersonAssign с ID ${id}:`);
            return null;
        }
    }

    async createBusinessPersonAssign(
        body: ISocialContactsRequest
    ): Promise<IBusinessPersonAssignEntity | null> {
        try {
            const response = await apiClient.post(`/businessPersonAssignes`, {
                source: { ...body },
            });
            return response.data;
        } catch (error) {
            console.error(`Ошибка при создании BusinessPersonAssign `);
            return null;
        }
    }
    async updateBusinessPersonAssign(
        id: string,
        body: ISocialContactsRequest
    ): Promise<IBusinessPersonAssignEntity | null> {
        try {
            const response = await apiClient.patch(`/businessPersonAssignes/${id}`, {
                source: { ...body },
            });
            return response.data;
        } catch (error) {
            console.error(`Ошибка при обновлении BusinessPersonAssign ${id}`);
            return null;
        }
    }
}
