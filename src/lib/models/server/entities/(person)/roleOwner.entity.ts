import { TRoleOwner } from "@/lib/models/types/TRoleOwner";
import { IContentEntity } from "../(establishment)/parts/content.entity";
import { IBaseEntity } from "../base/base.entity";

export interface IRoleOwnerWithContentEntity {
    id: string;
    entity: IRoleOwnerEntity;
    content: IContentEntity | null;
}
export interface IRoleOwnerEntity extends IBaseEntity {
    Id: string;
    Code: TRoleOwner;
    Name: string;
}
