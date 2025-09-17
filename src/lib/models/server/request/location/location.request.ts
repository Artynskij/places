import { TLocale } from "@/lib/models/types";
import { IImageEntity } from "../../entities";

export interface ILocationInsidePaginationRequest {
    pagination: {
        page: number;
        pageSize: number;
    };
    lang?: string;
    locationId?: string;
    ids?: string[];
}
export interface ILocationUpdateRequest {
    source: {
        Path?: string;
        ParentId?: string;
        StaticMapPath?: string;
        LocationType?: string;
        Country?: string;
    };
    content: {
        details: {
            lang: TLocale;
            value: string;
        }[];
        media: {
            gallery: IImageEntity[] | [];
        };
    };
}
