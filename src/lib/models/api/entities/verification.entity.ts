import { IEstablishmentWithContentEntity } from "./(establishment)/establishment.entity";
import { IContentVerificationEntity } from "./(establishment)/parts/content.entity";
import { IPersonEntity } from "./(person)/person.entity";
import { IBusinessEntity } from "./business.entity";

export interface IVerificationEntity {
    Id: string;
    Person: IPersonEntity | null;
    Business: IBusinessEntity | null;
    Establishment: IEstablishmentWithContentEntity | null;
    IsVerified: boolean;
    CreatedDate: string;
    LastModifiedDate: string;
    DeletedDate: string | null;
    Content?: IContentVerificationEntity;
}
