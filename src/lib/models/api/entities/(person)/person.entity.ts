
import { IContactsPersonEntity } from "./contactsPerson.entity";
import { IGenderBodyEntity, IGenderEntity } from "./gender.entity";
import { IPersonNameEntity } from "./personName.entity";
import { IPersonSettingsEntity } from "./personSettings.entity";
import { IContentEntity } from "../(establishment)/parts/content.entity";
export interface IPersonEntity {
    Id: string;
    TZ: null;
    IsVerified: boolean;
    ContentId: string | null;
    Nickname: string | null;
    Email: string | null;
    Phone: string | null;
    PhoneCountryCode: string | null;
    ProfilePhotoPath: string | null;
    AvatarPhotoPath: string | null;
    About: string | null;
    BirthDate: string | null;
    CreatedDate: string;
    LastModifiedDate: string;
    DeletedDate: string | null;
    PersonType: "" | null;
    PersonName: IPersonNameEntity | null;
    Gender: IGenderBodyEntity | null;
    Language: "" | null;
    Currency: "" | null;
    Contacts: IContactsPersonEntity | null;
    PersonSettings: IPersonSettingsEntity | null;
}
export interface IPersonWithContentEntity {
    person: IPersonEntity;
    content: IContentEntity | null;
}
