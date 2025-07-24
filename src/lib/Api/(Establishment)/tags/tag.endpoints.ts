import { ITagAndEstablishmentConnectionRequest } from "@/lib/models/api/request/(Establishment)/tags/ITagConnection.request";
import { IPaginationRequest } from "../../../models/api/request/IPagination.request";

import apiClient from "../../ApiClient";

import { ITagsOfEstablishmentRequest } from "@/lib/models/api/request/(Establishment)/tags/IPaginationTags.request";
import {
    ITagsOfEstablishmentFilterResponse,
    ITagsOfEstablishmentResponse,
} from "@/lib/models/api/response/(Establishment)/tags/ITags.response";

export class TagsApi {
    async getAllTagsOfEstablishments(
        body: ITagsOfEstablishmentRequest
    ): Promise<ITagsOfEstablishmentResponse[] | null> {
        try {
            const response = await apiClient.post(
                `/tags-of-establishments/get-all`,
                body
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении всех тегов: для establishemnt`);
            return null;
        }
    }
    async getAllTagsOfEstablishmentFilter(
        body: ITagsOfEstablishmentRequest
    ): Promise<ITagsOfEstablishmentFilterResponse | null> {
        try {
            const response = await apiClient.post(
                `/tags-of-establishments/get-all-filters`,
                body
            );
            return response.data;
        } catch (error) {
            console.error(
                `Ошибка при получении всех тегов: для блока фильтров`
            );
            return null;
        }
    }
    async createTagEstablishmentConnect(
        body: ITagAndEstablishmentConnectionRequest
    ): Promise<ITagsOfEstablishmentFilterResponse | null> {
        try {
            const response = await apiClient.post(
                `/tags-of-establishments`,
                body
            );
            return response.data;
        } catch (error) {
            console.error(
                `Ошибка при получении всех тегов: для блока фильтров`
            );
            return null;
        }
    }
}
