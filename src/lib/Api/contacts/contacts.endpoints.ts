import { IContactsEntity } from "@/lib/models/api/entities/parts/contacts.entity";
import apiClient from "../ApiClient";
import { IContactsRequest } from "@/lib/models/api/request/contacts/contacts.request";

export default class ContactsApi {
    constructor() {}
    async getContactsById(
        id: string,
        lang?: string
    ): Promise<IContactsEntity | null> {
        try {
            const response = await apiClient.get(
                `/contacts/${id}${lang ? `?lang=${lang}` : ""}`
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении данных contacts с ID ${id}:`);
            return null;
        }
    }

    async createContacts(
        body: IContactsRequest
    ): Promise<IContactsEntity | null> {
        try {
            const response = await apiClient.post(`/contacts`, body);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при создании Contacts `);
            return null;
        }
    }
    async updateContacts(
        id: string,
        body: IContactsRequest
    ): Promise<IContactsEntity | null> {
        try {
            const response = await apiClient.patch(`/contacts/${id}`, body);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при обновлении Contacts ${id}`);
            return null;
        }
    }
}
