import { IScheduleCreateRequest, IScheduleCreateResponse, IScheduleEntity } from "@/lib/models";
import apiClient from "../../ApiClient";

export class ScheduleApi {
    constructor() {}
    async getScheduleById(id: string): Promise<IScheduleEntity[] | null> {
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
        body: IScheduleCreateRequest
    ): Promise<IScheduleCreateResponse | null> {
        try {
            const response = await apiClient.post(`/schedule`, body);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при создании расписания `);
            return null;
        }
    }
}
