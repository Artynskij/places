import { ITravelProgressEntity } from "@/lib/models";

import {
    IPersonEntity,
    IPersonWithContentEntity,
} from "@/lib/models/server/entities/(person)/person.entity";
import { IPersonRequest } from "@/lib/models/server/request/(Person)/person.request";
import { IPaginationBaseRequest } from "@/lib/models/server/base/pagination-base.request";
import apiClient from "../../base/ApiClient";

export default class PersonApi {
    constructor() {}
    async create(body: IPersonRequest): Promise<IPersonEntity | null> {
        try {
            const response = await apiClient.post(`/persons`, body);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при создании Персоны`);
            return null;
        }
    }

    async getAll(
        body: IPaginationBaseRequest
    ): Promise<IPersonWithContentEntity[] | null> {
        try {
            const response = await apiClient.post(`/persons/get-all`, body);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении данных getAll Person `);
            return null;
        }
    }
    async getById(
        id: string,
        lang?: string
    ): Promise<IPersonWithContentEntity | null> {
        try {
            const response = await apiClient.get(
                `/persons/${id}${lang ? `?lang=${lang}` : ""}`
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении данных Person с ID ${id}:`);
            return null;
        }
    }

    async update(
        id: string,
        body: IPersonRequest
    ): Promise<IPersonWithContentEntity | null> {
        try {
            const response = await apiClient.patch(`/persons/${id}`, body);

            return response.data;
        } catch (error) {
            console.error(`Ошибка при обновлении Person ${id}`);
            return null;
        }
    }
    async getTravelProgress(
        personId: string
    ): Promise<ITravelProgressEntity | null> {
        try {
            const response = await apiClient.get(
                `/maps/travel-progress/${personId}`
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении TravelProgress ${personId}`);
            return null;
        }
    }
    async getByEmail(email: string): Promise<string | null> {
        try {
            const response = await apiClient.get(
                `/persons/by-email?email=${email}`
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении Person byEmail ${email}`);
            return null;
        }
    }
}
