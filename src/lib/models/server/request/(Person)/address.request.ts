import { IBaseModerationRequest } from "../base/base-with-moderation.request";

interface AddressData {
    Street?: string | null;
    House?: string | null;
    Building?: string | null;
    Apartment?: string | null;
    PostalCode?: string | null;
    Country?: string | null;
    District?: string | null;
    Town?: string | null;
    Location?: { Id: string } | null;
}
export interface IAddressRequest extends IBaseModerationRequest<AddressData> {}
