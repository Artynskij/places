import { IBaseModerationRequest } from "../base/base-with-moderation.request";

interface PersonData {
    source: {
        TZ?: string | null;
        Nickname?: string | null;
        Email?: string | null;
        Phone?: string | null;
        PhoneCountryCode?: string | null;
        ProfilePhotoPath?: string | null;
        AvatarPhotoPath?: string | null;
        Avatar2BPhotoPath?: string | null;
        About?: string | null;
        BirthDate?: Date | null;

        PersonName?: string | null;
        Contacts?: string | null;
        Gender?: string | null;
        Language?: string | null;
        Currency?: string | null;
        PersonSettings?: string | null;
    };
}
export interface IPersonRequest extends IBaseModerationRequest<PersonData> {}
