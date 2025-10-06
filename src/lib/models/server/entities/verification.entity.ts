import { IEstablishmentWithContentEntity } from "./(establishment)/establishment.entity";
import { IContentVerificationEntity } from "./(establishment)/parts/content.entity";
import { IPersonEntity } from "./(person)/person.entity";
import { IBaseEntity } from "./base/base.entity";
import { IBusinessEntity } from "./business.entity";

export interface IVerificationEntity extends IBaseEntity {
    Person: IPersonEntity | null;
    Business: IBusinessEntity | null | string;
    Establishment: IEstablishmentWithContentEntity | null | string;
    IsVerified: boolean;

    Content?: IContentVerificationEntity;
}
export interface IVerificationWithContentEntity {
    verification: IVerificationEntity;

    content: IContentVerificationEntity | null;
}
