import { ISearchQueryResponse } from "@/lib/models/api/response/search/ISearch.response";
import { SearchApi } from "./search.endpoint";
import { ISearchQueryRequest } from "@/lib/models/api/request/search/ISearchQuery.request";
import { ISearchQueryResponseFront } from "@/lib/models/frontend/search/searchQueryResponse.front";
import { SearchMapper } from "./search.mapper";

export class SearchService {
    private searchApi: SearchApi;
    private searchMapper: SearchMapper;
    constructor() {
        this.searchApi = new SearchApi();
        this.searchMapper = new SearchMapper();
    }
    async querySearch(
        body: ISearchQueryRequest
    ): Promise<ISearchQueryResponseFront | null> {
        const response = await this.searchApi.querySearch(body);
        const mappingData = response
            ? this.searchMapper.mapSearchQuery(response)
            : null;
        return mappingData;
    }
}
