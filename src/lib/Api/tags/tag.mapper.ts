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
        tags: ITagsOfEstablishmentFilterResponse[] | null
    ): ITagsBlockFront[] | null {
        const mappingData: ITagsBlockFront[] | undefined = tags?.map((cat) => {
            return {
                tags: cat.Tags.map((tag) => {
                    return {
                        id: tag.Id,
                        value: tag.Content.details[0].value,
                        key: tag.Id,
                    };
                }),
                groupKey: {
                    id: cat.TagCategory.Id,
                    value:
                        cat.TagCategory.Name ||
                        cat.TagCategory.Content.details[0].value,
                    key: cat.TagCategory.Name,
                },
            };
        });
        return mappingData || null;
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
    // TODO add priceRating with establishment EATER
    transformClassTag(
        tags: ITagsOfEstablishmentResponse[] | null
    ): ITagClassWithEstablishmentFront[] | null {
        const mappingData = this.transformTagWithEstablishment(tags)?.filter(
            (tag) => tag.categoryTag.key === "starRating"
        );
        if (!mappingData) return null;

        const mappingDataWithCount: ITagClassWithEstablishmentFront[] =
            mappingData.map((tag) => {
                const count = +tag.tag.value.split(" ")[0];
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
