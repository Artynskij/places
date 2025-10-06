import { IContentEntity } from "../(establishment)/parts/content.entity";
import { IBaseEntity } from "../base/base.entity";

export interface IGenderWithContentEntity {
    gender: IGenderEntity;

    content: IContentEntity | null;
}
export interface IGenderEntity extends IBaseEntity {
    Code: string;
    Name: string;

    Content?: IContentEntity | null;
}
