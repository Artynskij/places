import DataLoadManagementApi from "./dataLoadManagement.endpoints";

import {
    IBusinessLegalTypesFront,
    ICategoryFront,
    IFavoriteTypeEntity,
    IGenderFront,
    IRoleOwnerWithContentEntity,
    ITagBlockFront,
    ITypeEstablishmentWithContentEntity,
} from "@/lib/models";
import { DataLoadManagementMapper } from "./dataLoadManagement.mapper";

import { GenderMapper } from "../(Person)/gender.api";
import { IRoleOwnerFront } from "@/lib/models/frontend/(person)/roleOwner.front";
import { ILocationTypeWithContentEntity } from "@/lib/models/server/entities/locationType.entity";

export class DataLoadManagementService {
    // DataLoadManagementMapper
    private DataLoadManagementApi: DataLoadManagementApi;
    private DataLoadManagementMapper: DataLoadManagementMapper;

    constructor() {
        this.DataLoadManagementApi = new DataLoadManagementApi();
        this.DataLoadManagementMapper = new DataLoadManagementMapper();
    }

    async getRolesOwner(): Promise<IRoleOwnerFront[] | null> {
        const response = await this.DataLoadManagementApi.getRolesOwner();
        if (!response) {
            return null;
        }
        const mappedData = response.map((item) =>
            this.DataLoadManagementMapper.roleToFront(item)
        );
        return mappedData;
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
    async getTypesLocation(): Promise<ILocationTypeWithContentEntity[] | null> {
        const response = await this.DataLoadManagementApi.getTypesLocation();

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
    async getCategories(
        locale: string,
        typeEstablishmentId: string | null
    ): Promise<ICategoryFront[] | null> {
        const response =
            await this.DataLoadManagementApi.getCategoriesOfEstablishments(
                locale,
                typeEstablishmentId
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
    async getBusinessLegalTypes(
        lang: string
    ): Promise<IBusinessLegalTypesFront[] | null> {
        const response =
            await this.DataLoadManagementApi.getBusinessLegalTypes();
        if (!response) {
            return null;
        }
        const mappedData = response.map((item) =>
            this.DataLoadManagementMapper.businessLegalTypesToFront(item, lang)
        );

        return mappedData;
    }
    async getFavoriteTypes(): Promise<IFavoriteTypeEntity[] | null> {
        const response = await this.DataLoadManagementApi.getFavoriteTypes();

        return response;
    }
    
}
