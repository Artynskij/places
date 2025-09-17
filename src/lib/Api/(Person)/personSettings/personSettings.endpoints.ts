import { IPersonSettingsEntity } from "@/lib/models/server/entities/(person)/personSettings.entity";
import apiClient from "../../ApiClient";
import { IPersonSettingsRequest } from "@/lib/models/server/request/(Person)/personSettings.request";

export default class PersonSettingsApi {
    constructor() {}
    async getById(
        id: string,
        lang?: string
    ): Promise<IPersonSettingsEntity | null> {
        try {
            const response = await apiClient.get(
                `/person-settings/${id}${lang ? `?lang=${lang}` : ""}`
            );
            return response.data;
        } catch (error) {
            console.error(
                `Ошибка при получении данных PersonSettings с ID ${id}:`
            );
            return null;
        }
    }

    async create(
        body: IPersonSettingsRequest
    ): Promise<IPersonSettingsEntity | null> {
        try {
            const response = await apiClient.post(`/person-settings`, body);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при создании PersonSettings `);
            return null;
        }
    }
    async update(
        id: string,
        body: IPersonSettingsRequest
    ): Promise<IPersonSettingsEntity | null> {
        try {
            const response = await apiClient.patch(
                `/person-settings/${id}`,
                body
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при обновлении PersonSettings ${id}`);
            return null;
        }
    }
}
