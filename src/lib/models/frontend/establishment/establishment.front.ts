
import { TTypesOfEstablishment } from "../../common/TTypesEstablishment";
import { IContactsFront } from "../parts/contacts/contacts.frontPart";
import { IMediaFront } from "../parts/media/media.frontPart";

export interface IEstablishmentFront {
    id: string;
    title: string;
    description: string;
    typeEstablishment: TTypesOfEstablishment;
    category: { id: string; value: string; key: string };
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
        country: { id: string; title: string | null };
        town: { id: string; title: string };
        street: string;
        latitude: string;
        longitude: string;
        postalCode: string;
        pathBreadcrumb: string;
        info: {
            totalEstablishment: number | null;
        };
    };
    contacts: IContactsFront | null;
    media: {
        cdnHost: string;
        gallery: IMediaFront[];
    };
    seo: { key: string; value: string }[];
}
