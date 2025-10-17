import { IConsumptionRequest, IConsumptionResponse } from "@/lib/models";
import { ConsumptionApi } from "./consumption.endpoints";
import {
    IConsumptionTypeContentEntity,
    IConsumptionTypeEntity,
} from "@/lib/models/server/entities/consumption.entity";

export class ConsumptionService {
    private ConsumptionApi: ConsumptionApi;
    constructor() {
        this.ConsumptionApi = new ConsumptionApi();
    }
    async create(body: IConsumptionRequest) {
        const response = await this.ConsumptionApi.create(body);
        return response;
    }
    async get(query: IConsumptionResponse) {
        const response = await this.ConsumptionApi.get(query);
        return response;
    }

    async getTypesContent(): Promise<IConsumptionTypeContentEntity | null> {
        const response = await this.ConsumptionApi.getTypesContent();
        return response;
    }
    async getTypes(): Promise<IConsumptionTypeEntity[] | null> {
        const response = await this.ConsumptionApi.getTypes();
        return response;
    }
}
