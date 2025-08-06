import apiClient from "../../ApiClient";
import { IPersonWithContentEntity } from "@/lib/models/api/entities/(person)/person.entity";
import { IPersonRequest } from "@/lib/models/api/request/(Person)/person.request";

export default class PersonApi {
    constructor() {}
    async getPersonById(
        id: string,
        lang?: string
    ): Promise<IPersonWithContentEntity | null> {
        try {
            const response = await apiClient.get(
                `/persons/${id}${lang ? `?lang=${lang}` : ""}`
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении данных Person с ID ${id}:`);
            return null;
        }
    }

    async updatePerson(
        id: string,
        body: IPersonRequest
    ): Promise<IPersonWithContentEntity | null> {
        try {
            const response = await apiClient.patch(`/persons/${id}`, {
                source: { ...body },
            });
            return response.data;
        } catch (error) {
            console.error(`Ошибка при обновлении Person ${id}`);
            return null;
        }
    }
}
