import { BaseApiService } from "./base/BaseApi.service";

import {
    ILocationTypeEntity,
    ILocationTypesRequest,
    ILocationTypeWithContentEntity,
} from "../models";

export class LocationTypesService extends BaseApiService<
    ILocationTypeEntity,
    ILocationTypeWithContentEntity,
    ILocationTypeEntity,
    ILocationTypesRequest
> {
    protected baseUrl = "/types-of-location";
}
