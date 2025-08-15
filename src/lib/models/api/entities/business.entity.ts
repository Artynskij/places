import { IContactsPersonEntity } from "./(person)/contactsPerson.entity";
import { TRoleOwner } from "@/lib/models/types/TRoleOwner";
import { IPersonEntity } from "./(person)/person.entity";
export interface IBusinessEntity {
    Id: string;
    OfficialName: string | null;
    RegistrationNumber: string | null;
    RegistrationDate: string | null;
    ContentId: string | null;
    LastModifiedDate: string;
    Contacts: IContactsPersonEntity;
    CreatedDate: string;
    DeletedDate: string | null;
}

export interface IBusinessPersonAssignEntity {
    Person: IPersonEntity | null;
    Business: IBusinessEntity | null;
    BusinessPosition: string;
    IsOwnerVerified: boolean;
}

export interface IBusinessPosition {
    Id: string;
    Code: TRoleOwner;
    Name: string;
}
