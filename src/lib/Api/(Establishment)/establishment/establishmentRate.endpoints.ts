import { IEstablishmentRateEntity, IEstablishmentRateRequest } from "@/lib/models";
import apiClient from "../../ApiClient";

export default class EstablishmentRateApi {
    constructor() {}

    async create(body:IEstablishmentRateRequest):Promise<IEstablishmentRateEntity | null> {
        try {
            const response = await apiClient.post(
                `/establishment-rates`,
                body
            );

            return response.data;
        } catch (error) {
            console.error("Ошибка при получении заведений с пагинацией:");
            return null;
        }
    }
}
