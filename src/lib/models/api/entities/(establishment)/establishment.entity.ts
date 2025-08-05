import { TTypesOfEstablishment } from "@/lib/models/types/TTypesEstablishment";
import { ICategoryEstablishmentPart } from "./parts/categoryEstablishmentPart.entity";
import { IContactsEstablishmentEntity } from "./parts/contactEstablishment.entity";
import { IContentEntity } from "./parts/content.entity";
import { IImageEntity } from "./parts/image.entity";
import { IRateEntity } from "./parts/rate.entity";
import { ITypeEstablishmentWithContent } from "./typeEstablishment.entity";
interface ILocationsInEstablishment {
    Id: string;
    ParentId: string;
    Path: string;
    content: IContentEntity;
}
export interface IEstablishmentEntity {
    establishment: {
        AvgRate: number | null;
        CountOfRates: number | null;
        Id: string;
        Latitude: string;
        Longitude: string;
        PostalCode: string;
        ContentId: string;
        Moderate: null | boolean;
        Type: ITypeEstablishmentWithContent;
        Categories: ICategoryEstablishmentPart[];
        Contacts: IContactsEstablishmentEntity | null;
        Locations: ILocationsInEstablishment | null;
        Rates: IRateEntity | null;
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
export interface IEstablishmentCreatedEntity {
    AvgRate: number | null;
    CountOfRates: number | null;
    Id: string;
    Latitude: string;
    Longitude: string;
    PostalCode: string;
    ContentId: string;
    Moderate: null | boolean;
    Type: ITypeEstablishmentWithContent;
    Categories: ICategoryEstablishmentPart[];
    Contacts: IContactsEstablishmentEntity | null;
    Locations: ILocationsInEstablishment | null;
    Rates: IRateEntity;
}
