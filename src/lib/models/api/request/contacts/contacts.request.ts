export interface IContactsRequest {
    source: {
        Email?: string | null;
        Phone?: string | null;
        PhoneCountryCode?: string | null;
        SocialContactsId?: string | null;
        AddressId?: string | null;
    };
}
