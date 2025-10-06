import {
    IScheduleCreateResponse,
    IScheduleEntity,
    IScheduleRequest,
} from "@/lib/models";
import apiClient from "../../base/ApiClient";
import { IBaseModerationResponse } from "@/lib/models/server/response/base/base-moderation.response";

export class ScheduleApi {
    constructor() {}

    async getScheduleByEstablishmentId(
        id: string
    ): Promise<IScheduleEntity[] | null> {
        try {
            const response = await apiClient.get(
                `/schedule/by-establishment/${id}`
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении расписания с ID ${id}`);
            return null;
        }
    }
    async createScheduleDay(
        body: IScheduleRequest
    ): Promise<IBaseModerationResponse | null> {
        try {
            const response = await apiClient.post(`/schedule`, body);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при создании расписания `);
            return null;
        }
    }
    async updateScheduleDay(
        id: string,
        body: IScheduleRequest
    ): Promise<IBaseModerationResponse | null> {
        try {
            const response = await apiClient.patch(`/schedule/${id}`, body);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при обновлении расписания `);
            return null;
        }
    }
}
