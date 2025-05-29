import {
    ICategoryFront,
    IScheduleFront,
    ISearchItemEntity,
    ISearchItemFront,
} from "@/lib/models";
import { ISearchQueryResponse } from "@/lib/models/api/response/search/ISearch.response";
import {
    TGlobalTypes,
    TTypesOfSearchKey,
} from "@/lib/models/common/TTypesGlobal";
import { ISearchQueryResponseFront } from "@/lib/models/frontend/search/searchQueryResponse.front";
import TagsMapper from "../tags/tag.mapper";
import { ISearchQueryRequest } from "@/lib/models/api/request/search/ISearchQuery.request";

export class SearchMapper {
    private tagsMapper: TagsMapper;

    constructor() {
        this.tagsMapper = new TagsMapper();
    }

    mapSearchQuery(
        responseBack: ISearchQueryResponse,
        body: ISearchQueryRequest,
        cdnHost: string
    ): ISearchQueryResponseFront {
        const mapperItems: ISearchItemFront[] = [];
        const indexKeyUpperCase = body.indexKey.toUpperCase();
        const inputValue = body.term;
        if (Array.isArray(responseBack.hits)) {
            responseBack.hits.forEach((searchItemBack, index) => {
                const globalTypeItem: TGlobalTypes =
                    indexKeyUpperCase === "TO_EAT" ||
                    indexKeyUpperCase === "TO_SLEEP" ||
                    indexKeyUpperCase === "TO_VISIT"
                        ? "establishment"
                        : indexKeyUpperCase === "TO_GO"
                        ? "location"
                        : "article";
                mapperItems.push(
                    this.createSearchItem(
                        searchItemBack,
                        globalTypeItem,
                        cdnHost
                    )
                );
            });
        } else {
            if (responseBack.hits.locations) {
                responseBack.hits.locations.forEach((item) => {
                    mapperItems.push(
                        this.createSearchItem(item, "location", cdnHost)
                    );
                });
            }

            if (responseBack.hits.establishments) {
                responseBack.hits.establishments.forEach((item) => {
                    mapperItems.push(
                        this.createSearchItem(item, "establishment", cdnHost)
                    );
                });
            }

            if (responseBack.hits.articles) {
                responseBack.hits.articles.forEach((item) => {
                    mapperItems.push(
                        this.createSearchItem(item, "article", cdnHost)
                    );
                });
            }
        }
        const sortedMapperItems = [...mapperItems].sort((a, b) => {
            const isATitleMatch =
                a.title.toLowerCase() === inputValue.toLowerCase();
            const isBTitleMatch =
                b.title.toLowerCase() === inputValue.toLowerCase();

            // Если оба title совпадают с inputValue
            if (isATitleMatch && isBTitleMatch) {
                // Среди них location должен быть выше
                if (
                    a.globalTypeEntity === "location" &&
                    b.globalTypeEntity !== "location"
                )
                    return -1;
                if (
                    b.globalTypeEntity === "location" &&
                    a.globalTypeEntity !== "location"
                )
                    return 1;
                // Если оба location или оба не location — сохраняем порядок
                return 0;
            }

            // Если только один из title совпадает — он идет выше
            if (isATitleMatch) return -1;
            if (isBTitleMatch) return 1;

            // Если ни один title не совпадает — location идет выше
            if (
                a.globalTypeEntity === "location" &&
                b.globalTypeEntity !== "location"
            )
                return -1;
            if (
                b.globalTypeEntity === "location" &&
                a.globalTypeEntity !== "location"
            )
                return 1;

            // В остальных случаях порядок не меняем
            return 0;
        });
        const mapperResponse: ISearchQueryResponseFront = {
            searchItems: sortedMapperItems,
            info: {
                usedLangs: responseBack._meta.usedLangs || null,
                mode: responseBack._meta.mode || null,
                found: {
                    article: responseBack._meta.found?.article || 0,
                    location: responseBack._meta.found?.location || 0,
                    establishment: responseBack._meta.found?.object || 0,
                },
                proportions: {
                    total: responseBack.total,
                    article: responseBack._meta.proportions?.article || 0,
                    location: responseBack._meta.proportions?.location || 0,
                    establishment: responseBack._meta.proportions?.object || 0,
                },
            },
        };

        return mapperResponse;
    }

    private createSearchItem(
        itemBack: ISearchItemEntity,
        globalTypeEntity: TGlobalTypes,
        cdnHost: string
    ): ISearchItemFront {
        const locationPart = {
            lat: itemBack.location?.lat || null,
            lon: itemBack.location?.lon || null,
            country:
                itemBack.countryName && itemBack.countryId
                    ? {
                          id: itemBack.countryId,
                          title: itemBack.countryName,
                      }
                    : null,
            town:
                itemBack.locationName && itemBack.locationId
                    ? {
                          id: itemBack.locationId,
                          title: itemBack.locationName,
                      }
                    : null,
        };

        const categoriesPart: ICategoryFront[] | [] =
            itemBack.categories.map((cat) => {
                return { id: cat.id, key: "", value: cat.name };
            }) || [];
        const schedulePart: IScheduleFront[] | null = itemBack.schedule
            ? itemBack.schedule?.map((scheduleItem) => {
                  return {
                      day: scheduleItem.Day,
                      openTime: scheduleItem.OpenTime,
                      closeTime: scheduleItem.CloseTime,
                  };
              })
            : null;
        const starRatingPart = itemBack.starRating
            ? {
                  key: "",
                  value: itemBack.starRating,
                  count: this.tagsMapper.createClassCount(
                      itemBack.starRating,
                      "star"
                  ),
              }
            : null;
        const priceCategoryPart = itemBack.priceCategory
            ? {
                  key: "",
                  value: itemBack.priceCategory.name,
                  count: this.tagsMapper.createClassCount(
                      itemBack.priceCategory.secondary,
                      "price"
                  ),
              }
            : null;
        return {
            id: itemBack.dbCrossId,
            title: itemBack.title,
            description: itemBack.description,
            media: itemBack.image
                ? { mainImage: itemBack.image, cdnHost: cdnHost }
                : null, // You might want to map this from item if available
            lang: itemBack.lang,
            location: locationPart,
            typeId: itemBack.typeId || null,
            typeName: itemBack.typeName || null,
            categories: categoriesPart,
            starRating: starRatingPart,
            priceCategory: priceCategoryPart,
            rate: itemBack.rate || null,
            schedule: schedulePart,
            typeEstablishment:
                itemBack.typeId && itemBack.typeName
                    ? {
                          id: itemBack.typeId,
                          key: itemBack.typeName,
                      }
                    : null,
            globalTypeEntity: itemBack.type || globalTypeEntity, // Cast to TGlobalTypes
        };
    }
}
