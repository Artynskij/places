import { ILocationsEntity } from "@/lib/models/api/entities/locations.entity";
import apiClient from "../ApiClient";
import { ILocationInsidePaginationRequest } from "@/lib/models/api/request/location/ILocationInsidePagination.request";

export default class LocationApi {
    constructor() {}
    async getLocationById(
        id: string,
        lang?: string
    ): Promise<ILocationsEntity | null> {
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
    async getListLocationInside(
        body: ILocationInsidePaginationRequest
    ): Promise<ILocationsEntity[] | null> {
        try {
            const response = await apiClient.post(`/locations/get-all`, body);
            return response.data;
        } catch (error) {
            console.error(
                `Ошибка при получении внутренних локаций с пагинацией:`
            
            );
            return null;
        }
    }
}
