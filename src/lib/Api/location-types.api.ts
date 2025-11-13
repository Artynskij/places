import { BaseApiService } from "./base/BaseApi.service";

import {
    ILocationTypeEntity,
    ILocationTypesGetAllRequest,
    ILocationTypesRequest,
    ILocationTypeWithContentEntity,
} from "../models";
import apiClient from "./base/ApiClient";

export class LocationTypesService extends BaseApiService<
    ILocationTypeEntity,
    ILocationTypeWithContentEntity,
    ILocationTypeEntity,
    ILocationTypesRequest
> {
    protected baseUrl = "/types-of-location";
    async getAll(
        body?: ILocationTypesGetAllRequest
    ): Promise<ILocationTypeWithContentEntity[] | null> {
        try {
            const response = await apiClient.post(
                `${this.baseUrl}/get-all`,
                body
            );
            return response.data;
        } catch (error) {
            console.error(`error [post ${this.baseUrl}/get-all`);
            return null;
        }
    }
}
