
import { SearchApi } from "./search.endpoint";


import { SearchMapper } from "./search.mapper";
import DataLoadManagementApi from "../dataLoadManagement/dataLoadManagement.endpoints";
import { ISearchQueryRequest, ISearchQueryResponseFront } from "@/lib/models";

export class SearchService {
    private searchApi: SearchApi;
    private DataLoadManagementApi: DataLoadManagementApi;
    private searchMapper: SearchMapper;
    constructor() {
        this.searchApi = new SearchApi();
        this.DataLoadManagementApi = new DataLoadManagementApi();
        this.searchMapper = new SearchMapper();
    }
    async querySearch(
        body: ISearchQueryRequest
    ): Promise<ISearchQueryResponseFront | null> {
        const response = await this.searchApi.querySearch(body);

        const cdnHost = await this.DataLoadManagementApi.getBlobProxy();
        const mappingData = response
            ? this.searchMapper.mapSearchQuery(
                  response,
                  body,
                  cdnHost?.url || ""
              )
            : null;

        return mappingData;
    }
}
