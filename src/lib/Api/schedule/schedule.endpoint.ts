import { IScheduleEntity } from "@/lib/models/api/entities/schedule.entity";
import apiClient from "../ApiClient";

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
}
