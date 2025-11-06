import {
    IBusinessPersonAssignmentGetQueryRequest,
    IBusinessPersonAssignmentRequest,
    IBusinessPersonAssignEntity,
} from "@/lib/models";
import apiClient from "../base/ApiClient";
import { buildQueryString } from "@/lib/helpers/build-query-params-for-api";

export class BusinessPersonAssignmentApi {
    private baseUrl: string;
    constructor() {
        this.baseUrl = "/person-business-assignments";
    }
    async getByQuery({
        personId,
        businessId,
        establishmentId,
    }: IBusinessPersonAssignmentGetQueryRequest): Promise<
        IBusinessPersonAssignEntity[] | null
    > {
        try {
            const query = buildQueryString({
                personId,
                businessId,
                establishmentId,
            });

            const response = await apiClient.get(
                `${this.baseUrl}${query ? `?${query}` : ""}`
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
                `${this.baseUrl}/${id}${lang ? `?lang=${lang}` : ""}`
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
        body: IBusinessPersonAssignmentRequest
    ): Promise<IBusinessPersonAssignEntity | null> {
        try {
            const response = await apiClient.post(`${this.baseUrl}`, body);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при создании PersonAssignment `);
            return null;
        }
    }
    async update(
        id: string,
        body: IBusinessPersonAssignmentRequest
    ): Promise<IBusinessPersonAssignEntity | null> {
        try {
            const response = await apiClient.patch(
                `${this.baseUrl}/${id}`,

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
        body: IBusinessPersonAssignmentRequest
    ): Promise<IBusinessPersonAssignEntity | null> {
        try {
            const response = await apiClient.patch(
                `${this.baseUrl}/${id}`,

                body
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при обновлении PersonAssignment ${id}`);
            return null;
        }
    }
}
