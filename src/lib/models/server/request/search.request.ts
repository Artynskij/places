import { TTypesOfSearchKey } from "@/lib/models/types/TTypesGlobal";

export interface ISearchQueryRequest {
    term: string;
    from?: number;
    size?: number;
    inputLang?: string;
    localLang: string;
    indexKey: TTypesOfSearchKey;
}
