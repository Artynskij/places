import ContactsPersonApi from "./contacts.endpoints";
import { IContactsPartFront } from "@/lib/models/frontend/parts/contacts/contacts.frontPart";
import { IContactsRequest } from "@/lib/models/api/request/contacts/contacts.request";
import PersonApi from "../(Person)/person/person.endpoints";
import { PersonService } from "../(Person)/person/person.service";
import ContactsApi from "./contacts.endpoints";
import { ContactsMapper } from "./contacts.mapper";

export class ContactsService {
    private ContactsApi: ContactsApi;
    private ContactsMapper: ContactsMapper;
    private PersonService: PersonService;
    constructor() {
        this.ContactsApi = new ContactsApi();
        this.ContactsMapper = new ContactsMapper();
        this.PersonService = new PersonService();
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

    async createContacts({
        body,
        vendorId,
    }: {
        body: IContactsRequest;
        vendorId: string;
    }): Promise<IContactsPartFront | null> {
        const response = this.ContactsApi.createContacts(body)
            .then(async (res) => {
                await this.PersonService.updatePerson({
                    id: vendorId,
                    body: {
                        Contacts: res?.Id,
                    },
                });
                return res;
            })
            .then((res) => {
                if (!res) return null;
                const mappedData =
                    this.ContactsMapper.transformContactsEntity(res);
                return mappedData;
            });

        return response;
    }
    async updateContacts({
        id,
        body,
        vendorId,
    }: {
        id: string | null;
        body: IContactsRequest;
        vendorId: string;
    }): Promise<IContactsPartFront | null> {
        if (!id) {
            return this.createContacts({ body, vendorId });
        }
        const response = this.ContactsApi.updateContacts(id, body).then(
            (res) => {
                if (!res) return null;
                const mappedData =
                    this.ContactsMapper.transformContactsEntity(res);
                return mappedData;
            }
        );

        return response;
    }
}
