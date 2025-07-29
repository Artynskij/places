import { ContactsMapper } from "./contacts.mapper";
import { IContactsEntity } from "@/lib/models/api/entities/parts/contacts.entity";
import { IContactsPartFront } from "@/lib/models/frontend/parts/contacts/contacts.frontPart";
import { IContactsRequest } from "@/lib/models/api/request/contacts/contacts.request";
import { BaseApiService } from "../BaseApi.service";

export class ContactsService extends BaseApiService<
    IContactsEntity,
    IContactsPartFront,
    IContactsRequest
> {
    protected baseUrl = "/contacts";
    protected mapper = new ContactsMapper();
}
