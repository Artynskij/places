
import { IModerationBatchEntity } from "@/lib/models/server/entities/moderation.entity";
import apiClient from "../base/ApiClient";



export default class ModerationApi {
    constructor() {}
    async getBatchId(SubmittedById: string): Promise<IModerationBatchEntity | null> {
        try {
            const response = await apiClient.post(`/moderation-batch`, {
                SubmittedById: SubmittedById,
            });
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении Batch id`);
            return null;
        }
    }
    async createSessionId(): Promise<{sessionId:string} | null> {
        try {
            const response = await apiClient.get(`/session/generate`);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при create session id`);
            return null;
        }
    }
    async createSessionIds(count: number): Promise<{sessionId:string}[] | null> {
        try {
            const response = await apiClient.post(
                `/session/generate-multiple`,
                { count: count }
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при create session ids`);
            return null;
        }
    }
}
