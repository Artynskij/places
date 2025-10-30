import {
    IRateEstablishmentAllResponse,
    IRateEstablishmentEntity,
    IRateEstablishmentGetAllRequest,
    IRateEstablishmentRequest,
} from "@/lib/models";
import apiClient from "../../base/ApiClient";
import { IBaseModerationResponse } from "@/lib/models/server/base/base.response";

export default class EstablishmentRateApi {
    constructor() {}

    async create(
        body: IRateEstablishmentRequest
    ): Promise<IBaseModerationResponse | null> {
        try {
            const response = await apiClient.post(`/establishment-rates`, body);

            return response.data;
        } catch (error) {
            console.error("Ошибка при получении заведений с пагинацией:");
            return null;
        }
    }
    async getAll(
        body: IRateEstablishmentGetAllRequest
    ): Promise<IRateEstablishmentAllResponse | null> {
        try {
            const response = await apiClient.post(
                `/establishment-rates/get-all`,
                body
            );

            return response.data;
        } catch (error) {
            console.error("Ошибка при получении заведений с пагинацией:");
            return null;
        }
    }
}
