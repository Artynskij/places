import axios from "axios";
import {
  IApiArticle,
  IApiCategory,
  IApiEstablishment,
  IApiEstablishmentResponse,
  IApiEstablishmentsResponse,
  IApiTag,
  IApiTagsResponse,
} from "./IApi";

const urlApi = "http://localhost:49400";
const urlBlob = "http://localhost:49160";
const urlContentManager = "http://localhost:49200";

interface IPaginationCredentials {
  pagination?: {
    page?: number;
    pageSize?: number;
  };
  filter?: {
    typeIds?: string[];
    categoryIds?: string[];
    tagsIds?: string[];
  };
  lang?: string;
  ids?: string[];
}
interface ITagsFilterCredentials {
  ids?: string[];
  lang: string;
  establishmentIds?: string[];
}
export class ApiEstablishment {
  constructor() {}

  async getAllEstablishment(): Promise<IApiEstablishmentResponse | null> {
    try {
      const response = await axios.get(`${urlApi}/establishment`);
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
      const response = await axios.post(`${urlApi}/establishment/getAll`, body);
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
      const response = await axios.get(
        `${urlApi}/establishment/${id}?lang=${lang}`
      );
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
      const response = await axios.get(
        `${urlApi}/tags-of-establishments?establishmentId=${id.join(
          ","
        )}&lang=${lang}`
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


export class ApiTags {
  async getAllTagsOfEstablishment(
    body: ITagsFilterCredentials
  ): Promise<IApiTag[] | null> {
    try {
      const response = await axios.post(
        `${urlApi}/tags-of-establishments/get-all`,
        body
      );
      return response.data;
    } catch (error) {
      console.error(`Ошибка при получении всех тегов:`, error);
      return null;
    }
  }
  async getAllFiltersTagsOfEstablishment(
    body: ITagsFilterCredentials
  ): Promise<IApiTagsResponse[]> {
    const response = await axios.post(
      `${urlApi}/tags-of-establishments/get-all-filters`,
      body
    );
    return response.data;
  }
  async getAllTags() {
    const response = await axios.get(`${urlApi}/tags`).then((res) => res.data);
    return response;
  }
}
export class ApiCategory {
  async getAllTypesOfEst(body: { ids?: string[]; lang: string }) {
    const res = await axios.post(
      `${urlApi}/types-of-establishment/get-all`,
      body
    );
    return res.data;
  }
  async getAllCategoryOfEst(body: { ids?: string[]; lang: string }) {
    const res = await axios.post(
      `${urlApi}/category-of-establishment/get-all`,
      body
    );
    return res.data;
  }
}