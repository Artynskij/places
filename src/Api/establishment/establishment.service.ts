import { IPaginationEstablishmentRequest } from "@/models/api/request/establishment/IPaginationEstablishment.request";
import EstablishmentApi from "./establishment.endpoints";

import { IEstablishmentItemsResponse, IEstablishmentResponse } from "@/models/api/response/establishment/IEstablishment.response";

export class EstablishmentService {
  private establishmentApi: EstablishmentApi;

  constructor() {
    this.establishmentApi = new EstablishmentApi();
  }

  async getAllEstablishments(): Promise<IEstablishmentItemsResponse | null> {
    const response = await this.establishmentApi.getAllEstablishment();
    return response ? response : null;
  }

  async getEstablishmentById(
    id: string,
    lang: string
  ): Promise<IEstablishmentResponse | null> {
    const response = await this.establishmentApi.getEstablishmentById(id, lang);
    return response ? response : null;
  }

  async getEstablishmentByPagination(
    body: IPaginationEstablishmentRequest
  ): Promise<IEstablishmentItemsResponse | null> {
    const response = await this.establishmentApi.getEstablishmentByPagination(
      body
    );
    return response ? response : null;
  }
}
