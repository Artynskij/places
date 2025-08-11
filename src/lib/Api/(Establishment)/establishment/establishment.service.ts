import EstablishmentApi from "./establishment.endpoints";

import {
    IEstablishmentEntity,
    IEstablishmentWithContentEntity,
    IEstablishmentFront,
} from "@/lib/models";
import EstablishmentMapper from "./establishment.mapper";
import {
    IEstablishmentCreateRequest,
    IPaginationEstablishmentRequest,
} from "@/lib/models/api/request/(Establishment)/establishment.request";
import { DataLoadManagementService } from "../../dataLoadManagement/dataLoadManagement.service";
import { EstablishmentPersonAssignmentApi } from "./establishmentAssignment.api";

export class EstablishmentService {
    private establishmentApi: EstablishmentApi;
    private establishmentMapper: EstablishmentMapper;
    private dataLoadManagementService: DataLoadManagementService;
    private establishmentAssignmentService: EstablishmentPersonAssignmentApi;

    constructor() {
        this.establishmentApi = new EstablishmentApi();
        this.establishmentMapper = new EstablishmentMapper();
        this.dataLoadManagementService = new DataLoadManagementService();
        this.establishmentAssignmentService =
            new EstablishmentPersonAssignmentApi();
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
    ): Promise<IEstablishmentEntity | null> {
        const response = this.establishmentApi.createEstablishment(body);

        return response;
    }
    async updateEstablishment(
        id: string,
        body: IEstablishmentCreateRequest
    ): Promise<IEstablishmentEntity | null> {
        const response = this.establishmentApi.updateEstablishment(id, body);

        return response;
    }
}
