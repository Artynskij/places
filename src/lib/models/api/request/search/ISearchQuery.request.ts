import { TTypesOfSearchKey } from "@/lib/models/common/TTypesGlobal";

export interface ISearchQueryRequest {
    term: string;
    from?: number;
    size?: number;
    inputLang?: string;
    localLang: string;
    indexKey: TTypesOfSearchKey;
}
