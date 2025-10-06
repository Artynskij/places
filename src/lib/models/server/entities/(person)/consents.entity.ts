import { IBaseEntity } from "../base/base.entity";

export interface IConsentsEntity extends IBaseEntity {
    PersonId: string;
    BusinessId: string | null;
    ConfirmedHonesty: boolean;
    ConfirmedLegalBusiness: boolean;
    AcceptedTerms: boolean;
    AgreedMarketing: boolean;
    AgreedReviewsNotification: boolean;
    AgreedPersonalDataProcessing: boolean;
    AgreedAutoPublish: boolean;
}
