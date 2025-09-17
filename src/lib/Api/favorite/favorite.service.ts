import {
    IFavoriteCreateRequest,
    IFavoriteGetQueryRequest,
} from "@/lib/models/server/request/(Person)/favorite.request";
import FavoriteApi from "./favorite.endpoints";
import { IFavoriteEntity } from "@/lib/models";

export class FileUploadService {
    private FavoriteApi: FavoriteApi;

    constructor() {
        this.FavoriteApi = new FavoriteApi();
    }

    async create(
        body: IFavoriteCreateRequest
    ): Promise<IFavoriteEntity | null> {
        const response = await this.FavoriteApi.create(body);

        return response;
    }
    async getByQuery(
        query: IFavoriteGetQueryRequest
    ): Promise<IFavoriteEntity[] | null> {
        const response = await this.FavoriteApi.getByQuery(query);

        return response;
    }
    async delete(id: string): Promise<IFavoriteEntity | null> {
        const response = await this.FavoriteApi.delete(id);

        return response;
    }
}
