

import { TTypesOfEstablishment } from "@/lib/models/types/TTypesEstablishment";
import { ICategoryOfEstablishmentPart } from "./parts/categoryOfEstablishmentPart.entity";
import { IContactsOfEstablishmentEntity } from "./parts/contactOfEstablishment.entity";
import { IContentEntity } from "./parts/content.entity";
import { IImageEntity } from "./parts/image.entity";
import { IRateEntity } from "./parts/rate.entity";
interface ILocationsInEstablishment {
    Id: string;
    ParentId: string;
    Path: string;
    content: IContentEntity;
}
export interface IEstablishmentEntity {
    establishment: {
        AvgRate: number;
        CountOfRates: number;
        Id: string;
        Latitude: string;
        Longitude: string;
        PostalCode: string;
        ContentId: string;
        Moderate: null | boolean;
        Type: {
            Id: string;
            Name: TTypesOfEstablishment;
            RefName: string;
            ContentId: string;
            Content: IContentEntity;
        };
        Categories: ICategoryOfEstablishmentPart[];
        Contacts: IContactsOfEstablishmentEntity | null;
        Locations: ILocationsInEstablishment | null;
        Rates: IRateEntity;
    };
    content: {
        id: string;
        type: string;
        collection: string;
        value: {
            lang: string;
            value: {
                details: {
                    title: string;
                    description: string;
                };
                seoTrip: {
                    key: string;
                    value: string;
                }[];

                location: {
                    street1: string;
                    street2: string;
                };
            };
        }[];
        media: {
            gallery: IImageEntity[] | null;
        };
    };
}
