import { IContentSimpleEntity } from "../../base";
import { IBaseEntity, IBaseSimpleEntity } from "../../base/base.entity";
import { IArticleTypeEntity } from "./article-type.entity";
export interface IArticleSubTypeWithContentEntity extends IBaseSimpleEntity {
    ArticleTypeId: string;
    Description: string;
    SortOrder: number;
    IsActive: boolean;
    ArticleType: IArticleTypeEntity;
}
export interface IArticleSubTypeEntity
    extends Omit<IArticleSubTypeWithContentEntity, "content"> {}
export interface IArticleSubTypeWithContentPareEntity {
    articleSubType: IArticleSubTypeEntity;
    content: IContentSimpleEntity;
    articlesCount: number;
}
export interface IArticleSubTypeRelation extends IBaseEntity {
    ArticleId: string;
    ArticleSubTypeId: string;
    ArticleSubTypeEntity: IArticleSubTypeWithContentEntity;
}
