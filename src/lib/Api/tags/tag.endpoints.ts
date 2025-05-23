import { IPaginationRequest } from "./../../models/api/request/IPagination.request";

import { ITagEntity } from "@/lib/models/api/entities/tag.entity";
import apiClient from "../ApiClient";

import { ITagsOfEstablishmentRequest } from "@/lib/models/api/request/tags/IPaginationTags.request";
import {
    ITagsOfEstablishmentFilterResponse,
    ITagsOfEstablishmentResponse,
} from "@/lib/models/api/response/tags/ITags.response";

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
            console.error(`Ошибка при получении всех тегов: для блока фильтров`);
            return null;
        }
    }
    // async getTagsByEstablishment({
    //   ids,
    //   lang,
    // }: IPaginationRequest): Promise<ITagEntity[] | null> {
    //   try {
    //     const response = await apiClient.get(
    //       `/tags-of-establishments?establishmentId=${ids?.join(",")}&lang=${lang}`
    //     );
    //     return response.data;
    //   } catch (error) {
    //     console.error(
    //       `Ошибка при получении тегов для заведения с ID ${ids}:`,
    //       error
    //     );
    //     return null;
    //   }
    // }
}
