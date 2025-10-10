import { TKeySeo, TLocale } from "@/lib/models/types";
import { IImageEntity } from "../../entities";

export interface IContentMultilingualRequest<TDetails = {}> {
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
export interface IContentRequest<TDetails = {}> {
    details: {
        lang: TLocale;
        value?:string
    }[] & TDetails[];
    media?: { gallery: IImageEntity[] };
}
