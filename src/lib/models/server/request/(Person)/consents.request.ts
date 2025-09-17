export interface IConsentsPatchRequest {
    ConfirmedHonesty?: boolean;
    ConfirmedLegalBusiness?: boolean;
    AcceptedTerms?: boolean;
    AgreedMarketing?: boolean;
    AgreedReviewsNotification?: boolean;
    AgreedPersonalDataProcessing?: boolean;
    AgreedAutoPublish?: boolean;
}
export interface IConsentsRequest {
    ConfirmedHonesty?: boolean;
    ConfirmedLegalBusiness?: boolean;
    AcceptedTerms?: boolean;
    AgreedMarketing?: boolean;
    AgreedReviewsNotification?: boolean;
    AgreedPersonalDataProcessing?: boolean;
    AgreedAutoPublish?: boolean;
    Person?: string;
    Business?: string;
}
