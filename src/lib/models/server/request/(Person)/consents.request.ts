export interface IConsentsPatchRequest {
    ConfirmedHonesty?: boolean;
    ConfirmedLegalBusiness?: boolean;
    AcceptedTerms?: boolean;
    AgreedMarketing?: boolean;
    AgreedReviewsNotification?: boolean;
    AgreedPersonalDataProcessing?: boolean;
    AgreedAutoPublish?: boolean;
}
export interface IConsentsRequest extends IConsentsPatchRequest {
    Person?: string;
    Business?: string;
}
