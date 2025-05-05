
import { ITypesOfEstablishment } from "../../common/TTypesEstablishment";
import { ICategoryEntity } from "./category.entity";
import { ILocationsEntity } from "./locations.entity";
import { IContactsEntity } from "./parts/contact.entity";
import { IContentEntity } from "./parts/content.entity";
import { IImageEntity } from "./parts/image.entity";
import { IRateEntity } from "./parts/rate.entity";
interface ILocationsInEstablishment {
    Id: string;
    ParentId: string;
    Path: string;
    Content:IContentEntity;
}
export interface IEstablishmentEntity {
    establishment: {
        Id: string;
        Latitude: string;
        Longitude: string;
        PostalCode: string;
        ContentId: string;
        Moderate: null | boolean;
        Type: {
            Id: string;
            Name: ITypesOfEstablishment;
            RefName: string;
            ContentId: string;
            Content: IContentEntity;
        };
        Categories: ICategoryEntity[];
        Contacts: IContactsEntity | null;
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
            gallery: IImageEntity[];
        };
    };
}
