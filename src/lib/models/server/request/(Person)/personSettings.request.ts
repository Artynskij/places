import { IBaseModerationRequest } from "../base/base-with-moderation.request";

interface PersonSettingsData {
    source: {
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
    };
}
export interface IPersonSettingsRequest
    extends IBaseModerationRequest<PersonSettingsData> {}
