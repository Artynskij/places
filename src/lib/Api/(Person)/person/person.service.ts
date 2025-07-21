import PersonApi from "./person.endpoints";
import { IPersonRequest } from "@/lib/models/api/request/(Person)/person.request";
import { IPersonFront } from "@/lib/models/frontend/(person)/person.front";
import { PersonMapper } from "./person.mapper";
import { DictionariesService } from "../../dictionaries/dictionaries.service";
import { IPersonEntity } from "@/lib/models/api/entities/(person)/person.entity";

export class PersonService {
    private personApi: PersonApi;
    private personMapper: PersonMapper;
    private dictionariesService: DictionariesService;

    constructor() {
        this.personApi = new PersonApi();
        this.personMapper = new PersonMapper();
        this.dictionariesService = new DictionariesService();
    }

    async getPersonById(
        id: string,
        lang?: string
    ): Promise<IPersonFront | null> {
        const cdnHost = await this.dictionariesService.getBlobProxy();
        const response = this.personApi.getPersonById(id, lang).then((res) => {
            if (!res) return null;

            const mappedData = this.personMapper.transformPersonEntity(
                res,
                cdnHost?.url || null
            );
            return mappedData;
        });

        return response;
    }

    async updatePerson({
        id,
        body,
    }: {
        id: string;
        body: IPersonRequest;
    }): Promise<IPersonEntity | null> {
        // const cdnHost = await this.dictionariesService.getBlobProxy();
        const response = this.personApi.updatePerson(id, body)
        return response;
    }
}
