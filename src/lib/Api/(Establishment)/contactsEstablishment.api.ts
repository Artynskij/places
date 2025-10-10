import { IBaseModerationResponse } from "../../models/server/response/base/base-moderation.response";

import {
    IContactEstablishmentRequest,
    IContactsEstablishmentEntity,
    IContactsEstablishmentFront,
} from "@/lib/models";

import { BaseApiService } from "../base/BaseApi.service";

export class ContactsEstablishmentMapper {
    constructor() {}
    toFront(
        dataServer: IContactsEstablishmentEntity
    ): IContactsEstablishmentFront {
        const mappedData: IContactsEstablishmentFront = {
            id: dataServer.Id,
            menu: dataServer.Menu,
            phone: dataServer.Phone,
            web: dataServer.Web,
            email: dataServer.Email,
            // addressId: dataServer.Address?.Id || null,
            socialNetworksId: dataServer.SocialContactsId || null,
            socialNetworks: dataServer.SocialContacts
                ? {
                      id: dataServer.SocialContacts?.Id,
                      ...dataServer.SocialContacts,
                  }
                : null,
        };
        return mappedData;
    }
}

export class ContactsEstablishmentService extends BaseApiService<
    IContactsEstablishmentEntity,
    IContactsEstablishmentEntity,
    IContactsEstablishmentFront,
    IContactEstablishmentRequest,
    IBaseModerationResponse
> {
    protected baseUrl = "/contacts-of-establishments";
    protected mapper = new ContactsEstablishmentMapper();
}
