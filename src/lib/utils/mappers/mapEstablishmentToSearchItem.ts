import { CONSTANT_TYPES_OF_ESTABLISHMENT } from "@/asset/constants/TypesOfEstablishment";
import {
    IEstablishmentFront,
    ISearchItemFront,
    ITagWithEstablishmentFront,
} from "@/lib/models";
import { TTypesOfEstablishment } from "@/lib/models/common/TTypesEstablishment";

export const mapEstablishmentToSearchItem = (
    establishment: IEstablishmentFront,
    tagClass: ITagWithEstablishmentFront | null
): ISearchItemFront => {
    const typeEstablishment: TTypesOfEstablishment =
        establishment.typeEstablishment;

    const priceCategory =
        typeEstablishment === "EATER"
            ? {
                  key: tagClass?.tag.key || "",
                  value: tagClass?.tag.value || "",
                  count: tagClass?.tag.count || 0,
              }
            : null;
    const starRating =
        typeEstablishment === "ACCOMMODATION"
            ? {
                  key: tagClass?.tag.key || "",
                  value: tagClass?.tag.value || "",
                  count: tagClass?.tag.count || 0,
              }
            : null;
    return {
        id: establishment.id,
        title: establishment.title,
        description: establishment.description,
        categories: [establishment.category],
        globalTypeEntity: "establishment",
        lang: "",
        location: {
            country: establishment.location.country,
            town: establishment.location.town,
            lat: establishment.location.latitude,
            lon: establishment.location.longitude,
        },
        media: {
            mainImage: establishment.media.gallery[0].blobPath,
            cdnHost: establishment.media.cdnHost,
        },
        typeEstablishment: {
            key: typeEstablishment,
            id: CONSTANT_TYPES_OF_ESTABLISHMENT[typeEstablishment].id,
        },
        schedule: null,
        rate: establishment.rates.main,
        typeId: CONSTANT_TYPES_OF_ESTABLISHMENT[typeEstablishment].id,
        typeName: typeEstablishment,
        priceCategory: priceCategory,
        starRating:starRating,
    };
};
