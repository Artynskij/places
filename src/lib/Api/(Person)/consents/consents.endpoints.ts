import { IConsentsEntity } from "@/lib/models/server/entities/(person)/consents.entity";

import { IConsentsPatchRequest } from "@/lib/models/server/request/(Person)/consents.request";
import apiClient from "../../base/ApiClient";

export default class ConsentsApi {
    constructor() {}
    async getConsentsById(
        id: string,
        lang?: string
    ): Promise<IConsentsEntity | null> {
        try {
            const response = await apiClient.get(
                `/consents/${id}${lang ? `?lang=${lang}` : ""}`
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении данных consents с ID ${id}:`);
            return null;
        }
    }

    async createConsents(
        body: IConsentsPatchRequest
    ): Promise<IConsentsEntity | null> {
        try {
            const response = await apiClient.post(`/consents`, body);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при создании consents `);
            return null;
        }
    }
    async updateConsents(
        id: string,
        body: IConsentsPatchRequest
    ): Promise<IConsentsEntity | null> {
        try {
            const response = await apiClient.patch(`/consents/${id}`, body);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при обновлении consents ${id}`);
            return null;
        }
    }
}
