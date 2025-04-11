import { IPaginationEstablishmentRequest } from "@/lib/models/api/request/establishment/IPaginationEstablishment.request";
import EstablishmentApi from "./establishment.endpoints";

import {
    IEstablishmentItemsResponse,
    IEstablishmentResponse,
} from "@/lib/models/api/response/establishment/IEstablishment.response";
import { IEstablishmentFront } from "@/lib/models";
import EstablishmentMapper from "./establishment.mapper";

export class EstablishmentService {
    private establishmentApi: EstablishmentApi;
    private establishmentMapper: EstablishmentMapper;

    constructor() {
        this.establishmentApi = new EstablishmentApi();
        this.establishmentMapper = new EstablishmentMapper();
    }

    async getAllEstablishments(): Promise<IEstablishmentFront[] | null> {
        const response = await this.establishmentApi.getAllEstablishment();
        return response
            ? response.establishmentItems.map((establishment) => {
                  return this.establishmentMapper.transformToFront({
                      establishment: establishment,
                      info: {cdnHost:response.cdnHost, totalEstablishment:response.total},
                  });
              })
            : null;
    }

    async getEstablishmentById(
        id: string,
        lang: string
    ): Promise<IEstablishmentFront | null> {
        const response = await this.establishmentApi.getEstablishmentById(
            id,
            lang
        );
        return response
            ? this.establishmentMapper.transformToFront({
                  establishment: response.establishment,
                  info: {cdnHost:response.cdnHost},
              })
            : null;
    }

    async getEstablishmentByPagination(
        body: IPaginationEstablishmentRequest
    ): Promise<IEstablishmentFront[] | null> {
        const response =
            await this.establishmentApi.getEstablishmentByPagination(body);
        return response 
            ? response.establishmentItems
                  .filter(
                      (establishment) =>
                          establishment.content &&
                          establishment.content.value?.[0]?.value?.details &&
                          establishment.content.media?.gallery
                  )
                  .map((establishment) => {
                      return this.establishmentMapper.transformToFront({
                          establishment: establishment,
                          info: {cdnHost:response.cdnHost, totalEstablishment:response.total},
                      });
                  })
            : null;
    }
}
