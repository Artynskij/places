import { IConsentsEntity } from "@/lib/models/api/entities/(person)/consents.entity";
import { IContactsEntity } from "@/lib/models/api/entities/parts/contacts.entity";
import { IContactsPartFront } from "@/lib/models/frontend/parts/contacts/contacts.frontPart";

export class ContactsMapper {
    constructor() {}
    toFront(dataServer: IContactsEntity): IContactsPartFront {
        const mappedData: IContactsPartFront = {
            id: dataServer.Id,
            phone: dataServer.Phone,
            email: dataServer.Email,
            addressId: dataServer.Address?.Id || null,
            socialNetworksId: dataServer.SocialContacts?.Id || null,
        };
        return mappedData;
    }
}
