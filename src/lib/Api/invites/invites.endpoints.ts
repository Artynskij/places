import { IInvitesRequest } from "@/lib/models/server/request/invites.request";
import apiClient from "../base/ApiClient";
import { buildQueryString } from "@/lib/helpers/build-query-params-for-api";
import { IInvitesByQueryItemResponse } from "@/lib/models";

export default class InvitesApi {
    constructor() {}
    async create(body: IInvitesRequest): Promise<{ id: string } | null> {
        try {
            const response = await apiClient.post(`/invites`, body);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при CREATE приглашения`);
            return null;
        }
    }
    async getByQuery({
        personId,
        businessId,
        lang,
    }: {
        personId?: string;
        businessId?: string;
        lang: string;
    }): Promise<IInvitesByQueryItemResponse[] | null> {
        try {
            const query = buildQueryString({
                personId,
                businessId,
                lang,
            });
            const response = await apiClient.get(`/invites?${query}`);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при GET приглашения`);
            return null;
        }
    }
    async applyPerson(id: string): Promise<"ok" | null> {
        try {
            const response = await apiClient.patch(`/invites/${id}/apply`);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при Apply приглашения`);
            return null;
        }
    }
}
