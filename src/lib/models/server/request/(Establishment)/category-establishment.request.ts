import { TLocale } from "@/lib/models/types";
import { IContentSimpleEntity } from "../../entities";

export interface ICategoryEstablishmentRequest {
    source: {
        RootCategoryId: string | null;
        Name: string;
        Type: {
            Id: string;
        };
        RefName: string;
    };
    content: Omit<IContentSimpleEntity, "id">;
}
export interface ICategoryEstablishmentGetAllRequest {
    ids?: string[];
    lang?: TLocale;
    typeId?: string;
    rootCategoryId?: string;
}
