import { IContentEntity, IContentEstablishment, IEstablishmentPersonAssignWithContentEntity } from "../../api/entities";
import { TTypesOfEstablishment } from "../../types/TTypesEstablishment";
import { ICategoryFront } from "./category.front";

import { IContactsEstablishmentFront } from "./parts/contactsEstablishment.front";
import { IMediaFront } from "./parts/media.front";

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
            count: number;
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
    contacts: IContactsEstablishmentFront | null;
    media: {
        gallery: IMediaFront[] | null;
    };
    seo: { key: string; value: string }[];
    content?:IContentEstablishment
}
export interface IEstablishmentPersonAssignFront {
    Id: string;
    PersonId: string | null;
    EstablishmentId: string | null;
    IsOwner: boolean;
    IsVerified: boolean;
    IsAddedByPerson: boolean;
    Source: "Manual" | "AutoParser" | "AdminPanel" | "Search" | "Cabinet";
    Note: string | null;
}
