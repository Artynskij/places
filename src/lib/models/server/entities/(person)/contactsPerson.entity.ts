import { IBaseEntity } from "../../base/base.entity";
import { ISocialContactsEntity } from "../socialContacts.entity";
import { IAddressEntity } from "./address.entity";

export interface IContactsPersonEntity extends IBaseEntity {
    SocialContacts: ISocialContactsEntity | null;
    Address: IAddressEntity | null;
    Email: string | null;
    Phone: string | null;
    PhoneCountryCode: string | null;
}
