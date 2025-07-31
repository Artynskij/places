import { AddressMapper } from "./address.mapper";
import AddressApi from "./address.endpoints";
import { IAddressFront } from "@/lib/models/frontend/(person)/address.front";
import { IAddressRequest } from "@/lib/models/api/request/(Person)/address.request";

export class AddressService {
    private AddressApi: AddressApi;
    private AddressMapper: AddressMapper;

    constructor() {
        this.AddressApi = new AddressApi();
        this.AddressMapper = new AddressMapper();
    }

    async getAddressById(
        id: string,
        lang?: string
    ): Promise<IAddressFront | null> {
        const response = this.AddressApi.getAddressById(id, lang).then(
            (res) => {
                if (!res) return null;
                const mappedData = this.AddressMapper.toFront(res);
                return mappedData;
            }
        );
        return response;
    }

    async createAddress(body: IAddressRequest): Promise<IAddressFront | null> {
        const response = this.AddressApi.createAddress(body).then((res) => {
            if (!res) return null;
            const mappedData = this.AddressMapper.toFront(res);
            return mappedData;
        });
        return response;
    }
    async updateAddress(
        id: string | null,
        body: IAddressRequest
    ): Promise<IAddressFront | null> {
        if (!id) {
            return this.createAddress(body);
        }
        const response = this.AddressApi.updateAddress(id, body).then((res) => {
            if (!res) return null;
            const mappedData = this.AddressMapper.toFront(res);
            return mappedData;
        });

        return response;
    }
}
