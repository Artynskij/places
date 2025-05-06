import { ILocationFront } from "@/lib/models/frontend/location/location.front";
import LocationApi from "./location.endpoint";
import LocationMapper from "./location.mapper";
import { ILocationInsidePaginationRequest } from "@/lib/models/api/request/location/ILocationInsidePagination.request";

export class LocationService {
    private locationApi: LocationApi;
    private locationMapper: LocationMapper;
    constructor() {
        this.locationApi = new LocationApi();
        this.locationMapper = new LocationMapper();
    }
    async getLocationById(
        id: string,
        lang?: string
    ): Promise<ILocationFront | null> {
        const response = await this.locationApi.getLocationById(id, lang);
        const mappingData = response
            ? this.locationMapper.transformToFront(response)
            : null;
        return mappingData;
    }
    async getListLocationInside(
        body: ILocationInsidePaginationRequest
    ): Promise<ILocationFront[] | null> {
        const response = await this.locationApi.getListLocationInside(body);
        return response
            ? response
                  .map((location) =>
                      this.locationMapper.transformToFront(location)
                  )
                  .sort((a, b) => a.title.localeCompare(b.title))
            : null;
    }
    async getBreadcrumbData(body: {
        ids: string;
        lang: string;
    }): Promise<ILocationFront[] | null> {
        const response = await this.locationApi.getBreadcrumbData(body);
        return response
            ? response.map((location) =>
                  this.locationMapper.transformToFront(location)
              )
            : null;
    }
}
