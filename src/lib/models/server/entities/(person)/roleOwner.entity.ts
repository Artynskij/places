import { TRoleOwner } from "@/lib/models/types/TRoleOwner";
import { IContentSimpleEntity } from "../../base/content.entity";
import { IBaseEntity } from "../../base/base.entity";

export interface IRoleOwnerWithContentEntity {
    id: string;
    entity: IRoleOwnerEntity;
    content: IContentSimpleEntity | null;
}
export interface IRoleOwnerEntity extends IBaseEntity {
    Id: string;
    Code: TRoleOwner;
    Name: string;
}
