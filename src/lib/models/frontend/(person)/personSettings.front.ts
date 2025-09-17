import { IPersonSettingsEntity } from "../../server/entities/(person)/personSettings.entity";

export interface IPersonSettingsFront {
    id: string;
    showTravelMap: boolean;
    showPosts: boolean;
    showPhotoAlbums: boolean;
    showVideos: boolean;
    showRatingsAndReviews: boolean;
    notifyServiceUpdates: boolean;
    notifyNewPlaces: boolean;
    notifyPartnerOffers: boolean;
    notifyPersonalRecommendations: boolean;
    notifyReviewModeration: boolean;
    notifyContentModeration: boolean;
}
