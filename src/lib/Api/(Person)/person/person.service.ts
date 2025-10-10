import PersonApi from "./person.endpoints";
import { IPersonRequest } from "@/lib/models/server/request/(Person)/person.request";
import { IPersonFront } from "@/lib/models/frontend/(person)/person.front";
import { PersonMapper } from "./person.mapper";
import { DataLoadManagementService } from "../../dataLoadManagement/dataLoadManagement.service";
import {
    IPersonEntity,
    IPersonWithContentEntity,
} from "@/lib/models/server/entities/(person)/person.entity";
import { GenderService } from "../gender.api";
import { ITravelProgressFront } from "@/lib/models";
import { IPaginationBaseRequest } from "@/lib/models/server/request/base/pagination-base.request";

export class PersonService {
    private personApi: PersonApi;
    private personMapper: PersonMapper;
    private dataLoadManagementService: DataLoadManagementService;
    private genderService: GenderService;
    constructor() {
        this.personApi = new PersonApi();
        this.personMapper = new PersonMapper();
        this.dataLoadManagementService = new DataLoadManagementService();
        this.genderService = new GenderService();
    }
    async create(body: IPersonRequest): Promise<IPersonEntity | null> {
        const response = await this.personApi.create(body);
        return response;
    }
    async getAll(body: IPaginationBaseRequest): Promise<IPersonFront[] | null> {
        const cdnHost = await this.dataLoadManagementService.getBlobProxy();

        const response = this.personApi.getAll(body).then(async (res) => {
            const gendersServer = await this.genderService.getAll({
                lang: body.lang,
            });
            if (!res || !gendersServer) return null;

            const mappedData = res.map((person) => {
                const genderFound = gendersServer.find(
                    (gen) => gen.id === person.person.Gender?.Id
                );
                return this.personMapper.toFront(
                    person,
                    genderFound || null,
                    cdnHost?.url || null
                );
            });

            return mappedData;
        });

        return response;
    }
    async getById(id: string, lang?: string): Promise<IPersonFront | null> {
        const cdnHost = await this.dataLoadManagementService.getBlobProxy();

        const response = this.personApi.getById(id, lang).then(async (res) => {
            if (!res) return null;

            const genderServer = res.person.Gender?.Id
                ? await this.genderService.getById(res.person.Gender.Id)
                : null;

            const mappedData = this.personMapper.toFront(
                res,
                genderServer,
                cdnHost?.url || null
            );
            return mappedData;
        });

        return response;
    }
    async getByEmail(email: string): Promise<string | null> {
        const response = this.personApi.getByEmail(email);

        return response;
    }

    async update(
        id: string,
        body: IPersonRequest
    ): Promise<IPersonWithContentEntity | null> {
        const response = this.personApi.update(id, body);
        return response;
    }
    async getTravelProgress(
        personId: string
    ): Promise<ITravelProgressFront | null> {
        const response = this.personApi.getTravelProgress(personId);
        return response;
    }
}
