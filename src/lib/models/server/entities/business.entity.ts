import { IContactsPersonEntity } from "./(person)/contactsPerson.entity";
import { TRoleOwner } from "@/lib/models/types/TRoleOwner";
import { IPersonEntity } from "./(person)/person.entity";
import { IEstablishmentEntity } from "./(establishment)/establishment.entity";
import { IContentEntity } from "./(establishment)/parts/content.entity";
import {
    IRoleOwnerEntity,
    IRoleOwnerWithContentEntity,
} from "./(person)/roleOwner.entity";
import { TTypeOwnerBusiness } from "../../types";

export interface IBusinessEntity {
    Id: string;
    OfficialName: string;
    RegistrationNumber: string | null;
    RegistrationDate: Date | null;
    ContentId: string | null;
    LastModifiedDate: string;
    Contacts: IContactsPersonEntity;
    CreatedDate: string;
    DeletedDate: string | null;
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
type legalTypeServer = "INDIVIDUAL" | "LEGAL_ENTITY" | "SOLE_PROPRIETOR";
export interface IBusinessLegalTypesEntity {
    Id: string;
    Code: legalTypeServer;
    content: IContentEntity;
}
export interface IBusinessPersonRoleEntity {
    Id: string;
    PersonBusinessAssignment: IBusinessPersonAssignEntity;
    Role: IRoleOwnerWithContentEntity;
    Activated: boolean;
}
