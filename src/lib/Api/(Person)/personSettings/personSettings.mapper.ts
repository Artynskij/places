import { IPersonSettingsFront } from "@/lib/models/frontend/(person)/personSettings.front";
import { IPersonSettingsEntity } from "./../../../models/api/entities/(person)/personSettings.entity";

export class PersonSettingsMapper {
    constructor() {}
    transformPersonSettingsEntity(
        personSettingsServer: IPersonSettingsEntity
    ): IPersonSettingsFront {
        const mappedData: IPersonSettingsFront = {
            id: personSettingsServer.Id,
            notifyContentModeration:
                personSettingsServer.NotifyContentModeration,
            notifyPartnerOffers: personSettingsServer.NotifyPartnerOffers,
            notifyNewPlaces: personSettingsServer.NotifyNewPlaces,
            notifyPersonalRecommendations:
                personSettingsServer.NotifyPersonalRecommendations,
            notifyReviewModeration: personSettingsServer.NotifyReviewModeration,
            notifyServiceUpdates: personSettingsServer.NotifyServiceUpdates,
            showPhotoAlbums: personSettingsServer.ShowPhotoAlbums,
            showPosts: personSettingsServer.ShowPosts,
            showRatingsAndReviews: personSettingsServer.ShowRatingsAndReviews,
            showTravelMap: personSettingsServer.ShowTravelMap,
            showVideos: personSettingsServer.ShowVideos,
        };
        return mappedData;
    }
}
