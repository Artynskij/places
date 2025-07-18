export interface IConsentsEntity {
    Id:string;
    PersonId: string;
    BusinessId: string | null;
    ConfirmedHonesty: boolean;
    ConfirmedLegalBusiness: boolean;
    AcceptedTerms: boolean;
    AgreedMarketing: boolean;
    AgreedReviewsNotification: boolean;
    AgreedPersonalDataProcessing: boolean;
    AgreedAutoPublish: boolean;
    ContentId: string|  null;
    CreatedDate: string;
    LastModifiedDate: string;
    DeletedDate:string|  null;
}
