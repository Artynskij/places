import { ILocationFront, ILocationInsidePaginationRequest } from "@/lib/models";
import LocationApi from "./location.endpoint";
import LocationMapper from "./location.mapper";
import { DataLoadManagementService } from "../dataLoadManagement/dataLoadManagement.service";

export class LocationService {
    private locationApi: LocationApi;
    private locationMapper: LocationMapper;
    private dataLoadManagerService: DataLoadManagementService;
    constructor() {
        this.locationApi = new LocationApi();
        this.locationMapper = new LocationMapper();
        this.dataLoadManagerService = new DataLoadManagementService();
    }
    async getLocationById(
        id: string,
        lang?: string
    ): Promise<ILocationFront | null> {
        const cdnHost = await this.dataLoadManagerService.getBlobProxy();
        const response = await this.locationApi.getLocationById(id, lang);
        const mappingData =
            response && cdnHost
                ? this.locationMapper.transformToFront(response, cdnHost.url)
                : null;
        return mappingData;
    }
    async getListLocationInside(
        body: ILocationInsidePaginationRequest
    ): Promise<ILocationFront[] | null> {
        const response = await this.locationApi.getListLocationInside(body);
        const cdnHost = await this.dataLoadManagerService.getBlobProxy();
        return response && cdnHost
            ? response
                  .map((location) =>
                      this.locationMapper.transformToFront(
                          location,
                          cdnHost.url
                      )
                  )
                  .sort((a, b) => a.title.localeCompare(b.title))
            : null;
    }
    async getBreadcrumbData(body: {
        ids: string;
        lang: string;
    }): Promise<ILocationFront[] | null> {
        const response = await this.locationApi.getBreadcrumbData(body);
        const cdnHost = await this.dataLoadManagerService.getBlobProxy();
        return response && cdnHost
            ? response.map((location) =>
                  this.locationMapper.transformToFront(location, cdnHost.url)
              )
            : null;
    }
}
