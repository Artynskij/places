import { TTypesOfEstablishment } from "../../common/TTypesEstablishment";
import { ICategoryFront } from "../category/category.front";
import { ICategoryPartFront } from "../parts/category/category.frontPart";
import { IContactsPartFront } from "../parts/contacts/contacts.frontPart";
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
        country: { id: string; title: string  };
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
    contacts: IContactsPartFront | null;
    media: {
        cdnHost: string;
        gallery: IMediaFront[];
    };
    seo: { key: string; value: string }[];
}
