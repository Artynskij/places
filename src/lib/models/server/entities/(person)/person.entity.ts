import { IContactsPersonEntity } from "./contactsPerson.entity";
import { IGenderEntity, IGenderWithContentEntity } from "./gender.entity";
import { IPersonNameEntity } from "./personName.entity";
import { IPersonSettingsEntity } from "./personSettings.entity";
import { IContentMultilingualEntity } from "../(establishment)/parts/content.entity";
import { IBaseEntity } from "../base/base.entity";
export interface IPersonEntity extends IBaseEntity {
    TZ: null;
    IsVerified: boolean;
    ContentId: string | null;
    Nickname: string | null;
    Email: string | null;
    Phone: string | null;
    PhoneCountryCode: string | null;
    ProfilePhotoPath: string | null;
    AvatarPhotoPath: string | null;
    Avatar2BPhotoPath: string | null;
    About: string | null;
    BirthDate: Date | null;

    PersonType: "" | null;
    PersonName: IPersonNameEntity | null;
    Gender: IGenderEntity | null;
    Language: "" | null;
    Currency: "" | null;
    Contacts: IContactsPersonEntity | null;
    PersonSettings: IPersonSettingsEntity | null;
}
export interface IPersonWithContentEntity {
    person: IPersonEntity;
    content: IContentMultilingualEntity | null;
}
