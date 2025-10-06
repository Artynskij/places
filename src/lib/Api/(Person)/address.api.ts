import { IAddressEntity } from "@/lib/models/server/entities/(person)/address.entity";
// import { BaseApiService } from "../../BaseApi.service";
import { IAddressFront } from "@/lib/models/frontend/(person)/address.front";
import { IAddressRequest } from "@/lib/models/server/request/(Person)/address.request";

import { IBaseModerationResponse } from "@/lib/models/server/response/base/base-moderation.response";
import { BaseApiService } from "../base/BaseApi.service";

class AddressMapper {
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

export class AddressService extends BaseApiService<
    IAddressEntity,
    IAddressEntity,
    IAddressFront,
    IAddressRequest,
    IBaseModerationResponse
>{
    protected baseUrl = "/addresses";
    protected mapper = new AddressMapper();
}
