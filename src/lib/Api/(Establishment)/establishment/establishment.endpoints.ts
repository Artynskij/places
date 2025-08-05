import {
    IEstablishmentItemsResponse,
    IEstablishmentResponse,
} from "@/lib/models/api/response/(Establishment)/establishment.response";
import apiClient from "../../ApiClient";
import {
    IEstablishmentCreateRequest,
    IPaginationEstablishmentRequest,
} from "@/lib/models/api/request/(Establishment)/establishment.request";
import { IEstablishmentCreatedEntity, IEstablishmentEntity } from "@/lib/models";

export default class EstablishmentApi {
    constructor() {}

    async getAllEstablishment(): Promise<IEstablishmentItemsResponse | null> {
        try {
            const response = await apiClient.get(`/establishment`);
            return response.data;
        } catch (error) {
            console.error("Ошибка при получении всех заведений:", error);
            return null;
        }
    }

    async getEstablishmentByPagination(
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

    async getEstablishmentById(
        id: string,
        lang: string
    ): Promise<IEstablishmentResponse | null> {
        try {
            const response = await apiClient.get(
                `/establishment/${id}?lang=${lang}`
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении заведения с ID ${id}:`);
            return null;
        }
    }
    async createEstablishment(body: IEstablishmentCreateRequest): Promise<IEstablishmentCreatedEntity | null> {
        try {
            const response = await apiClient.post(`/establishment`, body);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при создании заведения.`);
            return null;
        }
    }
}
