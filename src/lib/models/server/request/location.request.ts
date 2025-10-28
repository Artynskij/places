import { TLocale } from "@/lib/models/types";
import { IImageEntity } from "./../entities";
import { IContentMultilingualRequest } from "../base/multilingual-content.request";
import { IBaseModerationRequest } from "../base/base.request";
import { IPaginationBaseRequest } from "../base";

export interface ILocationPaginationRequest extends IPaginationBaseRequest {
    locationId?: string;
    locationTypeIds?: string[];
}
interface locationData {
    source: {
        Path?: string;
        ParentId?: string;
        StaticMapPath?: string;
        LocationType?: string;
        Country?: string;
    };
    content: IContentMultilingualRequest;
}
export interface ILocationUpdateRequest
    extends IBaseModerationRequest<locationData> {}
