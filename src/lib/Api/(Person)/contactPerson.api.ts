import { IContactsPersonEntity } from "@/lib/models/server/entities/(person)/contactsPerson.entity";
import { IContactsPersonFront } from "@/lib/models/frontend/(person)/contactsPerson.front";
import { IContactsRequest } from "@/lib/models/server/request/contacts/contacts.request";

import { IBaseModerationResponse } from "@/lib/models/server/response/base/base-moderation.response";
import { BaseApiService } from "../base/BaseApi.service";
class ContactsPersonMapper {
    constructor() {}
    toFront(dataServer: IContactsPersonEntity): IContactsPersonFront {
        console.log(dataServer);
        const mappedData: IContactsPersonFront = {
            id: dataServer.Id,
            phone: dataServer.Phone,
            email: dataServer.Email,
            addressId: dataServer.Address?.Id || null,
            socialNetworksId: dataServer.SocialContacts?.Id || null,
        };
        return mappedData;
    }
}

export class ContactsPersonService extends BaseApiService<
    IContactsPersonEntity,
    IContactsPersonEntity,
    IContactsPersonFront,
    IContactsRequest,
    IBaseModerationResponse
> {
    protected baseUrl = "/contacts";
    protected mapper = new ContactsPersonMapper();
}
