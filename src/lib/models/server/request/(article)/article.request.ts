import { TKeySeo, TLocale } from "@/lib/models/types";
import { IImageEntity } from "../../entities";
import { IPaginationRequest } from "../IPagination.request";

export interface IPaginationArticleRequest extends IPaginationRequest {
    pagination: {
        page: number;
        pageSize: number;
    };
}

export interface IArticleRequest {
    source: {
        PersonId: string;
        BusinessId?: string;
        ArticlesStatusId: string;
        ReadingTimeMinutes: number;
    };
    content: {
        value: {
            lang: TLocale;
            value: {
                seo: { key: TKeySeo; value: string }[];
                details: {
                    title: string;
                    description: string | null;
                };
            };
        }[];
        media?: IImageEntity[];
    };
}
