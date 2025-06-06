import { ILocationsEntity } from "@/lib/models/api/entities/locations.entity";
import { ILocationFront } from "@/lib/models/frontend/location/location.front";

export default class LocationMapper {
    constructor() {}
    transformToFront(location: ILocationsEntity): ILocationFront {
        const mediaFiles =
            location.content?.media?.gallery.map((mediaItem) => {
                return {
                    blobPath: mediaItem.blobPath,
                    fileName: mediaItem.fileName,
                    height: mediaItem.height,
                    width: mediaItem.width,
                    title: mediaItem.details[0].value.title || "",
                    type: mediaItem.type,
                    src: "",
                };
            }) || null;
        const mappingData = {
            id: location.location.Id,
            title: location?.content?.details[0].value || "",
            locationType: {
                id: location.location.LocationType.Id,
                title: location.location.LocationType.Name,
            },
            pathBreadcrumb: location.location.Path,
            media: mediaFiles,
        };
        return mappingData;
    }
    transformToTowns(locations: ILocationFront[]): ILocationFront[] {
        const towns = locations?.filter((town) =>
            ["CITY", "TOWN", "CAPITAL"].includes(town.locationType.title)
        );
        return towns;
    }
    transformToDistricts(
        locations: ILocationFront[],
        nextLevelPathLengthOfRootLocation: number
    ): ILocationFront[] {
        const districts = locations?.filter(
            (district) =>
                ["REGION", "DISTRICT", "COUNTRY", "CONTINENT"].includes(
                    district.locationType.title
                ) &&
                district.pathBreadcrumb.length ===
                    nextLevelPathLengthOfRootLocation
        );
        return districts;
    }
}
