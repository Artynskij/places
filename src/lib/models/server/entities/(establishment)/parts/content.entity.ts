import { TLocale } from "@/lib/models/types";
import { IImageEntity } from "./image.entity";

export interface IContentEntity {
    id: string;
    details: {
        lang: TLocale;
        value: string;
        _id: string;
        secondaryValue?: string | null;
        cName?: string | null;
        cIcon?: string | null;
    }[];
}
export interface IContentEntityWithMedia extends IContentEntity {
    media: { gallery: IImageEntity[] };
}
export interface IContentMultilingualEntity<TDetails = {}> {
    value: {
        lang: TLocale;
        details: {
            seo?: { title: string; description: string };

            title: string;
            description: string | null;
            slug?: string;
        } & TDetails;
    }[];
    media?: { gallery: IImageEntity[] };
}

export interface IContentEstablishment {
    id: string;
    type: string;
    collection: string;
    value: {
        lang: TLocale;
        value: {
            details: {
                title: string;
                description: string;
            };
            seoTrip?:
                | {
                      key: string;
                      value: string;
                  }[]
                | [];
            seo?:
                | {
                      key: string;
                      value: string;
                  }[]
                | [];

            location: {
                street1: string;
                street2: string;
            };
        };
    }[];
    media: {
        gallery: IImageEntity[] | null;
    };
}
