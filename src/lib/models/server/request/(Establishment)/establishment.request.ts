import { locales } from "@/config";
import { IPaginationBaseRequest } from "../base/pagination-base.request";
import { TLocale } from "@/lib/models/types/TLocale";
import { TTypeFile } from "@/lib/models/types/TTypeFile";
import { IImageEntity } from "../../entities";
import { TTypeSortEstablishmentServer } from "@/lib/models/types";
import { IBaseModerationRequest } from "../base/base-with-moderation.request";

export interface IPaginationEstablishmentRequest
    extends IPaginationBaseRequest {
    filter?: {
        typeIds?: number[] | string[];
        categoryIds?: number[] | string[];
        tagsIds?: number[] | string[];
        locationId?: string;
    };
    sort?: {
        avgRate: TTypeSortEstablishmentServer;
    };
    pagination: {
        page: number;
        pageSize: number;
    };
}
export interface IContentEstablishmentCreateRequest {
    value?: {
        lang: string;
        value: {
            details: {
                title: string;
                description: string | null;
            };
            seo?: { key: string; value: string }[] | null;
            location: {
                street1: string | null;
                street2?: string | null;
            };
            seoTrip?: { key: string; value: string }[] | null;
        };
    }[];
    media?: {
        gallery: IImageEntity[] | null;
    };
}
interface EstablishmentCreateRequestData {
    source?: {
        Latitude?: number;
        Longitude?: number;

        StaticMapPath?: string;
        Moderate?: boolean;
        // AvgRate: 0;
        // CountOfRates: 0;
        Locations?: string;
        CategoryIds?: string[];
        Contacts?: string;
        Type?: string;
    };
    content?: IContentEstablishmentCreateRequest;
}
export interface IEstablishmentCreateRequest
    extends IBaseModerationRequest<EstablishmentCreateRequestData> {}
interface EstablishmentPersonAssignRequestData {
    source: {
        Person: string;
        Establishment: string;
        IsOwner?: boolean;
        IsVerified?: boolean;
        IsAddedByPerson: boolean;
        Source: "Manual" | "AutoParser" | "AdminPanel" | "Search" | "Cabinet";
        Note: string;
    };
    content?: {
        details: [
            {
                lang: string;
                value: string;
            }
        ];
    };
}
export interface IEstablishmentPersonAssignRequest
    extends IBaseModerationRequest<EstablishmentPersonAssignRequestData> {}
export interface IEstablishmentPersonAssignGetAllRequest {
    personIds?: string[];
}
