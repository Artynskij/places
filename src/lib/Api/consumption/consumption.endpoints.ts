import { IConsumptionRequest, IConsumptionResponse } from "@/lib/models";
import apiClient from "../base/ApiClient";
import { getQueryParamsForApi } from "@/lib/helpers/get-query-params-for-api";
import { IConsumptionTypeContentEntity, IConsumptionTypeEntity } from "@/lib/models/server/entities/consumption.entity";

export class ConsumptionApi {
    private baseUrl: string;
    constructor() {
        this.baseUrl = "content-consumption";
    }
    async create(body: IConsumptionRequest) {
        try {
            const response = await apiClient.post(`/content-consumption`, body);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при создании Consumption`);
            return null;
        }
    }
    async get(query: IConsumptionResponse) {
        try {
            const queryParams = getQueryParamsForApi(query);
            const response = await apiClient.get(
                `/content-consumption${queryParams ? `?${queryParams}` : ""}`
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении Consumption`);
            return null;
        }
    }

    async getTypesContent(): Promise<IConsumptionTypeContentEntity|null> {
        try {
            const response = await apiClient.get(`/content-types`);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении content-types`);
            return null;
        }
    }
    async getTypes(): Promise<IConsumptionTypeEntity[] | null> {
        try {
            const response = await apiClient.get(`/content-consumption-types`);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении content-consumption-types`);
            return null;
        }
    }
}
