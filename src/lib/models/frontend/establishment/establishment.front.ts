import { TTypesOfEstablishment } from "../../types/TTypesEstablishment";
import { ICategoryFront } from "../category/category.front";

import { IContactsOfEstablishmentPartFront } from "../parts/contacts/contactsOfEstablishment.frontPart";
import { IMediaFront } from "../parts/media/media.frontPart";

export interface IEstablishmentFront {
    id: string;
    title: string;
    description: string;
    typeEstablishment: TTypesOfEstablishment;
    category: ICategoryFront;
    rates: {
        main: number;
        count: number;
        additional: ({
            key:
                | "Atmosphere"
                | "Food"
                | "Service"
                | "Value"
                | "Rooms"
                | "PriceQuality"
                | "Clean"
                | "Location"
                | string;
            value: number;
        } | null)[];
    };
    location: {
        country: { id: string; title: string };
        town: { id: string; title: string };
        street: string;
        latitude: number;
        longitude: number;
        postalCode: string;
        pathBreadcrumb: string;
        info: {
            totalEstablishment: number | null;
        };
    };
    contacts: IContactsOfEstablishmentPartFront | null;
    media: {
        cdnHost: string;
        gallery: IMediaFront[] | null;
    };
    seo: { key: string; value: string }[];
}
