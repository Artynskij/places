import { CONSTANT_CATEGORY_CLASS_TAG } from "@/asset/constants/categoryClassTag";
import { CONSTANT_SEARCH_PARAMS } from "@/asset/constants/SearchParamsConst";
import { ITagBlockFront, ITagWithEstablishmentFront } from "@/lib/models";

import {
    ITagsOfEstablishmentFilterResponse,
    ITagsOfEstablishmentResponse,
} from "@/lib/models/server/response";

export default class TagsMapper {
    constructor() {}
    tagBlock(
        tags: ITagsOfEstablishmentFilterResponse | null,
        checkedValues: string[] | null
    ): ITagBlockFront[] | null {
        const mappingTags: ITagBlockFront[] | null = tags
            ? tags.tagsAndCategories
                  .map((groupTag) => {
                      return {
                          groupKey: {
                              id: groupTag.TagCategory.Id,
                              value:
                                  groupTag.TagCategory.content.details[0]
                                      ?.value || groupTag.TagCategory.Name,
                              key: groupTag.TagCategory.Name,
                          },
                          tags: groupTag.Tags.map((tag) => {
                              const countPrice =
                                  groupTag.TagCategory.Name ===
                                      CONSTANT_CATEGORY_CLASS_TAG.price &&
                                  tag.content.details[0]?.secondaryValue
                                      ? this.createClassCount(
                                            tag.content.details[0]
                                                ?.secondaryValue,
                                            "price"
                                        )
                                      : null;
                              const countStar =
                                  groupTag.TagCategory.Name ===
                                  CONSTANT_CATEGORY_CLASS_TAG.star
                                      ? this.createClassCount(
                                            tag.content.details[0]?.value,
                                            "star"
                                        )
                                      : null;
                              return {
                                  id: tag.Id,
                                  key: `${CONSTANT_SEARCH_PARAMS.filterParam.tag}${tag.Id}`,
                                  value: tag.content.details[0]?.value,
                                  secondaryValue:
                                      tag.content.details[0]?.secondaryValue ||
                                      null,
                                  iconName:
                                      tag.content.details[0]?.cIcon || null,
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

        const mappingCategories: ITagBlockFront | null = tags
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
                              key: `${CONSTANT_SEARCH_PARAMS.filterParam.category}${cat.Id}`,
                              value: cat.content.details[0]?.value,
                              secondaryValue:
                                  cat.content.details[0]?.secondaryValue || null,
                              iconName: cat.content.details[0]?.cIcon || null,
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
                          return a.value?.localeCompare(b.value);
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
                        CONSTANT_CATEGORY_CLASS_TAG.price &&
                    tag.Tag.content.details[0]?.secondaryValue
                        ? this.createClassCount(
                              tag.Tag.content.details[0].secondaryValue,
                              "price"
                          )
                        : null;
                const countStar =
                    tag.Tag.TagCategory.Name ===
                    CONSTANT_CATEGORY_CLASS_TAG.star
                        ? this.createClassCount(
                              tag.Tag.content.details[0].value,
                              "star"
                          )
                        : null;
                return {
                    establishmentId: tag.Establishment.Id,
                    tag: {
                        id: tag.Tag.Id,
                        key: tag.Tag.Id,
                        value: tag.Tag.content.details[0]?.value,
                        secondaryValue:
                            tag.Tag.content.details[0]?.secondaryValue || null,
                        iconName: tag.Tag.content.details[0]?.cIcon || null,
                        count: countStar || countPrice || null,
                    },
                    categoryTag: {
                        id: tag.Tag.TagCategory.Id,
                        value:
                            tag.Tag.TagCategory.content.details[0]?.value ||
                            tag.Tag.TagCategory.Name,
                        key: tag.Tag.TagCategory.Name,
                    },
                };
            }) || null;
        return mappingData;
    }
    createClassCount(tagClass: string, type: "star" | "price"): number {
        if (type === "star") {
            const starEntity = tagClass;
            const count = +starEntity?.split(" ")[0].replace(",", ".");

            return count;
        } else if (type === "price") {
            const priceEntity = tagClass;
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
    // separationClassTag(tags: ITagBlockFront[]): ITagBlockFront | null {
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
