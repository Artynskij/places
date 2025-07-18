import { ICategoryOfEstablishmentEntity } from "./../../models/api/entities/categoryOfEstablishment.entity";
import {
    ITagEntity,
    ITagBlockFront,
    ITagWithCategoryEntity,
    ICategoryFront,
} from "@/lib/models";

export class DictionariesMapper {
    constructor() {}
    tagsBlockMapper(tags: ITagEntity[]): ITagBlockFront[] {
        const grouped = tags.reduce<Record<string, ITagBlockFront>>(
            (acc, tag) => {
                const detail = tag.content.details[0];
                const groupKey = detail.cName || "unknown type";

                if (!acc[groupKey]) {
                    acc[groupKey] = {
                        groupKey: {
                            id: "",
                            key: groupKey,
                            value: "",
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
        categories: ICategoryOfEstablishmentEntity[]
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
    //     tagsMapper(tags: ITagEntity[]): ITagBlockFront[] {
    //       return''
    //     }
}
