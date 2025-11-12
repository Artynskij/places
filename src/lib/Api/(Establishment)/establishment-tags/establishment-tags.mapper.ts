import { CONSTANT_CATEGORY_CLASS_TAG_DB } from "@/asset/constants/database/category-class-tag.const";
import { CONSTANT_SEARCH_PARAMS } from "@/asset/constants/search-params.const";
import { extractActuallyTitleServer } from "@/lib/helpers/extract-title-server";
import { ITagBlockFront, ITagWithEstablishmentFront } from "@/lib/models";

import {
    ITagsOfEstablishmentFilterResponse,
    ITagsOfEstablishmentResponse,
} from "@/lib/models/server/response";

export default class EstablishmentTagsMapper {
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
                              establishmentTypeId: "",
                          },
                          tags: groupTag.Tags.map((tag) => {
                              const countPrice =
                                  groupTag.TagCategory.Name ===
                                      CONSTANT_CATEGORY_CLASS_TAG_DB.price &&
                                  tag.content.details[0]?.secondaryValue
                                      ? this.createClassCount(
                                            tag.content.details[0]
                                                ?.secondaryValue,
                                            "price"
                                        )
                                      : null;
                              const countStar =
                                  groupTag.TagCategory.Name ===
                                  CONSTANT_CATEGORY_CLASS_TAG_DB.star
                                      ? this.createClassCount(
                                            tag.content.details[0]?.value ||
                                                "undefined",
                                            "star"
                                        )
                                      : null;
                              return {
                                  id: tag.Id,
                                  key: `${CONSTANT_SEARCH_PARAMS.filterParam.tag}${tag.Id}`,
                                  value:
                                      tag.content.details[0]?.value ||
                                      "UNDEFINED",
                                  secondaryValue:
                                      tag.content.details[0]?.secondaryValue ||
                                      null,
                                  tagCategory: {
                                      id: tag.TagCategory?.Id || "",
                                      key: tag.TagCategory?.Name || "",
                                      value: tag.TagCategory
                                          ? extractActuallyTitleServer(
                                                tag.TagCategory?.content.details
                                            )
                                          : "",
                                  },
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
                                  if (!a.value || !b.value) {
                                      return 0;
                                  }

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
                      establishmentTypeId: "",
                  },
                  tags: tags.categories
                      .map((cat) => {
                          return {
                              id: cat.Id,
                              key: `${CONSTANT_SEARCH_PARAMS.filterParam.category}${cat.Id}`,
                              value: cat.content.details[0]?.value,
                              tagCategory: {
                                  id: "1234",
                                  key: "categories",
                                  value: "категории",
                              },
                              secondaryValue:
                                  cat.content.details[0]?.secondaryValue ||
                                  null,
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
                          if (!a.value || !b.value) {
                              return 0;
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
                const countPrice =
                    tag.Tag.TagCategory?.Name ===
                        CONSTANT_CATEGORY_CLASS_TAG_DB.price &&
                    tag.Tag.content.details[0]?.secondaryValue
                        ? this.createClassCount(
                              tag.Tag.content.details[0].secondaryValue,
                              "price"
                          )
                        : null;
                const countStar =
                    tag.Tag.TagCategory?.Name ===
                    CONSTANT_CATEGORY_CLASS_TAG_DB.star
                        ? this.createClassCount(
                              tag.Tag.content.details[0].value || "UNDEFINED",
                              "star"
                          )
                        : null;
                return {
                    establishmentId: tag.Establishment.Id,
                    tag: {
                        id: tag.Tag.Id,
                        key: tag.Tag.Id,
                        value: tag.Tag.content.details[0]?.value,
                        tagCategory: {
                            id: tag.Tag.TagCategory?.Id || "",
                            key: tag.Tag.TagCategory?.Name || "",
                            value: tag.Tag.TagCategory
                                ? extractActuallyTitleServer(
                                      tag.Tag.TagCategory.content.details
                                  )
                                : "",
                        },
                        secondaryValue:
                            tag.Tag.content.details[0]?.secondaryValue || null,
                        iconName: tag.Tag.content.details[0]?.cIcon || null,
                        count: countStar || countPrice || null,
                    },
                    tagCategory: {
                        id: tag.Tag.TagCategory?.Id || "",
                        value: tag.Tag.TagCategory
                            ? extractActuallyTitleServer(
                                  tag.Tag.TagCategory.content.details
                              ) || tag.Tag.TagCategory.Name
                            : "",
                        key: tag.Tag.TagCategory?.Name || "",
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
}
