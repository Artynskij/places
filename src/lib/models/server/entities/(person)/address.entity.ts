export interface IAddressEntity {
    Id: string;
    Street: string | null;
    House: string | null;
    Building: string | null;
    Apartment: string | null;
    PostalCode: string | null;
    Country: string | null;
    District: string | null;
    Town: string | null;
    CreatedDate: string;
    LastModifiedDate: string;
    DeletedDate: string | null;

    Location: string | null;
}
