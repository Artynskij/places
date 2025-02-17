import { IApiTag } from "../api.type";
import apiClient from "../ApiClient";
import { ITagsFilterCredentials } from "./types";

export class TagsApi {
  async getAllTagsOfEstablishment(
    body: ITagsFilterCredentials
  ): Promise<IApiTag[] | null> {
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
}
