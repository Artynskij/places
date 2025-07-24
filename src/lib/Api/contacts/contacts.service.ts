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
    private AddressService: AddressService;
    private SocialNetworksPersonService: SocialNetworksPersonService;
    constructor() {
        this.ContactsApi = new ContactsApi();
        this.ContactsMapper = new ContactsMapper();
        this.AddressService = new AddressService();
        this.SocialNetworksPersonService = new SocialNetworksPersonService();
    }

    async getContactsById(
        id: string,
        lang?: string
    ): Promise<IContactsPartFront | null> {
        const response = this.ContactsApi.getContactsById(id, lang).then(
            (res) => {
                if (!res) return null;
                const mappedData =
                    this.ContactsMapper.transformContactsEntity(res);
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
            const mappedData = this.ContactsMapper.transformContactsEntity(res);
            return mappedData;
        });

        return response;
    }
    async updateContacts({
        ids,
        bodyContacts,
        bodySocialContacts,
        bodyAddress,
    }: {
        ids: {
            contactId: string | null;
            addressId: string | null;
            socialNetworksId: string | null;
        };
        bodyContacts: IContactsRequest | null;
        bodySocialContacts: ISocialContactsRequest | null;
        bodyAddress: IAddressRequest | null;
    }): Promise<IContactsPartFront | null> {
        const bodyPushContact: {
            AddressId: string | null;
            SocialContactsId: string | null;
        } = {
            AddressId: ids.addressId,
            SocialContactsId: ids.socialNetworksId,
        };

        // Адрес (сам решает: create или update)
        if (bodyAddress) {
            const addressRes = await this.AddressService.updateAddress(
                ids.addressId,
                bodyAddress
            );
            if (!addressRes) return null;
            bodyPushContact.AddressId = addressRes.id;
        }

        // Соцсети (тоже сам решает)
        if (bodySocialContacts) {
            const socialRes =
                await this.SocialNetworksPersonService.updateSocialNetworksPerson(
                    ids.socialNetworksId,
                    bodySocialContacts
                );
            if (!socialRes) return null;
            bodyPushContact.SocialContactsId = socialRes.id;
        }

        // Контакт (создать, если нужно, или обновить)
        if (
            bodyContacts ||
            !ids.contactId ||
            !ids.addressId ||
            !ids.socialNetworksId
        ) {
            const contactPayload = {
                Email: bodyContacts?.Email ?? null,
                Phone: bodyContacts?.Phone ?? null,
                PhoneCountryCode: bodyContacts?.PhoneCountryCode ?? null,
                ...bodyPushContact,
            };

            const contactRes = ids.contactId
                ? await this.ContactsApi.updateContacts(
                      ids.contactId,
                      contactPayload
                  )
                : await this.ContactsApi.createContacts(contactPayload);

            if (!contactRes) return null;
            return this.ContactsMapper.transformContactsEntity(contactRes);
        }

        return null;
    }
}
