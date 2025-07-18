import PersonSettingsApi from "./personSettings.endpoints";
import { IPersonSettingsFront } from "@/lib/models/frontend/(person)/personSettings.front";
import { IPersonSettingsRequest } from "@/lib/models/api/request/(Person)/personSettings.request";
import { PersonService } from "../person/person.service";

export class PersonSettingsService {
    private PersonSettingsApi: PersonSettingsApi;
    private PersonService: PersonService;

    constructor() {
        this.PersonSettingsApi = new PersonSettingsApi();
        this.PersonService = new PersonService();
    }

    async getPersonSettingsById(
        id: string,
        lang?: string
    ): Promise<IPersonSettingsFront | null> {
        const response = this.PersonSettingsApi.getPersonSettingsById(id, lang);
        return response;
    }

    async createPersonSettings(
        idPerson: string
    ): Promise<IPersonSettingsFront | null> {
        const response = this.PersonSettingsApi.createPersonSettings().then(
            async (res) => {
                await this.PersonService.updatePerson(idPerson, {
                    PersonSettings: res?.Id,
                });

                return res;
            }
        );
        return response;
    }
    async updatePersonSettings(
        id: string,
        body: IPersonSettingsRequest
    ): Promise<IPersonSettingsFront | null> {
        const response = this.PersonSettingsApi.updatePersonSettings(id, body);
        return response;
    }
}
