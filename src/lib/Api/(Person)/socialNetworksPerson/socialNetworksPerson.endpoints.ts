
import { ISocialContactsEntity, ISocialContactsRequest } from "@/lib/models";
import apiClient from "../../ApiClient";


export default class SocialNetworksPersonApi {
    constructor() {}
    async getSocialNetworksPersonById(
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
                `Ошибка при получении данных SocialNetworksPerson с ID ${id}:`
            );
            return null;
        }
    }

    async createSocialNetworksPerson(
        body: ISocialContactsRequest
    ): Promise<ISocialContactsEntity | null> {
        try {
            const response = await apiClient.post(`/social-contacts`, body);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при создании SocialNetworksPerson `);
            return null;
        }
    }
    async updateSocialNetworksPerson(
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
            console.error(`Ошибка при обновлении SocialNetworksPerson ${id}`);
            return null;
        }
    }
}
