export interface IContactsRequest {
    source: {
        Email?: string | null;
        Phone?: string | null;
        PhoneCountryCode?: string | null;
        SocialContacts?: string | null;
        Address?: string | null;
    };
}
