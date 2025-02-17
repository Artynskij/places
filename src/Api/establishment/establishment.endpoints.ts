import {  IApiTag, IPaginationCredentials } from "../api.type";
import apiClient from "../ApiClient";
import { IApiEstablishmentResponse, IApiEstablishmentsResponse } from "./types";

export default class EstablishmentApi {
  constructor() {}

  async getAllEstablishment(): Promise<IApiEstablishmentResponse | null> {
    try {
      const response = await apiClient.get(`/establishment`);
      return response.data;
    } catch (error) {
      console.error("Ошибка при получении всех заведений:", error);
      return null;
    }
  }

  async getEstablishmentByPagination(
    body: IPaginationCredentials
  ): Promise<IApiEstablishmentsResponse | null> {
    try {
      const response = await apiClient.post(`/establishment/getAll`, body);
      return response.data;
    } catch (error) {
      console.error("Ошибка при получении заведений с пагинацией:", error);
      return null;
    }
  }

  async getEstablishmentById(
    id: string,
    lang: string
  ): Promise<IApiEstablishmentResponse | null> {
    try {
      const response = await apiClient.get(`/establishment/${id}?lang=${lang}`);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при получении заведения с ID ${id}:`, error);
      return null;
    }
  }

  async getTagsOfEstablishment(
    id: string[],
    lang: string
  ): Promise<IApiTag[] | null> {
    try {
      const response = await apiClient.get(
        `/tags-of-establishments?establishmentId=${id.join(",")}&lang=${lang}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Ошибка при получении тегов для заведения с ID ${id}:`,
        error
      );
      return null;
    }
  }
}
