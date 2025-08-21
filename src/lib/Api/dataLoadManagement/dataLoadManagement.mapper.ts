import {
    ITagEntity,
    ITagBlockFront,
    ICategoryFront,
    ICategoryEstablishmentEntity,
    IRoleOwnerWithContentEntity,
    IBusinessLegalTypesEntity,
    IBusinessLegalTypesFront,
} from "@/lib/models";
import { IRoleOwnerFront } from "@/lib/models/frontend/(person)/roleOwner.front";
import { useTranslations } from "next-intl";

export class DataLoadManagementMapper {
    constructor() {}
    tagsBlockMapper(tags: ITagEntity[]): ITagBlockFront[] {
        const grouped = tags.reduce<Record<string, ITagBlockFront>>(
            (acc, tag) => {
                const detail = tag.content.details[0];
                const tagCategory = tag.tag.TagCategory;
                const groupKey = tagCategory.Name || "unknown type";

                if (!acc[groupKey]) {
                    acc[groupKey] = {
                        groupKey: {
                            id: tagCategory.Id,
                            key: groupKey,
                            value: groupKey,
                        },
                        tags: [],
                    };
                }

                acc[groupKey].tags.push({
                    id: tag.tag.Id,
                    key: groupKey,
                    value: detail.value || "",
                    secondaryValue: detail.secondaryValue || null,
                    iconName: detail.cIcon || null,
                });

                return acc;
            },
            {}
        );

        let result = Object.values(grouped);

        // 🔠 Сортировка тегов внутри групп по алфавиту
        result.forEach((group) => {
            group.tags.sort((a, b) => a.value.localeCompare(b.value));
        });

        // Объединяем группы, в которых только по 1 тегу — в одну
        const singleGroups = result.filter((g) => g.tags.length === 1);
        const multiGroups = result.filter((g) => g.tags.length > 1);

        if (singleGroups.length) {
            const combinedGroup: ITagBlockFront = {
                groupKey: {
                    id: "",
                    key: "other",
                    value: "",
                },
                tags: singleGroups
                    .flatMap((g) => g.tags)
                    .sort((a, b) => a.value.localeCompare(b.value)), // сортируем и их
            };

            result = [...multiGroups, combinedGroup];
        }

        // 🔠 Сортировка самих групп по key
        return result.sort((a, b) =>
            a.groupKey.key.localeCompare(b.groupKey.key)
        );
    }
    categoriesOfEstablishment(
        categories: ICategoryEstablishmentEntity[]
    ): ICategoryFront[] {
        const mappedData: ICategoryFront[] = categories
            .map((categoryServer) => {
                return {
                    id: categoryServer.category.Id,
                    key: categoryServer.category.Name,
                    value: categoryServer.content?.details[0].value || "",
                };
            })
            .sort((a, b) => a.value.localeCompare(b.value));
        return mappedData;
    }
    roleToFront(roleEntity: IRoleOwnerWithContentEntity): IRoleOwnerFront {
        return {
            id: roleEntity.entity.Id,
            code: roleEntity.entity.Code,
            key: roleEntity.entity.Name,
            title: roleEntity.entity.Code,
        };
    }
    businessLegalTypesToFront(
        legalTypesEntity: IBusinessLegalTypesEntity,
        lang: string
    ): IBusinessLegalTypesFront {
        return {
            id: legalTypesEntity.Id,
            code: legalTypesEntity.Code,
            title:
                legalTypesEntity.content.details.find(
                    (item) => item.lang === lang
                )?.value || legalTypesEntity.content.details[0].value,
        };
    }
}
