import { ISocialContactsEntity } from "./socialNetworks";
import { IAddressEntity } from "../(person)/address.entity";

export interface IContactsEntity {
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
