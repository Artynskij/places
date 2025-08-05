import EstablishmentApi from "./establishment.endpoints";

import {
    IEstablishmentCreatedEntity,
    IEstablishmentEntity,
    IEstablishmentFront,
} from "@/lib/models";
import EstablishmentMapper from "./establishment.mapper";
import {
    IEstablishmentCreateRequest,
    IPaginationEstablishmentRequest,
} from "@/lib/models/api/request/(Establishment)/establishment.request";
import { DataLoadManagementService } from "../../dataLoadManagement/dataLoadManagement.service";

export class EstablishmentService {
    private establishmentApi: EstablishmentApi;
    private establishmentMapper: EstablishmentMapper;
    private dataLoadManagementService: DataLoadManagementService;

    constructor() {
        this.establishmentApi = new EstablishmentApi();
        this.establishmentMapper = new EstablishmentMapper();
        this.dataLoadManagementService = new DataLoadManagementService();
    }

    async getAllEstablishments(): Promise<IEstablishmentFront[] | null> {
        const response = await this.establishmentApi.getAllEstablishment();
        const cdnHost = await this.dataLoadManagementService.getBlobProxy();
        return response && cdnHost
            ? response.establishmentItems.map((establishment) => {
                  return this.establishmentMapper.transformToFront({
                      establishment: establishment,
                      info: {
                          cdnHost: cdnHost.url,
                          totalEstablishment: response.total,
                      },
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
        const cdnHost = await this.dataLoadManagementService.getBlobProxy();
        return response && cdnHost
            ? this.establishmentMapper.transformToFront({
                  establishment: response.establishment,
                  info: { cdnHost: cdnHost?.url },
              })
            : null;
    }

    async getEstablishmentByPagination(
        body: IPaginationEstablishmentRequest
    ): Promise<IEstablishmentFront[] | null> {
        const response =
            await this.establishmentApi.getEstablishmentByPagination(body);
        const cdnHost = await this.dataLoadManagementService.getBlobProxy();
        return response && cdnHost
            ? response.establishmentItems
                  .filter((establishment) => establishment.content)
                  .map((establishment) => {
                      return this.establishmentMapper.transformToFront({
                          establishment: establishment,
                          info: {
                              cdnHost: cdnHost.url,
                              totalEstablishment: response.total,
                          },
                      });
                  })
            : null;
    }
    async createEstablishment(
        body: IEstablishmentCreateRequest
    ): Promise<IEstablishmentCreatedEntity | null> {
        const response = this.establishmentApi.createEstablishment(body);

        return response;
    }
}
