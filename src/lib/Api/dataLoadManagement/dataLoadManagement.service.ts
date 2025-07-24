import { IRoleOwnerEntity } from "@/lib/models/api/entities/dataLoadManagement/roleOwner.entity";
import DataLoadManagementApi from "./dataLoadManagement.endpoints";
import { ITypeOfEstablishment } from "@/lib/models/api/entities/typeOfEstablishment.entity";
import { ICategoryFront, ITagBlockFront } from "@/lib/models";
import { DataLoadManagementMapper } from "./dataLoadManagement.mapper";

export class DataLoadManagementService {
    // DataLoadManagementMapper
    private DataLoadManagementApi: DataLoadManagementApi;
    private DataLoadManagementMapper: DataLoadManagementMapper;

    constructor() {
        this.DataLoadManagementApi = new DataLoadManagementApi();
        this.DataLoadManagementMapper = new DataLoadManagementMapper();
    }

    async getRolesOwner(): Promise<IRoleOwnerEntity[] | null> {
        const response = await this.DataLoadManagementApi.getRolesOwner();

        return response;
    }
    async getTypesOfEstablishment(): Promise<ITypeOfEstablishment[] | null> {
        const response =
            await this.DataLoadManagementApi.getTypesOfEstablishment();

        return response;
    }
    async getBlockTags(locale: string): Promise<ITagBlockFront[] | null> {
        const response =
            await this.DataLoadManagementApi.getTagsBlockOfEstablishments(
                locale
            );
        if (!response) {
            return null;
        }
        const mappedData =
            this.DataLoadManagementMapper.tagsBlockMapper(response);

        return mappedData;
    }
    async getCategories(locale: string): Promise<ICategoryFront[] | null> {
        const response =
            await this.DataLoadManagementApi.getCategoriesOfEstablishments(
                locale
            );
        if (!response) {
            return null;
        }
        const mappedData =
            this.DataLoadManagementMapper.categoriesOfEstablishment(response);
        return mappedData;
    }
    async getBlobProxy(): Promise<{ url: string } | null> {
        const response = this.DataLoadManagementApi.getBlobProxy();
        return response;
    }
}
