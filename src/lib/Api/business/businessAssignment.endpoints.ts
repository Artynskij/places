import {
    IBusinessAssignmentGetQueryRequest,
    IBusinessAssignmentRequest,
    IBusinessPersonAssignEntity,
} from "@/lib/models";
import apiClient from "../ApiClient";

export class BusinessAssignmentApi {
    constructor() {}
    async getByQuery({
        personId,
        businessId,
        establishmentId,
    }: IBusinessAssignmentGetQueryRequest):Promise<IBusinessPersonAssignEntity[] | null> {
        try {
            const query = [
                personId ? `personId=${personId}` : null,
                businessId ? `businessId=${businessId}` : null,
                establishmentId ? `establishmentId=${establishmentId}` : null,
            ].filter((item) => !!item);

            const response = await apiClient.get(
                `/person-business-assignments${
                    query.length > 0 ? "?" + query.join("&") : ""
                }
                `
            );
            return response.data;
        } catch (error) {
            console.error(
                `Ошибка при получении данных PersonAssignment по query.`
            );
            return null;
        }
    }
    async getById(
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

    async create(
        body: IBusinessAssignmentRequest
    ): Promise<IBusinessPersonAssignEntity | null> {
        try {
            const response = await apiClient.post(
                `/person-business-assignments`,
                body
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при создании PersonAssignment `);
            return null;
        }
    }
    async update(
        id: string,
        body: IBusinessAssignmentRequest
    ): Promise<IBusinessPersonAssignEntity | null> {
        try {
            const response = await apiClient.patch(
                `/person-business-assignments/${id}`,

                body
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при обновлении PersonAssignment ${id}`);
            return null;
        }
    }
    async delete(
        id: string,
        body: IBusinessAssignmentRequest
    ): Promise<IBusinessPersonAssignEntity | null> {
        try {
            const response = await apiClient.patch(
                `/person-business-assignments/${id}`,

                body
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при обновлении PersonAssignment ${id}`);
            return null;
        }
    }
}
