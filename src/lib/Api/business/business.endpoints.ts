import {
    IBusinessEntity,
    IBusinessWithContentEntity,
} from "@/lib/models/server/entities/business.entity";

import {
    IBusinessGetAllQueryRequest,
    IBusinessRequest,
} from "@/lib/models/server/request/business/business.request";
import { IBaseModerationResponse } from "@/lib/models/server/response/base/base-moderation.response";
import apiClient from "../base/ApiClient";

export default class BusinessApi {
    constructor() {}

    async getAll(
        query: IBusinessGetAllQueryRequest
    ): Promise<IBusinessWithContentEntity[] | null> {
        try {
            const params = new URLSearchParams();
            Object.keys(query)
                .map((key) => ({
                    key,
                    value: query[key as keyof IBusinessGetAllQueryRequest],
                }))
                .forEach((item) => {
                    if (!item.value) return;
                    params.append(item.key, item.value?.toString());
                });
            const queryString = params.toString();
            const url = queryString
                ? `/businesses?${queryString}`
                : "/businesses";
            const response = await apiClient.get(url);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении данных getAll Business`);
            return null;
        }
    }
    async getById(
        id: string,
        lang?: string
    ): Promise<IBusinessWithContentEntity | null> {
        try {
            const response = await apiClient.get(
                `/businesses/${id}${lang ? `?lang=${lang}` : ""}`
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении данных Business с ID ${id}:`);
            return null;
        }
    }

    async create(body: IBusinessRequest): Promise<IBaseModerationResponse | null> {
        try {
            const response = await apiClient.post(`/businesses`, body);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при создании Business `);
            return null;
        }
    }
    async update(
        id: string,
        body: IBusinessRequest
    ): Promise<IBaseModerationResponse | null> {
        try {
            const response = await apiClient.patch(`/businesses/${id}`, body);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при обновлении Business ${id}`);
            return null;
        }
    }
}
