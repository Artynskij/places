import { IMapItemsSortedResponse } from "./../../models/api/response/map/IMapItemsSorted.response";
import MapApi from "./map.endpoint";

import { IMapQueryRequest } from "@/lib/models/api/request/map/IMapQuery.request";
import { MapMapper } from "./map.mapper";
import { ISearchItemFront } from "@/lib/models";

export class MapService {
    private mapApi: MapApi;
    private mapMapper: MapMapper;
    constructor() {
        this.mapApi = new MapApi();
        this.mapMapper = new MapMapper();
    }
    async getEstablishmentByCoord(
        body: IMapQueryRequest
    ): Promise<ISearchItemFront[] | null> {
        const response = await this.mapApi.getEstablishmentByCoord(body);
        const cdnHost = await this.mapApi.getBlobProxy();
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
