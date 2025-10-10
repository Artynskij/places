import { IContentMultilingualEntity } from "../(establishment)/parts/content.entity";
import { IBaseEntity } from "../base/base.entity";
interface ContentArticlePart {
    image: string;
    author: string;
    date: string;
    markdown: any;
    tags: string[];
    reactions: number[];
}
interface ContentArticle
    extends IContentMultilingualEntity<ContentArticlePart> {}

export interface IArticleEntity extends IBaseEntity {}
export interface IArticleEntityWithContent {
    article: IArticleEntity;
    content: ContentArticle;
}
