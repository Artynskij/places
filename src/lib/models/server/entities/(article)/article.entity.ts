import { IContentMultilingualEntity } from "../../base/content.entity";
import { IBaseEntity } from "../../base/base.entity";
import { IArticleStatusEntity } from "./article-status.entity";
import { IPersonEntity } from "../(person)/person.entity";
import { IArticleTypeRelation } from "./article-type.entity";
import { IArticleSubTypeRelation } from "./article-subType.entity";
import { TTipTapHTMLContent } from "@/lib/models/types";
interface ContentArticlePart {
    image: string;
    author: string;
    date: string;
    markdown: TTipTapHTMLContent;
    tags: string[];
    reactions: number[];
    seo?: { title: string; description: string };
    title: string;
    description: string | null;
    slug?: string;
}
export interface IContentArticle
    extends IContentMultilingualEntity<ContentArticlePart> {}

export interface IArticleEntity extends IBaseEntity {
    ArticleType: string;
    ArticlesStatus: IArticleStatusEntity;
    ArticlesStatusId: string;
    PersonId: string;
    HashTags: string[];
    IsActive: boolean;
    Person: IPersonEntity;
    ReadingTimeMinutes: number;
    RequiresModeration: boolean;
    ArticleTypeRelations:IArticleTypeRelation[]
    ArticleSubTypeRelations:IArticleSubTypeRelation[]
}
export interface IArticleEntityWithPareContent {
    article: IArticleEntity;
    content: IContentArticle;
}
