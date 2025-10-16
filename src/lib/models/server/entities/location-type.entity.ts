import { IContentMultilingualEntity } from "../base/content.entity";
import { IBaseEntity } from "../base/base.entity";

export interface ILocationTypeEntity extends IBaseEntity {
    Name: string;
}
export interface ILocationTypeWithContentEntity {
    type: ILocationTypeEntity;
    content: IContentMultilingualEntity | null;
}
