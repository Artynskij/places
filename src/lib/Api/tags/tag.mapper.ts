import { ITagClassWithEstablishmentFront, ITagsBlockFront } from "@/lib/models";
import { ILocationsEntity } from "@/lib/models/api/entities/locations.entity";
import {
    ITagsOfEstablishmentFilterResponse,
    ITagsOfEstablishmentResponse,
} from "@/lib/models/api/response";
import { ILocationFront } from "@/lib/models/frontend/location/location.front";
import { ITagWithEstablishmentFront } from "@/lib/models/frontend/tags/tagWithEstablishment.front";

export default class TagsMapper {
    constructor() {}
    transformToFront(
        tags: ITagsOfEstablishmentFilterResponse | null
    ): ITagsBlockFront[] | null {
        const mappingTags: ITagsBlockFront[] | null =
            tags?.tagsAndCategories.map((groupTag) => {
                return {
                    groupKey: {
                        id: groupTag.TagCategory.Id,
                        value:
                            groupTag.TagCategory.Name ||
                            groupTag.TagCategory.Content.details[0].value,
                        key: groupTag.TagCategory.Name,
                    },
                    tags: groupTag.Tags.map((tag) => {
                        return {
                            id: tag.Id,
                            key: `t${tag.Id}`,
                            value: tag.Content.details[0].value,
                        };
                    }),
                };
            }) || null;
        const mappingCategories: ITagsBlockFront | null = tags
            ? {
                  groupKey: {
                      id: "123",
                      key: "categories",
                      value: "Категории",
                  },
                  tags: tags?.categories.map((cat) => {
                      return {
                          id: cat.Id,
                          key: `c${cat.Id}`,
                          value: cat.Content.details[0].value,
                      };
                  }),
              }
            : null;
        if (mappingCategories && mappingTags) {
            mappingTags?.unshift(mappingCategories);
        }

        return mappingTags || null;
    }
    transformTagWithEstablishment(
        tags: ITagsOfEstablishmentResponse[] | null
    ): ITagWithEstablishmentFront[] | null {
        const mappingData: ITagWithEstablishmentFront[] | null =
            tags?.map((tag) => {
                return {
                    establishmentId: tag.Establishment.Id,
                    tag: {
                        id: tag.Tag.Id,
                        key: tag.Tag.Id,
                        value: tag.Tag.Content.details[0].value,
                    },
                    categoryTag: {
                        id: tag.Tag.TagCategory.Id,
                        value:
                            tag.Tag.TagCategory.Content.details[0].value ||
                            tag.Tag.TagCategory.Name,
                        key: tag.Tag.TagCategory.Name,
                    },
                };
            }) || null;
        return mappingData;
    }
    // TODO: add priceRating with establishment EATER
    transformClassTag(
        tags: ITagsOfEstablishmentResponse[] | null
    ): ITagClassWithEstablishmentFront[] | null {
        const mappingData = this.transformTagWithEstablishment(tags)?.filter(
            (tag) => tag.categoryTag.key === "starRating"
        );
        if (!mappingData) return null;

        const mappingDataWithCount: ITagClassWithEstablishmentFront[] =
            mappingData.map((tag) => {
                const count = +(tag.tag.value
                    .split(" ")[0]
                    .replace(",", ".") as string);
                return {
                    categoryTag: tag.categoryTag,
                    establishmentId: tag.establishmentId,
                    tag: {
                        ...tag.tag,
                        count,
                    },
                };
            });
        return mappingDataWithCount;
    }
}
