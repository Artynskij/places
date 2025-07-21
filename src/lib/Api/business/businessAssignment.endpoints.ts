import { IBusinessPersonAssignEntity } from "@/lib/models/api/entities/business/businessPersonAssign.entity";
import apiClient from "../ApiClient";
import { ISocialContactsRequest } from "@/lib/models/api/request/(Person)/socialContacts.request";

export default class BusinessAssignmentApi {
    constructor() {}
    async getPersonAssignmentById(
        id: string,
        lang?: string
    ): Promise<IBusinessPersonAssignEntity | null> {
        try {
            const response = await apiClient.get(
                `/person-business-assignments/${id}${
                    lang ? `?lang=${lang}` : ""
                }`
            );
            return response.data;
        } catch (error) {
            console.error(
                `Ошибка при получении данных PersonAssignment с ID ${id}:`
            );
            return null;
        }
    }

    async createPersonAssignment(
        body: ISocialContactsRequest
    ): Promise<IBusinessPersonAssignEntity | null> {
        try {
            const response = await apiClient.post(
                `/person-business-assignments`,
                {
                    source: { ...body },
                }
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при создании PersonAssignment `);
            return null;
        }
    }
    async updatePersonAssignment(
        id: string,
        body: ISocialContactsRequest
    ): Promise<IBusinessPersonAssignEntity | null> {
        try {
            const response = await apiClient.patch(
                `/person-business-assignments/${id}`,
                {
                    source: { ...body },
                }
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при обновлении PersonAssignment ${id}`);
            return null;
        }
    }
}
