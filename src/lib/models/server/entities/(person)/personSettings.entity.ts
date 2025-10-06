import { IBaseEntity } from "../base/base.entity";

export interface IPersonSettingsEntity extends IBaseEntity {
    ShowTravelMap: boolean;
    ShowPosts: boolean;
    ShowPhotoAlbums: boolean;
    ShowVideos: boolean;
    ShowRatingsAndReviews: boolean;
    NotifyServiceUpdates: boolean;
    NotifyNewPlaces: boolean;
    NotifyPartnerOffers: boolean;
    NotifyPersonalRecommendations: boolean;
    NotifyReviewModeration: boolean;
    NotifyContentModeration: boolean;
}
