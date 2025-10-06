import { IBaseModerationRequest } from "../base/base-with-moderation.request";

interface ContactsData {
    source: {
        Email?: string | null;
        Phone?: string | null;
        PhoneCountryCode?: string | null;
        SocialContacts?: string | null;
        Address?: string | null;
    };
}
export interface IContactsRequest
    extends IBaseModerationRequest<ContactsData> {}
