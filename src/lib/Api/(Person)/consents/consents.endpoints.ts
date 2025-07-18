import { IConsentsEntity } from "@/lib/models/api/entities/(person)/consents.entity";
import apiClient from "../../ApiClient";
import { IConsentsRequest } from "@/lib/models/api/request/(Person)/consents.request";

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
        body: IConsentsRequest
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
        body: IConsentsRequest
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
