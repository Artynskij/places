import { TLocale } from "@/lib/models/types";
import { IContentSimpleEntity } from "../../entities";

export interface ICategoryRootEstablishmentRequest {
    source: {
        IsActive: boolean;
        Name: string;
        RefName:string;
    };
    content: Omit<IContentSimpleEntity, "id">;
}
export interface ICategoryRootEstablishmentGetAllRequest {
    ids?: string[];
    lang?: TLocale;
}
