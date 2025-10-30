import EstablishmentApi from "./establishment.endpoints";

import {
    IEstablishmentEntity,
    IEstablishmentWithContentPareEntity,
    IEstablishmentFront,
    IRateEstablishmentRequest,
    IRateEstablishmentEntity,
    IRateEstablishmentGetAllRequest,
    IRateEstablishmentAllResponse,
    IRateEstablishmentFront,
} from "@/lib/models";
import { EstablishmentMapper } from "./establishment.mapper";
import {
    IEstablishmentCreateRequest,
    IPaginationEstablishmentRequest,
} from "@/lib/models/server/request/(Establishment)/establishment.request";
import { DataLoadManagementService } from "../../dataLoadManagement/dataLoadManagement.service";
import { EstablishmentPersonAssignmentApi } from "./establishment-assignment.api";
import EstablishmentRateApi from "./establishment-rate.endpoints";
import { IBaseModerationResponse } from "@/lib/models/server/base/base.response";

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
                  return this.establishmentMapper.toFront({
                      establishmentEntity: establishment,
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
            ? this.establishmentMapper.toFront({
                  establishmentEntity: response.establishment,
                  info: { cdnHost: cdnHost?.url },
              })
            : null;
    }

    async getByPagination(
        body: IPaginationEstablishmentRequest
    ): Promise<IEstablishmentFront[] | null> {
        const response = await this.establishmentApi.getByPagination(body);
        const cdnHost = await this.dataLoadManagementService.getBlobProxy();
        const mappedData =
            response && cdnHost
                ? response.establishmentItems
                      .filter((establishment) => establishment.content)
                      .map((establishment) => {
                          return this.establishmentMapper.toFront({
                              establishmentEntity: establishment,
                              info: {
                                  cdnHost: cdnHost.url,
                                  totalEstablishment: response.total,
                              },
                          });
                      })
                : null;
        return mappedData;
    }
    async create(
        body: IEstablishmentCreateRequest
    ): Promise<IBaseModerationResponse | null> {
        const response = this.establishmentApi.create(body);

        return response;
    }
    async update(
        id: string,
        body: IEstablishmentCreateRequest
    ): Promise<IBaseModerationResponse | null> {
        const response = this.establishmentApi.update(id, body);

        return response;
    }
    async createRateReview(
        body: IRateEstablishmentRequest
    ): Promise<IBaseModerationResponse | null> {
        const response = this.establishmentRateApi.create(body);
        return response;
    }
    async getAllRatesReview(body: IRateEstablishmentGetAllRequest): Promise<{
        info: { limit: number; page: number; total: number };
        rates: IRateEstablishmentFront[];
    } | null> {
        const response = await this.establishmentRateApi.getAll(body);
        const cdnHost = await this.dataLoadManagementService.getBlobProxy();
        if (!response || !cdnHost) return null;
        console.log(response);
        const mappedRates = response.data.map((item) =>
            this.establishmentMapper.toFrontRateReview(item, cdnHost.url)
        );
        return {
            rates: mappedRates,
            info: {
                limit: response.limit,
                page: response.page,
                total: response.total,
            },
        };
    }
}
