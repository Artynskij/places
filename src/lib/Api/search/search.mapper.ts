import { ISearchItemFront } from "@/lib/models";
import { ISearchQueryResponse } from "@/lib/models/api/response/search/ISearch.response";
import { ISearchQueryResponseFront } from "@/lib/models/frontend/search/searchQueryResponse.front";

export class SearchMapper {
    constructor() {}
    mapSearchQuery(
        responseBack: ISearchQueryResponse
    ): ISearchQueryResponseFront {
        const lastIndexLocation =
            (responseBack._meta.proportions?.location || 0) ;
        const lastIndexEst =
            (responseBack._meta.proportions?.object || 0) + lastIndexLocation;
        const mapperItems: ISearchItemFront[] = responseBack.hits.map(
            (searchItemBack, index) => {
                const globalTypeEntity =
                    index < lastIndexLocation
                        ? "location"
                        : index < lastIndexEst
                        ? "establishment"
                        : "article";
                return {
                    id: searchItemBack.dbCrossId,
                    title: searchItemBack.title,
                    description: searchItemBack.description,
                    lang: searchItemBack.lang,
                    globalTypeEntity: globalTypeEntity,
                    media: null,
                    location: null,
                    typeEstablishment: null,
                };
            }
        );
        const mapperResponse: ISearchQueryResponseFront = {
            searchItems: mapperItems,
            info: {
                usedLangs: responseBack._meta.usedLangs,
                mode: responseBack._meta.mode || null,
                found: {
                    article: responseBack._meta.found?.article || null,
                    location: responseBack._meta.found?.location || null,
                    establishment: responseBack._meta.found?.object || null,
                },
                proportions: {
                    total: responseBack.total,
                    article: responseBack._meta.proportions?.article || null,
                    location: responseBack._meta.proportions?.location || null,
                    establishment:
                        responseBack._meta.proportions?.object || null,
                },
            },
        };
        return mapperResponse;
    }
}
