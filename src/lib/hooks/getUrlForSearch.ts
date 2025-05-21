import { CONSTANT_TYPES_OF_ESTABLISHMENT } from "@/asset/constants/TypesOfEstablishment";
import { ROUTES, ROUTES_FINDER } from "../config/Routes";
import { ISearchItemFront } from "../models";
import { TGlobalTypes } from "../models/common/TTypesGlobal";

export const getUrlForUrl = (
    searchItem: ISearchItemFront,
    typeGlobal: TGlobalTypes
) => {
    if (typeGlobal === "establishment") {
        const location =
            searchItem.location?.town?.id ||
            searchItem.location?.country?.id ||
            "not_found";
        const typeEst =
            CONSTANT_TYPES_OF_ESTABLISHMENT[
                searchItem.typeEstablishment?.key || "ACCOMMODATION"
            ];

        return ROUTES.LOCATION.ESTABLISHMENT(
            location,
            typeEst.key,
            searchItem.id
        );
    } else if (typeGlobal === "location") {
        return ROUTES.LOCATION.LOCATION(searchItem.id);
    } else {
        return ROUTES.NEWS.NEWS("news", searchItem.id);
    }
};
