import { TRoleOwner } from "@/lib/models/types/TRoleOwner";
import { IContentEntity } from "../(establishment)/parts/content.entity";

export interface IRoleOwnerWithContentEntity {
    id: string;
    entity: IRoleOwnerEntity;
    content: IContentEntity | null;
}
export interface IRoleOwnerEntity {
    Id: string;
    Code: TRoleOwner;
    Name: string;
    ContentId: string;
}
