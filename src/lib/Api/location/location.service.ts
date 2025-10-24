import { getTypeOfFile } from "./../../helpers/getTypeForFile";
import {
    IImageEntity,
    ILocationFront,
    ILocationPaginationRequest,
    ILocationUpdateRequest,
} from "@/lib/models";
import LocationApi from "./location.endpoint";
import LocationMapper from "./location.mapper";
import { DataLoadManagementService } from "../dataLoadManagement/dataLoadManagement.service";

import { FileUploadService } from "../fileUpload/fileUploads.service";
import { getImageDimensions } from "@/lib/helpers/getImageDimensions";
export class LocationService {
    private locationApi: LocationApi;
    private locationMapper: LocationMapper;
    private dataLoadManagerService: DataLoadManagementService;
    private fileUploadService: FileUploadService;
    constructor() {
        this.locationApi = new LocationApi();
        this.locationMapper = new LocationMapper();
        this.dataLoadManagerService = new DataLoadManagementService();
        this.fileUploadService = new FileUploadService();
    }
    async getById(id: string, lang?: string): Promise<ILocationFront | null> {
        const cdnHost = await this.dataLoadManagerService.getBlobProxy();
        const response = await this.locationApi.getById(id, lang);
        const mappingData =
            response && cdnHost
                ? this.locationMapper.transformToFront(response, cdnHost.url)
                : null;
        return mappingData;
    }
    async getAll(body: ILocationPaginationRequest): Promise<{
        info: { total: number };
        locations: ILocationFront[];
    } | null> {
        const response = await this.locationApi.getAll(body);
        const cdnHost = await this.dataLoadManagerService.getBlobProxy();
        if (!response || !cdnHost) {
            return null;
        }
        const mappedLocations = response.data.map((location) =>
            this.locationMapper.transformToFront(location, cdnHost.url)
        );
        return {
            locations: mappedLocations,
            info: { total: response.total },
        };
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
    async update(
        id: string,
        body: ILocationUpdateRequest
    ): Promise<any | null> {
        const response = await this.locationApi.update(id, body);
        return response;
        // const cdnHost = await this.dataLoadManagerService.getBlobProxy();
        // return response && cdnHost
        //     ? this.locationMapper.transformToFront(response, cdnHost.url)
        //     : null;
    }
}
