import { TTypesOfEstablishment } from "@/lib/models/types/TTypesEstablishment";
import { IContentEntity } from "./parts/content.entity";
import { IBaseEntity } from "../base/base.entity";

export interface ITypeEstablishmentEntity extends IBaseEntity {
    Name: TTypesOfEstablishment;
    RefName: string;

    Content?: IContentEntity;
}
export interface ITypeEstablishmentWithContentEntity {
    type: ITypeEstablishmentEntity;
    content: IContentEntity;
}
