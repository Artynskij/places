import { IAddressEntity } from "@/lib/models/api/entities/(person)/address.entity";
import { IAddressFront } from "@/lib/models/frontend/(person)/address.front";

export class AddressMapper {
    constructor() {}
    toFront(dataServer: IAddressEntity): IAddressFront {
        const mappedData: IAddressFront = {
            id: dataServer.Id,
            country: dataServer.Country || null,
            district: dataServer.District || null,
            town: dataServer.Town || null,
            street: dataServer.Street || null,
            postalCode: dataServer.PostalCode || null,
        };
        return mappedData;
    }
}
