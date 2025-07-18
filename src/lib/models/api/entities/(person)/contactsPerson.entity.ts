import { ISocialContactsEntity } from "../parts/socialNetworks";
import { IAddressEntity } from "./address.entity";

export interface IContactsPersonEntity {
    Id: string;
    SocialContacts: ISocialContactsEntity | null;
    Address: IAddressEntity | null;
    Email: string | null;
    Phone: string | null;
    PhoneCountryCode: string | null;
    ContentId: string | null;
    CreatedDate: string;
    LastModifiedDate: string;
    DeletedDate: string | null;
}
