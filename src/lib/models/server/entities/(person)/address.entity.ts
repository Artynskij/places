import { IBaseEntity } from "../base/base.entity";

export interface IAddressEntity extends IBaseEntity {
    Street: string | null;
    House: string | null;
    Building: string | null;
    Apartment: string | null;
    PostalCode: string | null;
    Country: string | null;
    District: string | null;
    Town: string | null;

    Location: string | null;
}
