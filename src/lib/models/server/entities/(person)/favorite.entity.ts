import { TTypeFavoriteDb } from "@/lib/models/types";
import { IBaseEntity, IBaseSimpleEntity } from "../../base/base.entity";
import { IPersonEntity } from "./person.entity";

export interface IFavoriteTypeEntity extends Omit<IBaseSimpleEntity, "Code"> {
    Name: TTypeFavoriteDb;
}
export interface IFavoriteEntity extends IBaseEntity {
    Person: IPersonEntity;
    ItemType: IFavoriteTypeEntity;
    ResolvedItem: null;
    ItemId: string;
}
