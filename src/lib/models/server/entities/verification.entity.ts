import { IEstablishmentWithContentEntity } from "./(establishment)/establishment.entity";
import { IContentVerificationEntity } from "./(establishment)/parts/content.entity";
import { IPersonEntity } from "./(person)/person.entity";
import { IBusinessEntity } from "./business.entity";

export interface IVerificationEntity {
    Id: string;
    Person: IPersonEntity | null;
    Business: IBusinessEntity | null | string;
    Establishment: IEstablishmentWithContentEntity | null | string;
    IsVerified: boolean;
    CreatedDate: string;
    LastModifiedDate: string;
    DeletedDate: string | null;
    ContentId: string | null;
    Content?: IContentVerificationEntity;
}
export interface IVerificationWithContentEntity {
    verification: IVerificationEntity;

    content: IContentVerificationEntity | null;
}
