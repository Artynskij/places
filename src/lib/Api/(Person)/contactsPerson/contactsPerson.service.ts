import ContactsPersonApi from "./contactsPerson.endpoints";
import { IContactsPersonFront } from "@/lib/models/frontend/(person)/contactsPerson.front";
import { IContactsPersonRequest } from "@/lib/models/api/request/(Person)/contactsPerson.request";
import PersonApi from "../person/person.endpoints";
import { PersonService } from "../person/person.service";

export class ContactsPersonService {
    private ContactsPersonApi: ContactsPersonApi;
    private PersonService: PersonService;
    constructor() {
        this.ContactsPersonApi = new ContactsPersonApi();
        this.PersonService = new PersonService();
    }

    async getContactsPersonById(
        id: string,
        lang?: string
    ): Promise<IContactsPersonFront | null> {
        const response = this.ContactsPersonApi.getContactsPersonById(id, lang);
        return response;
    }

    async createContactsPerson({
        body,
        idPerson,
    }: {
        body: IContactsPersonRequest;
        idPerson: string;
    }): Promise<IContactsPersonFront | null> {
        const response = this.ContactsPersonApi.createContactsPerson(body).then(
            async (res) => {
                await this.PersonService.updatePerson(idPerson, {
                    Contacts: res?.Id,
                });
                return res;
            }
        );

        return response;
    }
    async updateContactsPerson({
        id,
        body,
        idPerson,
    }: {
        id: string | null;
        body: IContactsPersonRequest;
        idPerson: string;
    }): Promise<IContactsPersonFront | null> {
        if (!id) {
            return this.createContactsPerson({body, idPerson});
        }
        const response = this.ContactsPersonApi.updateContactsPerson(id, body);

        return response;
    }
}
