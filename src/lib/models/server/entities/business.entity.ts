import { IContactsPersonEntity } from "./(person)/contactsPerson.entity";

import { IPersonEntity } from "./(person)/person.entity";
import { IEstablishmentEntity } from "./(establishment)/establishment.entity";
import {
    IContentMultilingualEntity,
    IContentSimpleEntity,
} from "../base/content.entity";
import { IRoleOwnerWithContentEntity } from "./(person)/roleOwner.entity";
import { TLegalTypeOfBusiness } from "../../types/TLegalTypeOfBusiness";
import { IBaseEntity, IBaseSimpleEntity } from "../base/base.entity";

export interface IBusinessEntity extends IBaseEntity {
    OfficialName: string;
    RegistrationNumber: string | null;
    RegistrationDate: Date | null;
    LastModifiedDate: string;
    Contacts: IContactsPersonEntity;
    Establishment: IEstablishmentEntity | null;
    LegalType: IBusinessLegalTypesEntity;
}
export interface IBusinessWithContentEntity {
    id: string;
    business: IBusinessEntity;
    content: IContentMultilingualEntity | null;
}
// отношение бизнеса к персоне
export interface IBusinessPersonAssignEntity extends IBaseEntity {
    Person: IPersonEntity | null;
    Business: IBusinessEntity | null;
    BusinessPosition: IBusinessPositionEntity | null;
    IsOwnerVerified: boolean;
}
// отношение бизнеса к заведению
export interface IBusinessEstablishmentAssignEntity extends IBaseEntity {
    Establishment: IEstablishmentEntity | null;
    Business: IBusinessEntity | null;
    SortOrder: IBusinessPositionEntity | null;
    IsPrimary: boolean;
}
// бизнес журналы
export interface IBusinessPositionEntity extends IBaseSimpleEntity {
    content: IContentSimpleEntity;
}

export interface IBusinessLegalTypesEntity extends IBaseSimpleEntity {
    Code: TLegalTypeOfBusiness;
    content: IContentSimpleEntity;
}
export interface IBusinessPersonRoleEntity {
    Id: string;
    PersonBusinessAssignment: IBusinessPersonAssignEntity;
    Role: IRoleOwnerWithContentEntity;
    Activated: boolean;
}
