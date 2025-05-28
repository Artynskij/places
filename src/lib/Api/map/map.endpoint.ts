import { ILocationsEntity } from "@/lib/models/api/entities/locations.entity";
import apiClient from "../ApiClient";
import { IMapQueryRequest } from "@/lib/models/api/request/map/IMapQuery.request";
import { ISearchItemEntity } from "@/lib/models";

export default class MapApi {
    constructor() {}
    async getEstablishmentByCoord({
        lat,
        lon,
        radius,
    }: IMapQueryRequest): Promise<ISearchItemEntity[] | null> {
        try {
            const response = await apiClient.get(
                `maps/query/establishments?lat=${lat}&lon=${lon}&radius=${radius}`
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
                `maps/query/locations?lat=${lat}&lon=${lon}&radius=${radius}`
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении локаций lat=${lat}&lon=${lon}`);
            return null;
        }
    }
     async getBlobProxy(): Promise<{ url: string } | null> {
        try {
            const response = await apiClient.get(`/blob-proxy/resolve`);
            return response.data;
        } catch (error) {
            console.error(
                `Ошибка при запросе по получению blob-proxy для картинок.`
            );
            return null;
        }
    }
}
