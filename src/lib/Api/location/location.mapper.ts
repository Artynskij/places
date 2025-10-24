import {
    ILocationFront,
    ILocationWithContentPareEntity,
    IMediaFront,
} from "@/lib/models";

export default class LocationMapper {
    constructor() {}
    transformToFront(
        location: ILocationWithContentPareEntity,
        cdnHost: string
    ): ILocationFront {
        const mediaFiles: IMediaFront[] | null =
            location.content?.media?.gallery?.map((mediaItem) => {
                return {
                    id: mediaItem.id,
                    blobPath: mediaItem.blobPath,
                    fileName: mediaItem.fileName,
                    height: mediaItem.height,
                    width: mediaItem.width,
                    title: mediaItem.details[0].value.title || "",
                    type: mediaItem.type,
                    src: `${cdnHost}${mediaItem.blobPath}`,
                    alt: mediaItem.details[0].value.alt || "",
                    isMain: mediaItem.isMain || false,
                };
            }) || null;
        const mappingData: ILocationFront = {
            id: location.location.Id,
            title: location?.content?.details[0]?.value || "",
            locationType: location.location.LocationType
                ? {
                      id: location.location.LocationType.Id,
                      title: location.location.LocationType.Name,
                  }
                : null,
            pathBreadcrumb: location.location.Path,
            media: mediaFiles,
            content: location.content,
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
