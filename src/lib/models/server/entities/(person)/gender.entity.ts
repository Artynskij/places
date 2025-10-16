import { IContentSimpleEntity } from "../../base/content.entity";
import { IBaseEntity } from "../../base/base.entity";

export interface IGenderWithContentEntity {
    gender: IGenderEntity;

    content: IContentSimpleEntity | null;
}
export interface IGenderEntity extends IBaseEntity {
    Code: string;
    Name: string;

    Content?: IContentSimpleEntity | null;
}
