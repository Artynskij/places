import { IBaseSimpleEntity } from "../../base/base.entity";

export interface IArticleSubTypeEntity extends IBaseSimpleEntity {
    ArticleTypeId: string;
    Description: string;
    SortOrder: number;
    IsActive: boolean;
}
