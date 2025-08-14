import { ILocationFront, ILocationsWithContentEntity } from "@/lib/models";

export default class LocationMapper {
    constructor() {}
    transformToFront(
        location: ILocationsWithContentEntity,
        cdnHost: string
    ): ILocationFront {
        const mediaFiles =
            location.content?.media?.gallery.map((mediaItem) => {
                return {
                    blobPath: mediaItem.blobPath,
                    fileName: mediaItem.fileName,
                    height: mediaItem.height,
                    width: mediaItem.width,
                    title: mediaItem.details[0].value.title || "",
                    type: mediaItem.type,
                    src: `${cdnHost}${mediaItem.blobPath}`,
                };
            }) || null;
        const mappingData = {
            id: location.location.Id,
            title: location?.content?.details[0].value || "",
            locationType: location.location.LocationType
                ? {
                      id: location.location.LocationType.Id,
                      title: location.location.LocationType.Name,
                  }
                : null,
            pathBreadcrumb: location.location.Path,
            media: mediaFiles,
        };
        return mappingData;
    }
    transformToTowns(locations: ILocationFront[]): ILocationFront[] {
        const towns = locations?.filter((town) => {
            if (!town.locationType) {
                return true;
            }
            return ["CITY", "TOWN", "CAPITAL"].includes(
                town.locationType.title
            );
        });
        return towns;
    }
    transformToDistricts(
        locations: ILocationFront[],
        nextLevelPathLengthOfRootLocation: number
    ): ILocationFront[] {
        const districts = locations?.filter((district) => {
            if (!district.locationType) {
                return true;
            }
            return (
                ["REGION", "DISTRICT", "COUNTRY", "CONTINENT"].includes(
                    district.locationType.title
                ) &&
                district.pathBreadcrumb.length ===
                    nextLevelPathLengthOfRootLocation
            );
        });
        return districts;
    }
}
