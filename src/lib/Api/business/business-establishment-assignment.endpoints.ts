// import {
//     IBusinessAssignmentGetQueryRequest,
//     IBusinessAssignmentRequest,
//     IBusinessPersonAssignEntity,
// } from "@/lib/models";
import {
    IBusinessEstablishmentAssignEntity,
    IBusinessEstablishmentAssignmentGetQueryRequest,
    IBusinessEstablishmentAssignmentRequest,
} from "@/lib/models";
import apiClient from "../base/ApiClient";
import { buildQueryString } from "@/lib/helpers/build-query-params-for-api";

export class BusinessEstablishmentAssignmentApi {
    private baseUrl: string;
    constructor() {
        this.baseUrl = "/business-establishments";
    }
    async getByQuery({
        personId,
        businessId,
        establishmentId,
    }: IBusinessEstablishmentAssignmentGetQueryRequest): Promise<
        IBusinessEstablishmentAssignEntity[] | null
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
                `Ошибка при получении данных EstablishmentAssignment по query.`
            );
            return null;
        }
    }
    async getById(
        id: string,
        lang?: string
    ): Promise<IBusinessEstablishmentAssignEntity | null> {
        try {
            const response = await apiClient.get(
                `${this.baseUrl}/${id}${lang ? `?lang=${lang}` : ""}`
            );
            return response.data;
        } catch (error) {
            console.error(
                `Ошибка при получении данных EstablishmentAssignment с ID ${id}:`
            );
            return null;
        }
    }

    async create(
        body: IBusinessEstablishmentAssignmentRequest
    ): Promise<IBusinessEstablishmentAssignEntity | null> {
        try {
            const response = await apiClient.post(`${this.baseUrl}`, body);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при создании EstablishmentAssignment `);
            return null;
        }
    }
    async update(
        id: string,
        body: IBusinessEstablishmentAssignmentRequest
    ): Promise<IBusinessEstablishmentAssignEntity | null> {
        try {
            const response = await apiClient.patch(
                `${this.baseUrl}/${id}`,

                body
            );
            return response.data;
        } catch (error) {
            console.error(
                `Ошибка при обновлении EstablishmentAssignment ${id}`
            );
            return null;
        }
    }
    async delete(
        id: string,
        body: IBusinessEstablishmentAssignmentRequest
    ): Promise<IBusinessEstablishmentAssignEntity | null> {
        try {
            const response = await apiClient.patch(
                `${this.baseUrl}/${id}`,

                body
            );
            return response.data;
        } catch (error) {
            console.error(
                `Ошибка при обновлении EstablishmentAssignment ${id}`
            );
            return null;
        }
    }
}
