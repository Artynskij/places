import { TTypesOfEstablishment } from "../types/TTypesEstablishment";
import { TGlobalTypes } from "../types/TTypesGlobal";


import { IScheduleFront } from "./(establishment)/schedule.front";
import { ICategoryFront } from "./category.front";

export interface ISearchItemFront {
    id: string;
    title: string;
    description: string;

    lang: string;
    media: { mainImage: string } | null;

    location: {
        lat: number | null;
        lon: number | null;
        country: { id: string; title: string } | null;
        town: { id: string; title: string } | null;
    };
    typeId: string | null;
    typeName: TTypesOfEstablishment | null;
    categories: ICategoryFront[] | [];

    starRating: { key: string; value: string; count: number } | null;
    priceCategory: { key: string; value: string; count: number } | null;
    rate: number | null;
    schedule: IScheduleFront[] | null;

    typeEstablishment: { id: string; key: TTypesOfEstablishment } | null;
    globalTypeEntity: TGlobalTypes;
}

export interface ISearchQueryResponseFront {
    searchItems: ISearchItemFront[];
    info: {
        mode: string | null;
        usedLangs: string[] | null;
        proportions: {
            total: number;
            location: number;
            establishment: number;
            article: number;
        };
        found: {
            location: number;
            establishment: number;
            article: number;
        };
    };
}
