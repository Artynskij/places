import { ILocationsWithContentEntity } from "@/lib/models/server/entities/locations.entity";

import { IMapQueryRequest } from "@/lib/models/server/request/map/map.request";
import { ISearchItemEntity } from "@/lib/models";
import apiClient from "../base/ApiClient";

export default class MapApi {
    constructor() {}
    async getEstablishmentByCoord({
        lat,
        lon,
        radius,
    }: IMapQueryRequest): Promise<ISearchItemEntity[] | null> {
        try {
            const response = await apiClient.get(
                `/maps/query/establishments?lat=${lat}&lon=${lon}&radius=${radius}`
            );
            return response.data;
        } catch (error) {
            console.error(
                `Ошибка при получении заведений для карты lat=${lat}&lon=${lon}`
            );
            return null;
        }
    }
    async getLocationByCoord({
        lat,
        lon,
        radius,
    }: IMapQueryRequest): Promise<ISearchItemEntity[] | null> {
        try {
            const response = await apiClient.get(
                `/maps/query/locations?lat=${lat}&lon=${lon}&radius=${radius}`
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении локаций lat=${lat}&lon=${lon}`);
            return null;
        }
    }
}
