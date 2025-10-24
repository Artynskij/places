import {
    IArticleStatusEntity,
    IBusinessLegalTypesEntity,
    ICategoryEstablishmentEntity,
    IFavoriteTypeEntity,
    IGenderWithContentEntity,
    IRoleOwnerWithContentEntity,
    ITagWithContentPareEntity,
    ITypeEstablishmentWithContentEntity,
} from "@/lib/models";

import { ILocationTypeWithContentEntity } from "@/lib/models/server/entities/location-type.entity";
import apiClient from "../base/ApiClient";

export default class DataLoadManagementApi {
    constructor() {}
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
    async getRolesOwner(): Promise<IRoleOwnerWithContentEntity[] | null> {
        try {
            const response = await apiClient.get(`/roles`);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении справочника ролей`);
            return null;
        }
    }
    async getGenders(
        locale: string
    ): Promise<IGenderWithContentEntity[] | null> {
        try {
            const response = await apiClient.post(`/gender/get-all`, {
                lang: locale,
            });
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении справочника полов`);
            return null;
        }
    }
    async getTypesOfEstablishment(): Promise<
        ITypeEstablishmentWithContentEntity[] | null
    > {
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
    async getTypesLocation(): Promise<ILocationTypeWithContentEntity[] | null> {
        try {
            const response = await apiClient.post(`/types-of-location/get-all`);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении справочника типов локаций`);
            return null;
        }
    }
    async getTagsBlockOfEstablishments(
        locale: string
    ): Promise<ITagWithContentPareEntity[] | null> {
        try {
            const response = await apiClient.get(`/tags?${locale}`);

            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении справочника типов заведений`);
            return null;
        }
    }
    async getCategoriesOfEstablishments(
        locale: string,
        typeEstablishmentId: string | null
    ): Promise<ICategoryEstablishmentEntity[] | null> {
        try {
            const response = await apiClient.post(
                `/category-of-establishment/get-all`,
                { lang: locale, typeId: typeEstablishmentId }
            );
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении справочника типов заведений`);
            return null;
        }
    }

    async getBusinessLegalTypes(): Promise<IBusinessLegalTypesEntity[] | null> {
        try {
            const response = await apiClient.get(`/legal-types`);
            return response.data;
        } catch (error) {
            console.error(
                `Ошибка при запросе по получению BusinessLegalTypes.`
            );
            return null;
        }
    }
    async getFavoriteTypes(): Promise<IFavoriteTypeEntity[] | null> {
        try {
            const response = await apiClient.get(`/favorite-item-types`);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при запросе по получению FavoriteTypes.`);
            return null;
        }
    }
    async getArticleStatus(): Promise<IArticleStatusEntity[] | null> {
        try {
            const response = await apiClient.get(`/articles-status`);
            return response.data;
        } catch (error) {
            console.error(`Ошибка при получении ArticleStatus.`);
            return null;
        }
    }
}
