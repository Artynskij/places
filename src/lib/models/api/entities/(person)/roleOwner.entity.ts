import { TRoleOwner } from "@/lib/models/types/TRoleOwner";

export interface IRoleOwnerWithContentEntity {
    id: string;
    entity: IRoleOwnerEntity;
    content: {};
}
export interface IRoleOwnerEntity {
    Id: string;
    Code: TRoleOwner;
    Name: string;
    ContentId: string;
}
