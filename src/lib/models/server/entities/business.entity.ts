import { IContactsPersonEntity } from "./(person)/contactsPerson.entity";

import { IPersonEntity } from "./(person)/person.entity";
import { IEstablishmentEntity } from "./(establishment)/establishment.entity";
import { IContentEntity } from "./(establishment)/parts/content.entity";
import { IRoleOwnerWithContentEntity } from "./(person)/roleOwner.entity";
import { TLegalTypeOfBusiness } from "../../types/TLegalTypeOfBusiness";
import { IBaseEntity } from "./base/base.entity";

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
    content: IContentEntity | null;
}

export interface IBusinessPersonAssignEntity {
    Person: IPersonEntity | null;
    Business: IBusinessEntity | null;
    BusinessPosition: IBusinessPositionEntity | null;
    IsOwnerVerified: boolean;
}
export interface IBusinessPositionEntity {
    Id: string;
    Code: string;
    content: IContentEntity;
}

export interface IBusinessLegalTypesEntity {
    Id: string;
    Code: TLegalTypeOfBusiness;
    content: IContentEntity;
}
export interface IBusinessPersonRoleEntity {
    Id: string;
    PersonBusinessAssignment: IBusinessPersonAssignEntity;
    Role: IRoleOwnerWithContentEntity;
    Activated: boolean;
}
