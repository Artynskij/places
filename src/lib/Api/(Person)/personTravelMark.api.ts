import apiClient from "../ApiClient";
import { BaseApiService } from "../BaseApi.service";

import {
    ILocationFront,
    ILocationsWithContentEntity,
    IPersonTravelMarkEntity,
    IPersonTravelMarkFront,
    IPersonTravelMarkRequest,
} from "@/lib/models";
import { LocationService } from "../location/location.service";
export class PersonTravelMarkMapper {
    toFront(
        data: IPersonTravelMarkEntity
        // cdnHost?: string,
        // location?: ILocationsWithContentEntity
    ): IPersonTravelMarkFront {
        console.log(data);
        return {
            id: data.Id,
            isLoved: data.IsLoved,
            isWanted: data.IsWanted,
            isVisited: data.IsVisited,
            location: {
                id: data.Location.Id,
                title: data.Location.content?.details[0].value || "gavno",
            },
            personId: data.Person.Id,
        };
    }
}
export class PersonTravelMarkService extends BaseApiService<
    IPersonTravelMarkEntity,
    IPersonTravelMarkEntity,
    IPersonTravelMarkFront,
    IPersonTravelMarkRequest
> {
    protected baseUrl = "/person-travel-marks";
    protected mapper = new PersonTravelMarkMapper();

    async getByPersonId(personId: string): Promise<IPersonTravelMarkFront[]> {
        try {
            const res = await apiClient.get<IPersonTravelMarkEntity[]>(
                `${this.baseUrl}/?personId=${personId}`
            );

            return res.data.map((markItem) => this.mapper.toFront(markItem));
        } catch (error) {
            console.error(
                `error [get ${this.baseUrl}/personId=${personId}]`,
                error
            );
            return [];
        }
    }
}
