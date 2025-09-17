import { IAddressEntity } from "@/lib/models/server/entities/(person)/address.entity";
import apiClient from "../../ApiClient";
import { IAddressRequest } from "@/lib/models/server/request/(Person)/address.request";

export default class AddressApi {
    constructor() {}
    async getAddressById(
        id: string,
        lang?: string
    ): Promise<IAddressEntity | null> {
        try {
            const response = await apiClient.get(
                `/addresses/${id}${lang ? `?lang=${lang}` : ""}`
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении данных Address с ID ${id}:`);
            return null;
        }
    }

    async createAddress(body: IAddressRequest): Promise<IAddressEntity | null> {
        try {
            const response = await apiClient.post(`/addresses`, body);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при создании Address `);
            return null;
        }
    }
    async updateAddress(
        id: string,
        body: IAddressRequest
    ): Promise<IAddressEntity | null> {
        try {
            const response = await apiClient.patch(`/addresses/${id}`, body);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при обновлении Address ${id}`);
            return null;
        }
    }
}
