import EstablishmentApi from "./establishment.endpoints";

import {
    IEstablishmentEntity,
    IEstablishmentWithContentEntity,
    IEstablishmentFront,
    IEstablishmentRateRequest,
    IEstablishmentRateEntity,
    IEstablishmentRateGetAllRequest,
    IEstablishmentRateAllResponse,
} from "@/lib/models";
import EstablishmentMapper from "./establishment.mapper";
import {
    IEstablishmentCreateRequest,
    IPaginationEstablishmentRequest,
} from "@/lib/models/api/request/(Establishment)/establishment.request";
import { DataLoadManagementService } from "../../dataLoadManagement/dataLoadManagement.service";
import { EstablishmentPersonAssignmentApi } from "./establishmentAssignment.api";
import EstablishmentRateApi from "./establishmentRate.endpoints";

export class EstablishmentService {
    private establishmentRateApi: EstablishmentRateApi;
    private establishmentApi: EstablishmentApi;
    private establishmentMapper: EstablishmentMapper;
    private dataLoadManagementService: DataLoadManagementService;
    private establishmentAssignmentService: EstablishmentPersonAssignmentApi;

    constructor() {
        this.establishmentRateApi = new EstablishmentRateApi();
        this.establishmentApi = new EstablishmentApi();
        this.establishmentMapper = new EstablishmentMapper();
        this.dataLoadManagementService = new DataLoadManagementService();
        this.establishmentAssignmentService =
            new EstablishmentPersonAssignmentApi();
    }

    async getAll(): Promise<IEstablishmentFront[] | null> {
        const response = await this.establishmentApi.getAll();
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

    async getById(
        id: string,
        lang?: string
    ): Promise<IEstablishmentFront | null> {
        const response = await this.establishmentApi.getById(id, lang);
        const cdnHost = await this.dataLoadManagementService.getBlobProxy();
        return response && cdnHost
            ? this.establishmentMapper.transformToFront({
                  establishment: response.establishment,
                  info: { cdnHost: cdnHost?.url },
              })
            : null;
    }

    async getByPagination(
        body: IPaginationEstablishmentRequest
    ): Promise<IEstablishmentFront[] | null> {
        const response = await this.establishmentApi.getByPagination(body);
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
    async create(
        body: IEstablishmentCreateRequest
    ): Promise<IEstablishmentEntity | null> {
        const response = this.establishmentApi.create(body);

        return response;
    }
    async update(
        id: string,
        body: IEstablishmentCreateRequest
    ): Promise<IEstablishmentEntity | null> {
        const response = this.establishmentApi.update(id, body);
        console.log(body);
        return response;
    }
    async createRate(
        body: IEstablishmentRateRequest
    ): Promise<IEstablishmentRateEntity | null> {
        const response = this.establishmentRateApi.create(body);
        return response;
    }
    getAllRates(
        body: IEstablishmentRateGetAllRequest
    ): Promise<IEstablishmentRateAllResponse | null> {
        const response = this.establishmentRateApi.getAll(body);
        return response;
    }
}
