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

export class SearchMapper {
    private tagsMapper: TagsMapper;

    constructor() {
        this.tagsMapper = new TagsMapper();
    }

    mapSearchQuery(
        responseBack: ISearchQueryResponse,
        indexKey: TTypesOfSearchKey,
        cdnHost: string
    ): ISearchQueryResponseFront {
        const mapperItems: ISearchItemFront[] = [];
        const indexKeyUpperCase = indexKey.toUpperCase();
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
            if (responseBack.hits.location) {
                responseBack.hits.location.forEach((item) => {
                    mapperItems.push(
                        this.createSearchItem(item, "location", cdnHost)
                    );
                });
            }

            if (responseBack.hits.object) {
                responseBack.hits.object.forEach((item) => {
                    mapperItems.push(
                        this.createSearchItem(item, "establishment", cdnHost)
                    );
                });
            }

            if (responseBack.hits.article) {
                responseBack.hits.article.forEach((item) => {
                    mapperItems.push(
                        this.createSearchItem(item, "article", cdnHost)
                    );
                });
            }
        }

        const mapperResponse: ISearchQueryResponseFront = {
            searchItems: mapperItems,
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
                  value: itemBack.priceCategory,
                  count: this.tagsMapper.createClassCount(
                      itemBack.priceCategory,
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
            globalTypeEntity: globalTypeEntity as any, // Cast to TGlobalTypes
        };
    }
}
