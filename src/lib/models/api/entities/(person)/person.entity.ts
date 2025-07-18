import { IContactsPersonEntity } from "./contactsPerson.entity";
import { IGenderEntity } from "./gender.entity";
import { IPersonNameEntity } from "./personName.entity";
import { IPersonSettingsEntity } from "./personSettings.entity";

export interface IPersonEntity {
    person: {
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
        Gender: IGenderEntity | null;
        Language: "" | null;
        Currency: "" | null;
        Contacts: IContactsPersonEntity | null;
        PersonSettings: IPersonSettingsEntity | null;
    };
    content: string | null;
}
