import { IRoleOwnerEntity } from "@/lib/models/api/entities/dataLoadManagement/roleOwner.entity";
import apiClient from "../ApiClient";
import { ITypeOfEstablishment } from "@/lib/models/api/entities/typeOfEstablishment.entity";
import { ICategoryOfEstablishmentEntity, ITagEntity } from "@/lib/models";

export default class DataLoadManagementApi {
    constructor() {}
    async getRolesOwner(): Promise<IRoleOwnerEntity[] | null> {
        try {
            const response = await apiClient.get(`/roles`);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении справочника ролей`);
            return null;
        }
    }
    async getTypesOfEstablishment(): Promise<ITypeOfEstablishment[] | null> {
        try {
            const response = await apiClient.get(
                `/types-of-establishment/get-all`
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении справочника типов заведений`);
            return null;
        }
    }
    async getTagsBlockOfEstablishments(
        locale: string
    ): Promise<ITagEntity[] | null> {
        try {
            const response = await apiClient.get(`/tags?${locale}`);

            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении справочника типов заведений`);
            return null;
        }
    }
    async getCategoriesOfEstablishments(
        locale: string
    ): Promise<ICategoryOfEstablishmentEntity[] | null> {
        try {
            const response = await apiClient.post(
                `/category-of-establishment/get-all`,
                { lang: locale }
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении справочника типов заведений`);
            return null;
        }
    }
    async getBlobProxy(): Promise<{ url: string } | null> {
        try {
            const response = await apiClient.get(`/blob-proxy/resolve`);
            return response.data;
        } catch (error) {
            console.error(
                `Ошибка при запросе по получению blob-proxy для картинок.`
            );
            return null;
        }
    }
}
