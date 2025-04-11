import { ILocationsEntity } from "@/lib/models/api/entities/locations.entity";
import { ILocationFront } from "@/lib/models/frontend/location/location.front";

export default class LocationMapper {
    constructor() {}
    transformToFront(location: ILocationsEntity): ILocationFront {
        return {
            id: location.location.Id,
            value: location?.content?.details[0].value || '',
            locationType: {
                id: location.location.LocationType.Id,
                value: location.location.LocationType.Name,
            },
        };
    }
}
