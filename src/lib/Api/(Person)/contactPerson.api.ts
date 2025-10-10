import { BaseApiService } from "../base/BaseApi.service";
import {
    IBaseModerationResponse,
    IContactsPersonEntity,
    IContactsPersonFront,
    IContactsRequest,
} from "@/lib/models";
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
