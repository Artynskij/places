import { TLocale } from "@/lib/models/types";
import { IImageEntity } from "./../entities";
import { IContentRequest } from "./base/multilingual-content.request";
import { IBaseModerationRequest } from "./base/base-with-moderation.request";

export interface ILocationInsidePaginationRequest {
    pagination: {
        page: number;
        pageSize: number;
    };
    lang?: string;
    locationId?: string;
    ids?: string[];
}
interface locationData {
    source: {
        Path?: string;
        ParentId?: string;
        StaticMapPath?: string;
        LocationType?: string;
        Country?: string;
    };
    content: IContentRequest;
}
export interface ILocationUpdateRequest
    extends IBaseModerationRequest<locationData> {}
