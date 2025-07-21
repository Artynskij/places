import { IContactsEntity } from "../parts/contacts.entity";

export interface IBusinessEntity {
    Id: string;
    OfficialName: string | null;
    RegistrationNumber: string | null;
    RegistrationDate: string | null;
    ContentId: string | null;
    LastModifiedDate: string;
    Contacts:IContactsEntity;
    CreatedDate: string;
    DeletedDate: string | null;
}
