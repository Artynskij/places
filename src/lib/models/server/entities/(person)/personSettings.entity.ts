export interface IPersonSettingsEntity {
    Id: string;
    LastModifiedDate: string;
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
    CreatedDate: string;
    DeletedDate: string | null;
}
