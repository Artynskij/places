import { CONSTANT_CATEGORY_CLASS_TAG } from "@/asset/constants/categoryClassTag";
import {
    // ITagClassFront,
    // ITagWithEstablishmentFront,
    ITagEntity,
    ITagFront,
    ITagsBlockFront,
} from "@/lib/models";
import { ILocationsEntity } from "@/lib/models/api/entities/locations.entity";
import {
    ITagsOfEstablishmentFilterResponse,
    ITagsOfEstablishmentResponse,
} from "@/lib/models/api/response";
import { ILocationFront } from "@/lib/models/frontend/location/location.front";
import { ITagWithEstablishmentFront } from "@/lib/models/frontend/tags/tagWithEstablishment.front";

export default class TagsMapper {
    constructor() {}
    tagBlock(
        tags: ITagsOfEstablishmentFilterResponse | null,
        checkedValues: string[] | null
    ): ITagsBlockFront[] | null {
        const mappingTags: ITagsBlockFront[] | null = tags
            ? tags.tagsAndCategories
                  .map((groupTag) => {
                      return {
                          groupKey: {
                              id: groupTag.TagCategory.Id,
                              value:
                                  groupTag.TagCategory.Content.details[0]
                                      .value || groupTag.TagCategory.Name,
                              key: groupTag.TagCategory.Name,
                          },
                          tags: groupTag.Tags.map((tag) => {
                              const countPrice =
                                  groupTag.TagCategory.Name ===
                                  CONSTANT_CATEGORY_CLASS_TAG.price
                                      ? this.createClassCount(tag, "price")
                                      : null;
                              const countStar =
                                  groupTag.TagCategory.Name ===
                                  CONSTANT_CATEGORY_CLASS_TAG.star
                                      ? this.createClassCount(tag, "star")
                                      : null;
                              return {
                                  id: tag.Id,
                                  key: `t${tag.Id}`,
                                  value: tag.Content.details[0].value,
                                  secondaryValue:
                                      tag.Content.details[0].secondaryValue ||
                                      null,
                                  iconName:
                                      tag.Content.details[0].cIcon || null,
                                  count: countStar || countPrice || null,
                              };
                          })
                              .filter((item) => item.value)
                              .sort((a, b) => {
                                  const aChecked =
                                      checkedValues?.includes(a.key) ?? false;
                                  const bChecked =
                                      checkedValues?.includes(b.key) ?? false;

                                  // 1. Сначала выбранные элементы
                                  if (aChecked !== bChecked) {
                                      return aChecked ? -1 : 1;
                                  }

                                  // Если оба выбранные или невыбранные - сортируем по алфавиту
                                  return a.value.localeCompare(b.value);
                              }),
                      };
                  })
                  .sort((a, b) =>
                      a.groupKey.value.localeCompare(b.groupKey.value)
                  )
            : null;

        const mappingCategories: ITagsBlockFront | null = tags
            ? {
                  groupKey: {
                      id: "123",
                      key: "categories",
                      value: "Категории",
                  },
                  tags: tags.categories
                      .map((cat) => {
                          return {
                              id: cat.Id,
                              key: `c${cat.Id}`,
                              value: cat.Content.details[0].value,
                              secondaryValue:
                                  cat.Content.details[0].secondaryValue || null,
                              iconName: cat.Content.details[0].cIcon || null,
                          };
                      })
                      .sort((a, b) => {
                          const aChecked =
                              checkedValues?.includes(a.key) ?? false;
                          const bChecked =
                              checkedValues?.includes(b.key) ?? false;

                          // 1. Сначала выбранные элементы
                          if (aChecked !== bChecked) {
                              return aChecked ? -1 : 1;
                          }

                          // Если оба выбранные или невыбранные - сортируем по алфавиту
                          return a.value.localeCompare(b.value);
                      }),
              }
            : null;
        if (mappingCategories && mappingTags) {
            mappingTags?.unshift(mappingCategories);
        }

        return mappingTags || null;
    }
    tagWithEstablishment(
        tags: ITagsOfEstablishmentResponse[] | null
    ): ITagWithEstablishmentFront[] | null {
        const mappingData: ITagWithEstablishmentFront[] | null =
            tags?.map((tag) => {
                // if(tag.Tag.TagCategory.Name === CATEGORY_CLASS_TAG.star) re
                const countPrice =
                    tag.Tag.TagCategory.Name ===
                    CONSTANT_CATEGORY_CLASS_TAG.price
                        ? this.createClassCount(tag.Tag, "price")
                        : null;
                const countStar =
                    tag.Tag.TagCategory.Name ===
                    CONSTANT_CATEGORY_CLASS_TAG.star
                        ? this.createClassCount(tag.Tag, "star")
                        : null;
                return {
                    establishmentId: tag.Establishment.Id,
                    tag: {
                        id: tag.Tag.Id,
                        key: tag.Tag.Id,
                        value: tag.Tag.Content.details[0].value,
                        secondaryValue:
                            tag.Tag.Content.details[0].secondaryValue || null,
                        iconName: tag.Tag.Content.details[0].cIcon || null,
                        count: countStar || countPrice || null,
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
    private createClassCount(
        tagClass: ITagEntity,
        type: "star" | "price"
    ): number {
        if (type === "star") {
            const starEntity = tagClass.Content.details[0].value;
            const count = +starEntity?.split(" ")[0].replace(",", ".");

            return count;
        } else if (type === "price") {
            const priceEntity = tagClass.Content.details[0].secondaryValue;
            const count =
                priceEntity === "$"
                    ? 1
                    : priceEntity === "$$-$$$"
                    ? 2
                    : priceEntity === "$$$$"
                    ? 3
                    : 0;
            return count;
        } else {
            return 0;
        }
    }
    // TODO: add priceRating with establishment EATER
    // transformClassTags(
    //     tags: ITagsOfEstablishmentResponse[] | null
    // ): ITagWithEstablishmentFront[] | null {
    //     const mappingData = this.tagWithEstablishment(tags)?.filter(
    //         (tag) => tag.categoryTag.key === "starRating"
    //     );
    //     if (!mappingData) return null;

    //     const mappingDataWithCount: ITagWithEstablishmentFront[] =
    //         mappingData.map((tag) => {
    //             const count = +(tag.tag.value
    //                 .split(" ")[0]
    //                 .replace(",", ".") as string);
    //             return {
    //                 categoryTag: tag.categoryTag,
    //                 establishmentId: tag.establishmentId,
    //                 tag: {
    //                     ...tag.tag,
    //                     count,
    //                 },
    //             };
    //         });
    //     return mappingDataWithCount;
    // }
    // separationClassTag(tags: ITagsBlockFront[]): ITagsBlockFront | null {
    //     const _indexClassTag =
    //         tags.indexOf(
    //             tags.filter((item) => item.groupKey.key === "starRating")[0]
    //         ) || -1;
    //     const classTag =
    //         _indexClassTag > 0 ? tags.splice(_indexClassTag, 1)[0] : null;
    //     const modifyClassTag = classTag
    //         ? {
    //               ...classTag,
    //               count: +classTag?.tags[0]?.value
    //                   ?.split(" ")[0]
    //                   .replace(",", "."),
    //           }
    //         : null;
    //     return modifyClassTag;
    // }
}
