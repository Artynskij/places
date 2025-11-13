import { IBaseEntity, IBaseSimpleEntity } from "../../base/base.entity";
import { IContentSimpleEntity } from "../../base/content.entity";
import { IArticleSubTypeEntity } from "./article-subType.entity";
export interface IArticleTypeWithContentEntity extends IBaseSimpleEntity {
    Description: string;
    SortOrder: number;
    IsActive: boolean;
    SubTypes: IArticleSubTypeEntity[];
}
export interface IArticleTypeEntity
    extends Omit<IArticleTypeWithContentEntity, "content"> {}

export interface IArticleTypeWithContentPareEntity {
    articleType: IArticleTypeEntity;
    content: IContentSimpleEntity;
    articlesCount: number;
}
export interface IArticleTypeRelation extends IBaseEntity {
    ArticleId: string;
    ArticleTypeId: string;
    ArticleTypeEntity: IArticleTypeWithContentEntity;
}
