import { CONSTANT_TYPES_OF_ESTABLISHMENT } from "@/asset/constants/TypesOfEstablishment";
import {
    IEstablishmentFront,
    ILocationFront,
    ISearchItemFront,
    ITagWithEstablishmentFront,
} from "@/lib/models";
import { TTypesOfEstablishment } from "@/lib/models/common/TTypesEstablishment";

export const mapEstablishmentToSearchItem = (
    establishment: IEstablishmentFront,
    tagClass: ITagWithEstablishmentFront | null,
    locationCountryData?: ILocationFront
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
    const location = {
        country: {
            id: establishment.location.country.id,
            title: !!establishment.location.country.title
                ? establishment.location.country.title
                : locationCountryData?.title || '',
        },
        town: establishment.location.town,
        lat: establishment.location.latitude,
        lon: establishment.location.longitude,
    };
    return {
        id: establishment.id,
        title: establishment.title,
        description: establishment.description,
        categories: [establishment.category],
        globalTypeEntity: "establishment",
        lang: "",
        location: location,
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
        starRating: starRating,
    };
};
