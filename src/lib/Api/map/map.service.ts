import { IMapItemsSortedResponse } from "../../models/server/response/map/map.response";
import MapApi from "./map.endpoint";

import { IMapQueryRequest } from "@/lib/models/server/request/map.request";
import { MapMapper } from "./map.mapper";
import { ISearchItemFront } from "@/lib/models";
import { DataLoadManagementService } from "../dataLoadManagement/dataLoadManagement.service";

export class MapService {
    private mapApi: MapApi;
    private mapMapper: MapMapper;
    private dataLoadManagementService: DataLoadManagementService;
    constructor() {
        this.mapApi = new MapApi();
        this.mapMapper = new MapMapper();
        this.dataLoadManagementService = new DataLoadManagementService();
    }
    async getEstablishmentByCoord(
        body: IMapQueryRequest
    ): Promise<ISearchItemFront[] | null> {
        const response = await this.mapApi.getEstablishmentByCoord(body);
        const cdnHost = await this.dataLoadManagementService.getBlobProxy();

        const mappingData = response
            ? this.mapMapper.mappingMapQuery(response, cdnHost?.url || "")
            : null;
        return mappingData;
    }
    async getEstablishmentByCoordAndSortTypes(
        body: IMapQueryRequest
    ): Promise<IMapItemsSortedResponse | null> {
        const response = await this.getEstablishmentByCoord(body);
        if (!response) return null;
        const sortedData = this.mapMapper.sortEstablishment(response);
        return sortedData;
    }
}
