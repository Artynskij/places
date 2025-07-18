import { IPersonFront } from "@/lib/models/frontend/(person)/person.front";
import PersonNameApi from "./personName.endpoints";
import {
    IPersonNameCreateRequest,
    IPersonNameUpdateRequest,
} from "@/lib/models/api/request/(Person)/personName.request";
import { IPersonNameFront } from "@/lib/models/frontend/(person)/personName.front";
import PersonApi from "../person/person.endpoints";
import { PersonService } from "../person/person.service";

export class PersonNameService {
    private personNameApi: PersonNameApi;
    private PersonService: PersonService;
    constructor() {
        this.personNameApi = new PersonNameApi();
        this.PersonService = new PersonService();
    }

    async getPersonNameById(
        id: string,
        lang?: string
    ): Promise<IPersonNameFront | null> {
        const response = this.personNameApi.getPersonNameById(id, lang);
        return response;
    }

    async createPersonName({
        body,
        idPerson,
    }: {
        body: IPersonNameCreateRequest;
        idPerson: string;
    }): Promise<IPersonNameFront | null> {
        const response = this.personNameApi
            .createPersonName(body)
            .then(async (res) => {
                await this.PersonService.updatePerson(idPerson, {
                    PersonName: res?.Id,
                });
                return res;
            });
        return response;
    }
    async updatePersonName({
        id,
        body,
        idPerson,
    }: {
        id: string | null;
        body: IPersonNameUpdateRequest;
        idPerson: string;
    }): Promise<IPersonNameFront | null> {
        if (!id) {
            return this.createPersonName({body, idPerson});
        }
        const response = this.personNameApi.updatePersonName(id, body);
        return response;
    }
}
