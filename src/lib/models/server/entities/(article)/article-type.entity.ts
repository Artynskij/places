import { IBaseSimpleEntity } from "../../base/base.entity";
import { IContentSimpleEntity } from "../../base/content.entity";

export interface IArticleTypeEntity extends IBaseSimpleEntity {
    Description: string;
    SortOrder: number;
    IsActive: boolean;
    
}
