import {
    IFavoriteCreateRequest,
    IFavoriteGetQueryRequest,
} from "@/lib/models/server/request/(Person)/favorite.request";
import FavoriteApi from "./favorite.endpoints";
import { IFavoriteEntity, IFavoriteFront } from "@/lib/models";
import { FavoriteMapper } from "./favorite.mapper";
import { DataLoadManagementService } from "../dataLoadManagement/dataLoadManagement.service";

export class FavoriteService {
    private FavoriteApi: FavoriteApi;
    private favoriteMapper: FavoriteMapper;
    private dataLoadManagementService: DataLoadManagementService;

    constructor() {
        this.FavoriteApi = new FavoriteApi();
        this.favoriteMapper = new FavoriteMapper();
        this.dataLoadManagementService = new DataLoadManagementService();
    }

    async create(body: IFavoriteCreateRequest): Promise<IFavoriteFront | null> {
        const response = await this.FavoriteApi.create(body);
        const cdnHost = await this.dataLoadManagementService.getBlobProxy();
        if (!response || !cdnHost) return null;
        const mappedData = this.favoriteMapper.toFront(response, cdnHost.url)
        return mappedData;
    }
    async getByQuery(
        query: IFavoriteGetQueryRequest
    ): Promise<IFavoriteFront[] | null> {
        const response = await this.FavoriteApi.getByQuery(query);
        const cdnHost = await this.dataLoadManagementService.getBlobProxy();
        if (!response || !cdnHost) return null;
        const mappedData = response.map((favItem) =>
            this.favoriteMapper.toFront(favItem, cdnHost.url)
        );
        return mappedData;
    }
    async delete(id: string): Promise<boolean | null> {
        const response = await this.FavoriteApi.delete(id);

        return response;
    }
}
