import PersonApi from "./person.endpoints";
import { IPersonRequest } from "@/lib/models/api/request/(Person)/person.request";
import { IPersonFront } from "@/lib/models/frontend/(person)/person.front";

export class PersonService {
    private personApi: PersonApi;

    constructor() {
        this.personApi = new PersonApi();
    }

    async getPersonById(
        id: string,
        lang?: string
    ): Promise<IPersonFront | null> {
        
        const response = this.personApi.getPersonById(id, lang);
        return response;
    }

    async updatePerson({
        id,
        body,
    }: {
        id: string;
        body: IPersonRequest;
    }): Promise<IPersonFront | null> {
        const response = this.personApi.updatePerson(id, body);
        return response;
    }
}
