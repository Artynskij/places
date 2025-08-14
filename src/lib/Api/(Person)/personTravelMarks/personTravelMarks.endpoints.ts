
import { ISocialContactsEntity, ISocialContactsRequest } from "@/lib/models";
import apiClient from "../../ApiClient";


export default class PersonTravelApi {
    constructor() {}
    async PersonTravelById(
        id: string,
        lang?: string
    ): Promise<ISocialContactsEntity | null> {
        try {
            const response = await apiClient.get(
                `/social-contacts/${id}${lang ? `?lang=${lang}` : ""}`
            );
            return response.data;
        } catch (error) {
            console.error(
                `Ошибка при получении данных PersonTravel с ID ${id}:`
            );
            return null;
        }
    }

    async PersonTravel(
        body: ISocialContactsRequest
    ): Promise<ISocialContactsEntity | null> {
        try {
            const response = await apiClient.post(`/social-contacts`, body);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при создании PersonTravel `);
            return null;
        }
    }
    async PpdatepersonTravel(
        id: string,
        body: ISocialContactsRequest
    ): Promise<ISocialContactsEntity | null> {
        try {
            const response = await apiClient.patch(
                `/social-contacts/${id}`,
                body
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при обновлении PersonTravel ${id}`);
            return null;
        }
    }
}
