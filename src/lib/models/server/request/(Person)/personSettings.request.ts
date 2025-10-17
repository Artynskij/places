import { IBaseModerationRequest } from "../../base/base.request";

interface PersonSettingsData {
    ShowTravelMap?: boolean;
    ShowPosts?: boolean;
    ShowPhotoAlbums?: boolean;
    ShowVideos?: boolean;
    ShowRatingsAndReviews?: boolean;
    NotifyServiceUpdates?: boolean;
    NotifyNewPlaces?: boolean;
    NotifyPartnerOffers?: boolean;
    NotifyPersonalRecommendations?: boolean;
    NotifyReviewModeration?: boolean;
    NotifyContentModeration?: boolean;
}
export interface IPersonSettingsRequest
    extends IBaseModerationRequest<PersonSettingsData> {}
