import {
    IEstablishmentResponse,
    IEstablishmentItemsResponse,
} from "@/lib/models/api/response/establishment/IEstablishment.response";
import apiClient from "../ApiClient";
import { IPaginationEstablishmentRequest } from "@/lib/models/api/request/establishment/IPaginationEstablishment.request";

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
            console.error(
                "Ошибка при получении заведений с пагинацией:",
                error
            );
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
            console.error(`Ошибка при получении заведения с ID ${id}:`, error);
            return null;
        }
    }
}
