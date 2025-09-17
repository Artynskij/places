import { IPersonNameEntity } from "@/lib/models/server/entities/(person)/personName.entity";
import apiClient from "../../ApiClient";

import { IPersonNameRequest } from "@/lib/models/server/request/(Person)/personName.request";
import { IPersonNameFront } from "@/lib/models/frontend/(person)/personName.front";

export default class PersonNameApi {
    constructor() {}
    async getById(
        id: string,
        lang?: string
    ): Promise<IPersonNameEntity | null> {
        try {
            const response = await apiClient.get(
                `/persons-name/${id}${lang ? `?lang=${lang}` : ""}`
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении данных PersonName с ID ${id}:`);
            return null;
        }
    }

    async create(body: IPersonNameRequest): Promise<IPersonNameEntity | null> {
        try {
            const response = await apiClient.post(`/persons-name`, body);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при создании PersonName `);
            return null;
        }
    }
    async update(
        id: string,
        body: IPersonNameRequest
    ): Promise<IPersonNameEntity | null> {
        try {
            const response = await apiClient.patch(`/persons-name/${id}`, body);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при обновлении PersonName ${id}`);
            return null;
        }
    }
}
