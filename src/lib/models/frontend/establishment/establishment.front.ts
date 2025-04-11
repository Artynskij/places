import { ITypesOfEstablishment } from "../../IType";
import { IContactsFront } from "../parts/contacts/contacts.frontPart";
import { IImageFront } from "../parts/image/image.frontPart";

export interface IEstablishmentFront {
    id: string;
    title: string;
    description: string;
    typeEstablishment: ITypesOfEstablishment;
    category: string;
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
        country: { id: string; value: string | null };
        town: { id: string; value: string };
        street: string;
        latitude: string;
        longitude: string;
        postalCode: string;
        info: {
            totalEstablishment: number | null;
        };
    };
    contacts: IContactsFront | null;
    media: {
        cdnHost: string;
        gallery: IImageFront[];
    };
    seo: { key: string; value: string }[];
}
