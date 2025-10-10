import { IEstablishmentWithContentPareEntity } from "./(establishment)/establishment.entity";
import { IContentEntityWithMedia } from "./(establishment)/parts/content.entity";
import { IPersonEntity } from "./(person)/person.entity";
import { IBaseEntity } from "./base/base.entity";
import { IBusinessEntity } from "./business.entity";

export interface IVerificationEntity extends IBaseEntity {
    Person: IPersonEntity | null;
    Business: IBusinessEntity | null | string;
    Establishment: IEstablishmentWithContentPareEntity | null | string;
    IsVerified: boolean;

    Content?: IContentEntityWithMedia;
}
export interface IVerificationWithContentEntity {
    verification: IVerificationEntity;

    content: IContentEntityWithMedia | null;
}
