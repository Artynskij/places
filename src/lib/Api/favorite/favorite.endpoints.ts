import {
    IFavoriteCreateRequest,
    IFavoriteEntity,
    IFavoriteGetQueryRequest,
} from "@/lib/models";
import apiClient from "../base/ApiClient";
import { buildQueryString } from "@/lib/helpers/build-query-params-for-api";

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
            const queryParams = buildQueryString(query);
            const response = await apiClient.get(
                `/favorites${queryParams ? `?${queryParams}` : ""}`
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении favorite ByQuery`);
            return null;
        }
    }
    async delete(id: string): Promise<boolean | null> {
        try {
            const response = await apiClient.delete(`/favorites/${id}`);
            return response.data || response.status === 200 ? true : false;
        } catch (error) {
            console.error(`Ошибка при удалении favorite`);
            return null;
        }
    }
}
