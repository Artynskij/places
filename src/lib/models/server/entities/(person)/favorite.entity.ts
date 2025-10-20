import { TTypeFavoriteDb } from "@/lib/models/types";
import { IBaseEntity, IBaseSimpleEntity } from "../../base/base.entity";
import { IPersonEntity } from "./person.entity";
import {  IEstablishmentWithContentPareEntity } from "../(establishment)/establishment.entity";
import { IArticleEntityWithContent } from "../(article)/article.entity";

export interface IFavoriteTypeEntity extends Omit<IBaseSimpleEntity, "Code"> {
    Name: TTypeFavoriteDb;
}
export interface IFavoriteEntity extends IBaseEntity {
    Person: IPersonEntity;
    ItemType: IFavoriteTypeEntity;
    ResolvedItem: IEstablishmentWithContentPareEntity | IArticleEntityWithContent;
    ItemId: string;
}
