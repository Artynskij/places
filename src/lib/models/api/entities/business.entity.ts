import { IContactsPersonEntity } from "./(person)/contactsPerson.entity";
import { TRoleOwner } from "@/lib/models/types/TRoleOwner";
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
    PersonId: string;
    BusinessId: string;
    BusinessPositionId: string;
    IsOwnerVerified: boolean;
}

export interface IBusinessPosition {
    Id: string;
    Code: TRoleOwner;
    Name: string;
}
