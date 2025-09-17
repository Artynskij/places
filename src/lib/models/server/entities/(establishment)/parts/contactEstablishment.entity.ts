import { ISocialContactsEntity } from "../../socialContacts.entity";

export interface IContactsEstablishmentEntity {
    Id: string;
    Phone: string | null;
    PhoneCountryCode: string | null;
    Web: string | null;
    Email: string | null;
    Menu: string | null;

    Other: string | null;
    SocialContactsId?: string | null;
    SocialContacts: ISocialContactsEntity | null;
    ContentId: string | null;
}

export interface IContactsEstablishmentWithContentEntity {
    
}
