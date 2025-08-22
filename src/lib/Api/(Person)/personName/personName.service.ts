import { IPersonFront } from "@/lib/models/frontend/(person)/person.front";
import PersonNameApi from "./personName.endpoints";
import {
    IPersonNameCreateRequest,
    IPersonNameUpdateRequest,
} from "@/lib/models/api/request/(Person)/personName.request";
import { IPersonNameFront } from "@/lib/models/frontend/(person)/personName.front";
import PersonApi from "../person/person.endpoints";
import { PersonService } from "../person/person.service";
import { PersonNameMapper } from "./personName.mapper";

export class PersonNameService {
    private personNameApi: PersonNameApi;
    private personNameMapper: PersonNameMapper;
    private PersonService: PersonService;
    constructor() {
        this.personNameApi = new PersonNameApi();
        this.personNameMapper = new PersonNameMapper();
        this.PersonService = new PersonService();
    }

    async getPersonNameById(
        id: string,
        lang?: string
    ): Promise<IPersonNameFront | null> {
        const response = this.personNameApi
            .getPersonNameById(id, lang)
            .then((res) => {
                if (!res) return null;
                const mappedData =
                    this.personNameMapper.transformPersonNameEntity(res);
                return mappedData;
            });
        return response;
    }

    async createPersonName(
        body: IPersonNameCreateRequest
    ): Promise<IPersonNameFront | null> {
        const response = this.personNameApi
            .createPersonName(body)
            .then((res) => {
                if (!res) return null;
                const mappedData =
                    this.personNameMapper.transformPersonNameEntity(res);
                return mappedData;
            });
        return response;
    }
    async updatePersonName(
        id: string | null,
        body: IPersonNameUpdateRequest
    ): Promise<IPersonNameFront | null> {
        if (!body) {
            return null;
        }
        if (!id) {
            return this.createPersonName({ source: { ...body } });
        }

        const response = this.personNameApi
            .updatePersonName(id, body)
            .then((res) => {
                if (!res) return null;
                const mappedData =
                    this.personNameMapper.transformPersonNameEntity(res);
                return mappedData;
            });
        return response;
    }
}
