import {
    ICategoryFront,
    IMapItemEntity,
    IMapItemFront,
    IMapItemsSortedResponse,
    IScheduleFront,
} from "@/lib/models";

import TagsMapper from "../(Establishment)/tags/tag.mapper";
import { ScheduleMapper } from "../(Establishment)/schedule.api";
// import { ScheduleMapper } from "../(Establishment)/schedule/schedule.mapper";

export class MapMapper {
    private tagsMapper: TagsMapper;
    private scheduleMapper: ScheduleMapper;
    constructor() {
        this.tagsMapper = new TagsMapper();
        this.scheduleMapper = new ScheduleMapper();
    }

    mappingMapQuery(
        mapItems: IMapItemEntity[],
        cdnHost: string
    ): IMapItemFront[] {
        const mapperItems: IMapItemFront[] = [];

        mapItems.forEach((searchItemBack, index) => {
            const newSearchItem = this.createMapItem(searchItemBack, cdnHost);

            if (newSearchItem.title) {
                mapperItems.push(newSearchItem);
            }
        });

        return mapperItems;
    }

    private createMapItem(
        itemBack: IMapItemEntity,

        cdnHost: string
    ): IMapItemFront {
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
            ? itemBack.schedule.map((item) => this.scheduleMapper.toFront(item))
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
                ? { mainImage: `${cdnHost}${itemBack.image}` }
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
            globalTypeEntity: itemBack.type, // Cast to TGlobalTypes
        };
    }
    sortEstablishment(
        establishmentMap: IMapItemFront[]
    ): IMapItemsSortedResponse {
        const accommodationEst = establishmentMap.filter(
            (est) => est.typeEstablishment?.key === "ACCOMMODATION"
        );
        const attractionEst = establishmentMap.filter(
            (est) => est.typeEstablishment?.key === "ATTRACTION"
        );
        const eaterEst = establishmentMap.filter(
            (est) => est.typeEstablishment?.key === "EATER"
        );
        return {
            accommodation: accommodationEst || [],
            attraction: attractionEst || [],
            eater: eaterEst || [],
        };
    }
}
