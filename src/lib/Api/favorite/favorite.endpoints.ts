import {
    IFavoriteCreateRequest,
    IFavoriteGetQueryRequest,
} from "@/lib/models/server/request/(Person)/favorite.request";

import { IFavoriteEntity } from "@/lib/models";
import apiClient from "../base/ApiClient";

export default class FavoriteApi {
    constructor() {}

    async create(
        body: IFavoriteCreateRequest
    ): Promise<IFavoriteEntity | null> {
        try {
            const response = await apiClient.post(`/favorites`, body);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при отправке favorite`);
            return null;
        }
    }
    async getByQuery(
        query: IFavoriteGetQueryRequest
    ): Promise<IFavoriteEntity[] | null> {
        try {
            const queryParams = Object.entries(query)
                .map(([key, value]) => `${key}=${value}`)
                .join("&");
            const response = await apiClient.get(
                `/favorites${queryParams ? `?${queryParams}` : ""}`
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении favorite ByQuery`);
            return null;
        }
    }
    async delete(id: string): Promise<IFavoriteEntity | null> {
        try {
            const response = await apiClient.delete(`/favorites/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при удалении favorite`);
            return null;
        }
    }
}
