import { IContentMultilingualEntity } from "../../base/content.entity";
import { IBaseEntity } from "../../base/base.entity";
import { IArticleStatusEntity } from "./article-status.entity";
import { IPersonEntity } from "../(person)/person.entity";
interface ContentArticlePart {
    image: string;
    author: string;
    date: string;
    markdown: any;
    tags: string[];
    reactions: number[];
    seo?: { title: string; description: string };
    title: string;
    description: string | null;
    slug?: string;
}
interface ContentArticle
    extends IContentMultilingualEntity<ContentArticlePart> {}

export interface IArticleEntity extends IBaseEntity {
    ArticleType: string;
    ArticlesStatus: IArticleStatusEntity;
    ArticlesStatusId: string;
    HashTags: string[];
    IsActive: boolean;
    Person: IPersonEntity;
    PersonId: string;
    ReadingTimeMinutes: number;
    RequiresModeration: boolean;
}
export interface IArticleEntityWithContent {
    article: IArticleEntity;
    content: ContentArticle;
}
