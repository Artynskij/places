import apiClient from "../../ApiClient";

import {
    IPersonNameCreateRequest,
    IPersonNameUpdateRequest,
} from "@/lib/models/api/request/(Person)/personName.request";
import { IPersonNameFront } from "@/lib/models/frontend/(person)/personName.front";

export default class PersonNameApi {
    constructor() {}
    async getPersonNameById(
        id: string,
        lang?: string
    ): Promise<IPersonNameFront | null> {
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

    async createPersonName(
        body: IPersonNameCreateRequest
    ): Promise<IPersonNameFront | null> {
        try {
            const response = await apiClient.post(`/persons-name`, body);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при создании PersonName `);
            return null;
        }
    }
    async updatePersonName(
        id: string,
        body: IPersonNameUpdateRequest
    ): Promise<IPersonNameFront | null> {
        try {
            const response = await apiClient.patch(`/persons-name/${id}`, {source:{...body}});
            return response.data;
        } catch (error) {
            console.error(`Ошибка при обновлении PersonName ${id}`);
            return null;
        }
    }
}
