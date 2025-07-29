import { SocialNetworksPersonService } from "@/lib/Api/(Person)/socialNetworksPerson/socialNetworksPerson.service";

import { IContactsPartFront } from "@/lib/models/frontend/parts/contacts/contacts.frontPart";
import { IContactsRequest } from "@/lib/models/api/request/contacts/contacts.request";

import ContactsApi from "./contacts.endpoints";
import { ContactsMapper } from "./contacts.mapper";
import { AddressService } from "../(Person)/address/address.service";
import { ISocialContactsRequest } from "@/lib/models/api/request/(Person)/socialContacts.request";
import { IAddressRequest } from "@/lib/models/api/request/(Person)/address.request";
import { IContactsEntity } from "@/lib/models/api/entities/parts/contacts.entity";

export class ContactsService {
    private ContactsApi: ContactsApi;
    private ContactsMapper: ContactsMapper;
    // private AddressService: AddressService;
    // private SocialNetworksPersonService: SocialNetworksPersonService;
    constructor() {
        this.ContactsApi = new ContactsApi();
        this.ContactsMapper = new ContactsMapper();
        // this.AddressService = new AddressService();
        // this.SocialNetworksPersonService = new SocialNetworksPersonService();
    }

    async getContactsById(
        id: string,
        lang?: string
    ): Promise<IContactsPartFront | null> {
        const response = this.ContactsApi.getContactsById(id, lang).then(
            (res) => {
                if (!res) return null;
                const mappedData =
                    this.ContactsMapper.toFront(res);
                return mappedData;
            }
        );
        return response;
    }

    async createContacts(
        body: IContactsRequest
    ): Promise<IContactsPartFront | null> {
        const response = this.ContactsApi.createContacts(body).then((res) => {
            if (!res) return null;
            const mappedData = this.ContactsMapper.toFront(res);
            return mappedData;
        });

        return response;
    }
    async updateContacts({
        id,
        bodyContacts,
    }: {
        id: string | null;
        bodyContacts: IContactsRequest;
    }): Promise<IContactsPartFront | null> {
        const response = id
            ? await this.ContactsApi.updateContacts(id, bodyContacts)
            : await this.ContactsApi.createContacts(bodyContacts);

        if (!response) return null;
        return this.ContactsMapper.toFront(response);
    }
}
