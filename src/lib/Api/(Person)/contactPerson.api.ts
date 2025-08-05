import { IContactsPersonEntity } from "@/lib/models/api/entities/(person)/contactsPerson.entity";
import { IContactsPersonFront } from "@/lib/models/frontend/(person)/contactsPerson.front";
import { IContactsRequest } from "@/lib/models/api/request/contacts/contacts.request";
import { BaseApiService } from "../BaseApi.service";
class ContactsPersonMapper {
    constructor() {}
    toFront(dataServer: IContactsPersonEntity): IContactsPersonFront {
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
    IContactsPersonFront,
    IContactsRequest
> {
    protected baseUrl = "/contacts";
    protected mapper = new ContactsPersonMapper();
}
