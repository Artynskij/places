import { TTypeFavoriteDb } from "@/lib/models/types";
import { IBaseEntity } from "../../base/base.entity";
import { IPersonEntity } from "./person.entity";

export interface IFavoriteTypeEntity extends IBaseEntity {
    Id: string;
    Name: TTypeFavoriteDb;
}
export interface IFavoriteEntity extends IBaseEntity {
    Person: IPersonEntity;
    ItemType: IFavoriteTypeEntity;
    ResolvedItem: null;
    ItemId: string;
}
