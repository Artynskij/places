import { IPaginationCredentials } from "../api.type";
import { IApiEstablishment } from "../IApi";
import EstablishmentApi from "./establishment.endpoints";
import { IApiEstablishmentResponse, IApiEstablishmentsResponse } from "./types";

export class EstablishmentService {
  private establishmentApi: EstablishmentApi;

  constructor() {
    this.establishmentApi = new EstablishmentApi();
  }

  async getAllEstablishments(): Promise<IApiEstablishmentResponse | null> {
    const response = await this.establishmentApi.getAllEstablishment();
    return response ? response : null;
  }

  async getEstablishmentById(
    id: string,
    lang: string
  ): Promise<IApiEstablishmentResponse | null> {
    const response = await this.establishmentApi.getEstablishmentById(id, lang);
    return response ? response : null;
  }

  async getEstablishmentByPagination(
    body: IPaginationCredentials
  ): Promise<IApiEstablishmentsResponse | null> {
    const response = await this.establishmentApi.getEstablishmentByPagination(
      body
    );
    return response ? response : null;
  }
}
