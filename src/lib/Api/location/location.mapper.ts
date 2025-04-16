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
                };
            }) || null;
        const maddingData = {
            id: location.location.Id,
            value: location?.content?.details[0].value || "",
            locationType: {
                id: location.location.LocationType.Id,
                value: location.location.LocationType.Name,
            },
            pathBreadcrumb: location.location.Path,
            media: mediaFiles,
        };
        return maddingData;
    }
}
