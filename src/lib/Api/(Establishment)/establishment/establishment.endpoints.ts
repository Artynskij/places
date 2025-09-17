import apiClient from "../../ApiClient";
import {
    IEstablishmentItemsResponse,
    IEstablishmentResponse,
} from "@/lib/models/server/response/(Establishment)/establishment.response";
import {
    IEstablishmentCreateRequest,
    IPaginationEstablishmentRequest,
} from "@/lib/models/server/request/(Establishment)/establishment.request";
import { IEstablishmentEntity } from "@/lib/models";

export default class EstablishmentApi {
    constructor() {}

    async getAll(): Promise<IEstablishmentItemsResponse | null> {
        try {
            const response = await apiClient.get(`/establishment`);
            return response.data;
        } catch (error) {
            console.error("Ошибка при получении всех заведений:", error);
            return null;
        }
    }

    async getByPagination(
        body: IPaginationEstablishmentRequest
    ): Promise<IEstablishmentItemsResponse | null> {
        try {
            const response = await apiClient.post(
                `/establishment/getAll`,
                body
            );

            return response.data;
        } catch (error) {
            console.error("Ошибка при получении заведений с пагинацией:");
            return null;
        }
    }

    async getById(
        id: string,
        lang?: string
    ): Promise<IEstablishmentResponse | null> {
        try {
            const response = await apiClient.get(
                `/establishment/${id}${lang ? `?lang=${lang}` : ""}`
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении заведения с ID ${id}:`);
            return null;
        }
    }
    async create(
        body: IEstablishmentCreateRequest
    ): Promise<IEstablishmentEntity | null> {
        try {
            const response = await apiClient.post(`/establishment`, body);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при создании заведения.`);
            return null;
        }
    }
    async update(
        id: string,
        body: IEstablishmentCreateRequest
    ): Promise<IEstablishmentEntity | null> {
        try {
            const response = await apiClient.patch(
                `/establishment/${id}`,
                body
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при обновлении заведения.`);
            return null;
        }
    }
}
