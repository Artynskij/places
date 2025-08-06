import DataLoadManagementApi from "./dataLoadManagement.endpoints";

import {
    ICategoryFront,
    IGenderFront,
    IRoleOwnerEntity,
    ITagBlockFront,
    ITypeEstablishmentWithContentEntity,
} from "@/lib/models";
import { DataLoadManagementMapper } from "./dataLoadManagement.mapper";

import { GenderMapper } from "../(Person)/gender.api";

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
    async getGenders(locale: string): Promise<IGenderFront[] | null> {
        const mapperGender = new GenderMapper();
        const response = await this.DataLoadManagementApi.getGenders(
            locale
        ).then((res) => {
            if (!res) return null;
            return res.map((item) => mapperGender.toFront(item));
        });

        return response;
    }
    async getTypesOfEstablishment(): Promise<
        ITypeEstablishmentWithContentEntity[] | null
    > {
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
