import { TLocale } from "@/lib/models/types";

import { IPaginationBaseRequest } from "../../base/pagination-base.request";
import { IContentMultilingualRequest } from "../../base/multilingual-content.request";

export interface IPaginationArticleRequest extends IPaginationBaseRequest {
    pagination: {
        page: number;
        pageSize: number;
    };
}
export interface IArticleWithFilterRequest {
    lang?: TLocale;
    page?: number;
    pageSize?: number;
    personId?: string;
}
interface ContentPartArticle {
    markdown: string;
    tags?: string[];
    reactions?: number[];
    title: string;
    seo: { title: string; description: string };
}
interface ContentArticle
    extends IContentMultilingualRequest<ContentPartArticle> {}
export interface IArticleRequest {
    source: {
        PersonId: string;
        // BusinessId?: string;
        ArticlesStatusId: string;
        ReadingTimeMinutes: number;
    };
    content: ContentArticle;
}

// доп
export interface IArticleUpdateStatusRequest {
    articleIds: string[];
    statusId: string;
}
