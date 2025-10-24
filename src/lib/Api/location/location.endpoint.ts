import apiClient from "../base/ApiClient";
import {
    ILocationPaginationRequest,
    ILocationWithContentPareEntity,
    ILocationUpdateRequest,
    ILocationPaginationResponse,
} from "@/lib/models";

export default class LocationApi {
    constructor() {}
    async getById(
        id: string,
        lang?: string
    ): Promise<ILocationWithContentPareEntity | null> {
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
        body: ILocationPaginationRequest
    ): Promise<ILocationPaginationResponse | null> {
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
    }): Promise<ILocationWithContentPareEntity[] | null> {
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
    ): Promise<ILocationWithContentPareEntity | null> {
        try {
            const response = await apiClient.patch(`/locations/${id}`, body);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при обновлении объекта.`);
            return null;
        }
    }
}
