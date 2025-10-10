import { TKeySeo, TLocale } from "@/lib/models/types";
import { IImageEntity } from "../../entities";
import { IPaginationBaseRequest } from "../base/pagination-base.request";
import { IContentMultilingualRequest } from "../base/multilingual-content.request";

export interface IPaginationArticleRequest extends IPaginationBaseRequest {
    pagination: {
        page: number;
        pageSize: number;
    };
}
export interface IArticleWithFilterRequest {
    // ids?: string[];
    lang?: TLocale;
    page?: number;
    pageSize?: number;
    personId?: string;
}
interface ContentPartArticle {
    markdown: string;
    tags?: string[];
    reactions?: number[];
}
interface ContentArticle
    extends IContentMultilingualRequest<ContentPartArticle> {}
export interface IArticleRequest {
    source: {
        PersonId: string;
        BusinessId?: string;
        ArticlesStatusId: string;
        ReadingTimeMinutes: number;
    };
    content: ContentArticle;
}
