import { IArticleSubTypeEntity } from "../../server/entities";
import { IBaseSimpleFront } from "../base/base.front";
import { IArticleFront } from "./article.front";

export interface IArticleTypeFront extends IBaseSimpleFront {
    isActive: boolean;
    description: string | null;
    sortOrder: number | null;
    subTypes: IArticleSubTypeEntity[];
    articlesCount: number;
}
export interface IArticleTypeWithArticles {
    type: IArticleTypeFront;
    articles: IArticleFront[];
}
