import AddressApi from "./address.endpoints";
import { IAddressFront } from "@/lib/models/frontend/(person)/address.front";
import { IAddressRequest } from "@/lib/models/api/request/(Person)/address.request";

import { ContactsPersonService } from "../contactsPerson/contactsPerson.service";

export class AddressService {
    private AddressApi: AddressApi;
    private ContactsPersonService: ContactsPersonService;
    constructor() {
        this.AddressApi = new AddressApi();
        this.ContactsPersonService = new ContactsPersonService();
    }

    async getAddressById(
        id: string,
        lang?: string
    ): Promise<IAddressFront | null> {
        const response = this.AddressApi.getAddressById(id, lang);
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
        const response = this.AddressApi.createAddress(body).then(
            async (res) => {
                await this.ContactsPersonService.updateContactsPerson({
                    id: contactsPersonId,
                    body: {
                        AddressId: res?.Id,
                    },
                    idPerson: idPerson,
                });

                return res;
            }
        );
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
        const response = this.AddressApi.updateAddress(id, body);

        return response;
    }
}
