import { IContactsPersonEntity } from "@/lib/models/api/entities/(person)/contactsPerson.entity";
import apiClient from "../../ApiClient";
import { IContactsPersonRequest } from "@/lib/models/api/request/(Person)/contactsPerson.request";

export default class ContactsPersonApi {
    constructor() {}
    async getContactsPersonById(
        id: string,
        lang?: string
    ): Promise<IContactsPersonEntity | null> {
        try {
            const response = await apiClient.get(
                `/contacts/${id}${lang ? `?lang=${lang}` : ""}`
            );
            return response.data;
        } catch (error) {
            console.error(
                `Ошибка при получении данных contactsPerson с ID ${id}:`
            );
            return null;
        }
    }

    async createContactsPerson(
        body: IContactsPersonRequest
    ): Promise<IContactsPersonEntity | null> {
        try {
            const response = await apiClient.post(`/contacts`, {
                source: { ...body },
            });
            return response.data;
        } catch (error) {
            console.error(`Ошибка при создании ContactsPerson `);
            return null;
        }
    }
    async updateContactsPerson(
        id: string,
        body: IContactsPersonRequest
    ): Promise<IContactsPersonEntity | null> {
        try {
            const response = await apiClient.patch(`/contacts/${id}`, {
                source: { ...body },
            });
            return response.data;
        } catch (error) {
            console.error(`Ошибка при обновлении ContactsPerson ${id}`);
            return null;
        }
    }
}
