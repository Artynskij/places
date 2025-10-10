import { IBaseModerationResponse } from "@/lib/models/server/response/base/base-moderation.response";
// import { BaseApiService } from "../../BaseApi.service";

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
