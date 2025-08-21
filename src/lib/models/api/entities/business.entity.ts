import { IContactsPersonEntity } from "./(person)/contactsPerson.entity";
import { TRoleOwner } from "@/lib/models/types/TRoleOwner";
import { IPersonEntity } from "./(person)/person.entity";
import { IEstablishmentEntity } from "./(establishment)/establishment.entity";
import { IContentEntity } from "./(establishment)/parts/content.entity";
export interface IBusinessEntity {
    Id: string;
    OfficialName: string;
    RegistrationNumber: string | null;
    RegistrationDate: string | null;
    ContentId: string | null;
    LastModifiedDate: string;
    Contacts: IContactsPersonEntity | null;
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
    BusinessPosition: string;
    IsOwnerVerified: boolean;
}

export interface IBusinessPositionEntity {
    Id: string;
    Code: TRoleOwner;
    Name: string;
}
export interface IBusinessLegalTypesEntity {
    Id: string;
    Code: string;
    content: IContentEntity;
}
