import { locales } from "@/config";
import { IPaginationRequest } from "../IPagination.request";
import { TLocale } from "@/lib/models/types/TLocale";
import { TTypeFile } from "@/lib/models/types/TTypeFile";
import { IImageEntity } from "../../entities";

export interface IPaginationEstablishmentRequest extends IPaginationRequest {
    filter?: {
        typeIds?: number[] | string[];
        categoryIds?: number[] | string[];
        tagsIds?: number[] | string[];
        locationId?: string;
    };

    pagination: {
        page: number;
        pageSize: number;
    };
}

export interface IEstablishmentCreateRequest {
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
    content?: {
        value?: {
            lang: string;
            value: {
                details: {
                    title: string;
                    description: string | null;
                };
                seo: { key: string; value: string }[] | null;
                location: {
                    street1: string | null;
                    street2?: string | null;
                };
            };
        }[];
        media?: {
            gallery: IImageEntity[] | null;
        };
    };
}
export interface IEstablishmentPersonAssignRequest {
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
export interface IEstablishmentPersonAssignGetAllRequest {
    personIds?: string[];
    // establishmentIds?: string[];
}
