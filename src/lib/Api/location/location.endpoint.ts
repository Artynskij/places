import { ILocationsWithContentEntity } from "@/lib/models/server/entities/locations.entity";
import apiClient from "../ApiClient";
import {
    ILocationInsidePaginationRequest,
    ILocationUpdateRequest,
} from "@/lib/models/server/request/location/location.request";

export default class LocationApi {
    constructor() {}
    async getLocationById(
        id: string,
        lang?: string
    ): Promise<ILocationsWithContentEntity | null> {
        try {
            const response = await apiClient.get(
                lang ? `/locations/${id}?lang=${lang}` : `/locations/${id}`
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении локации с ID ${id}:`);
            return null;
        }
    }
    async getAll(
        body: ILocationInsidePaginationRequest
    ): Promise<ILocationsWithContentEntity[] | null> {
        try {
            const response = await apiClient.post(`/locations/get-all`, body);
            return response.data;
        } catch (error) {
            console.error(
                `Ошибка при получении внутренних локаций с пагинацией.`
            );
            return null;
        }
    }
    async getBreadcrumbData(body: {
        ids: string;
        lang: string;
    }): Promise<ILocationsWithContentEntity[] | null> {
        try {
            const response = await apiClient.post(
                `/locations/get-all-breadcrumbs`,
                body
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении breadcrumbs.`);
            return null;
        }
    }
    async update(
        id: string,
        body: ILocationUpdateRequest
    ): Promise<ILocationsWithContentEntity | null> {
        try {
            const response = await apiClient.patch(`/locations/${id}`, body);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при обновлении объекта.`);
            return null;
        }
    }
}
