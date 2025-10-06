import {
    IPersonSettingsEntity,
    IPersonSettingsFront,
    IPersonSettingsRequest,
} from "@/lib/models";
import { BaseApiService } from "../base/BaseApi.service";
import { IBaseModerationResponse } from "@/lib/models/server/response/base/base-moderation.response";
import apiClient from "../base/ApiClient";
import { PersonService } from "./person/person.service";

class PersonSettingsMapper {
    constructor() {}
    toFront(personSettingsServer: IPersonSettingsEntity): IPersonSettingsFront {
        const mappedData: IPersonSettingsFront = {
            id: personSettingsServer.Id,
            notifyContentModeration:
                personSettingsServer.NotifyContentModeration,
            notifyPartnerOffers: personSettingsServer.NotifyPartnerOffers,
            notifyNewPlaces: personSettingsServer.NotifyNewPlaces,
            notifyPersonalRecommendations:
                personSettingsServer.NotifyPersonalRecommendations,
            notifyReviewModeration: personSettingsServer.NotifyReviewModeration,
            notifyServiceUpdates: personSettingsServer.NotifyServiceUpdates,
            showPhotoAlbums: personSettingsServer.ShowPhotoAlbums,
            showPosts: personSettingsServer.ShowPosts,
            showRatingsAndReviews: personSettingsServer.ShowRatingsAndReviews,
            showTravelMap: personSettingsServer.ShowTravelMap,
            showVideos: personSettingsServer.ShowVideos,
        };
        return mappedData;
    }
}

export class PersonSettingsService extends BaseApiService<
    IPersonSettingsEntity,
    IPersonSettingsEntity,
    IPersonSettingsFront,
    IPersonSettingsRequest,
    IBaseModerationResponse
> {
    protected baseUrl = "/person-settings";
    protected mapper = new PersonSettingsMapper();
    personService = new PersonService();

    // Создаем отдельный метод для создания с привязкой к Person
    async createForPerson(
        body: IPersonSettingsRequest,
        idPerson: string
    ): Promise<IBaseModerationResponse | null> {
        const response = await this.create(body);
        if (response) {
            await this.personService.update(idPerson, {
                moderation: body.moderation,
                data: {
                    source: {
                        PersonSettings: response.entityId,
                    },
                },
            });
        }

        return response;
    }

    async updateOrCreate(
        id: string | null,
        body: IPersonSettingsRequest,
        idPerson?: string
    ): Promise<IBaseModerationResponse | null> {
       
        if (id) {
            return this.update(id, body);
        } else if (idPerson) {
            return this.createForPerson(body, idPerson);
        } else {
            return this.create(body);
        }
    }
}
