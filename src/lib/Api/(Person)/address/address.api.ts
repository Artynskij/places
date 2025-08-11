import { IAddressEntity } from "@/lib/models/api/entities/(person)/address.entity";
import { BaseApiService } from "../../BaseApi.service";
import { IAddressFront } from "@/lib/models/frontend/(person)/address.front";
import { IAddressRequest } from "@/lib/models/api/request/(Person)/address.request";
import { AddressMapper } from "./address.mapper";


export class AddressService extends BaseApiService<IAddressEntity,IAddressEntity,IAddressFront, IAddressRequest> {
    protected baseUrl = '/addresses';
    protected mapper= new AddressMapper;
}