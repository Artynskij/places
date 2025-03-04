import { IPaginationRequest } from "./../../models/api/request/IPagination.request";

import { ITagEntity } from "@/models/api/entities/tag.entity";
import apiClient from "../ApiClient";

import { ITagsOfEstablishmentRequest } from "@/models/api/request/tags/IPaginationTags.request";
import {
  ITagsOfEstablishmentFilterResponse,
  ITagsOfEstablishmentResponse,
} from "@/models/api/response/tags/ITags.response";

export class TagsApi {
  async getAllTagsOfEstablishment(
    body: ITagsOfEstablishmentRequest
  ): Promise<ITagsOfEstablishmentResponse[] | null> {
    try {
      const response = await apiClient.post(
        `/tags-of-establishments/get-all`,
        body
      );
      return response.data;
    } catch (error) {
      console.error(`Ошибка при получении всех тегов:`, error);
      return null;
    }
  }
  async getAllTagsOfEstablishmentFilter(
    body: ITagsOfEstablishmentRequest
  ): Promise<ITagsOfEstablishmentFilterResponse[] | null> {
    try {
      const response = await apiClient.post(
        `/tags-of-establishments/get-all-filters`,
        body
      );
      return response.data;
    } catch (error) {
      console.error(`Ошибка при получении всех тегов:`, error);
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
