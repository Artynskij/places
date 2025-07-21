import { AddressMapper } from "./address.mapper";
import AddressApi from "./address.endpoints";
import { IAddressFront } from "@/lib/models/frontend/(person)/address.front";
import { IAddressRequest } from "@/lib/models/api/request/(Person)/address.request";

import { ContactsService } from "../../contacts/contacts.service";

export class AddressService {
    private AddressApi: AddressApi;
    private AddressMapper: AddressMapper;
    private ContactsPersonService: ContactsService;
    constructor() {
        this.AddressApi = new AddressApi();
        this.AddressMapper = new AddressMapper();
        this.ContactsPersonService = new ContactsService();
    }

    async getAddressById(
        id: string,
        lang?: string
    ): Promise<IAddressFront | null> {
        const response = this.AddressApi.getAddressById(id, lang).then(
            (res) => {
                if (!res) return null;
                const mappedData =
                    this.AddressMapper.transformAddressEntity(res);
                return mappedData;
            }
        );
        return response;
    }

    async createAddress({
        body,
        idPerson,
        contactsPersonId,
    }: {
        body: IAddressRequest;
        idPerson: string;
        contactsPersonId: string | null;
    }): Promise<IAddressFront | null> {
        const response = this.AddressApi.createAddress(body)
            .then(async (res) => {
                await this.ContactsPersonService.updateContacts({
                    id: contactsPersonId,
                    body: {
                        AddressId: res?.Id,
                    },
                    vendorId: idPerson,
                });

                return res;
            })
            .then((res) => {
                if (!res) return null;
                const mappedData =
                    this.AddressMapper.transformAddressEntity(res);
                return mappedData;
            });
        return response;
    }
    async updateAddress({
        id,
        body,
        idPerson,
        contactsPersonId,
    }: {
        id: string | null;
        body: IAddressRequest;
        idPerson: string;
        contactsPersonId: string | null;
    }): Promise<IAddressFront | null> {
        if (!id) {
            return this.createAddress({ body, idPerson, contactsPersonId });
        }
        const response = this.AddressApi.updateAddress(id, body).then((res) => {
            if (!res) return null;
            const mappedData = this.AddressMapper.transformAddressEntity(res);
            return mappedData;
        });

        return response;
    }
}
