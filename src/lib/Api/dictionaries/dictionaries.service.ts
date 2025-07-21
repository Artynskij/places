import { IRoleOwnerEntity } from "@/lib/models/api/entities/dictionaries/roleOwner.entity";
import DictionariesApi from "./dictionaries.endpoints";
import { ITypeOfEstablishment } from "@/lib/models/api/entities/typeOfEstablishment.entity";
import { ICategoryFront, ITagBlockFront } from "@/lib/models";
import { DictionariesMapper } from "./dictionaries.mapper";

export class DictionariesService {
    private DictionariesApi: DictionariesApi;
    private DictionariesMapper: DictionariesMapper;

    constructor() {
        this.DictionariesApi = new DictionariesApi();
        this.DictionariesMapper = new DictionariesMapper();
    }

    async getRolesOwner(): Promise<IRoleOwnerEntity[] | null> {
        const response = await this.DictionariesApi.getRolesOwner();

        return response;
    }
    async getTypesOfEstablishment(): Promise<ITypeOfEstablishment[] | null> {
        const response = await this.DictionariesApi.getTypesOfEstablishment();

        return response;
    }
    async getBlockTags(locale: string): Promise<ITagBlockFront[] | null> {
        const response =
            await this.DictionariesApi.getTagsBlockOfEstablishments(locale);
        if (!response) {
            return null;
        }
        const mappedData = this.DictionariesMapper.tagsBlockMapper(response);

        return mappedData;
    }
    async getCategories(locale: string): Promise<ICategoryFront[] | null> {
        const response =
            await this.DictionariesApi.getCategoriesOfEstablishments(locale);
        if (!response) {
            return null;
        }
        const mappedData =
            this.DictionariesMapper.categoriesOfEstablishment(response);
        return mappedData;
    }
    async getBlobProxy(): Promise<{ url: string } | null> {
        const response = this.DictionariesApi.getBlobProxy();
        return response;
    }
}
