import PersonSettingsApi from "./personSettings.endpoints";
import { IPersonSettingsFront } from "@/lib/models/frontend/(person)/personSettings.front";
import { IPersonSettingsRequest } from "@/lib/models/api/request/(Person)/personSettings.request";
import { PersonService } from "../person/person.service";
import { PersonSettingsMapper } from "./personSettings.mapper";

export class PersonSettingsService {
    private PersonSettingsApi: PersonSettingsApi;
    private PersonSettingsMapper: PersonSettingsMapper;
    private PersonService: PersonService;

    constructor() {
        this.PersonSettingsApi = new PersonSettingsApi();
        this.PersonSettingsMapper = new PersonSettingsMapper();
        this.PersonService = new PersonService();
    }

    async getPersonSettingsById(
        id: string,
        lang?: string
    ): Promise<IPersonSettingsFront | null> {
        const response = await this.PersonSettingsApi.getPersonSettingsById(
            id,
            lang
        ).then((res) => {
            if (!res) return null;
            const mappedData =
                this.PersonSettingsMapper.transformPersonSettingsEntity(res);
            return mappedData;
        });
        return response;
    }

    async createPersonSettings(
        idPerson: string
    ): Promise<IPersonSettingsFront | null> {
        const response = this.PersonSettingsApi.createPersonSettings()
            .then(async (res) => {
                await this.PersonService.update(idPerson, {
                    source: {
                        PersonSettings: res?.Id,
                    },
                });

                return res;
            })
            .then((res) => {
                if (!res) return null;
                const mappedData =
                    this.PersonSettingsMapper.transformPersonSettingsEntity(
                        res
                    );
                return mappedData;
            });
        return response;
    }
    async updatePersonSettings(
        id: string,
        body: IPersonSettingsRequest
    ): Promise<IPersonSettingsFront | null> {
        const response = this.PersonSettingsApi.updatePersonSettings(
            id,
            body
        ).then((res) => {
            if (!res) return null;
            const mappedData =
                this.PersonSettingsMapper.transformPersonSettingsEntity(res);
            return mappedData;
        });
        return response;
    }
}
