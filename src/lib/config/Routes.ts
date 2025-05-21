import { CONSTANT_TYPES_OF_ESTABLISHMENT } from "@/asset/constants/TypesOfEstablishment";
import { TCategoriesNews } from "../models/common/TCategoriesNews";
import { CONSTANT_SEARCH_PARAMS } from "@/asset/constants/SearchParamsConst";

export const ROUTES = {
    MAIN: "/",
    COUNTRIES: "/countries",
    AUTH: { REGISTER: "/register", LOGIN: "/login" },
    PROFILE: {
        OWNER: (username: string) => `/owner/${username}`,
        TOURIST: (username: string) => `/tourist/${username}`,
        USER: (username: string) => `/user/${username}`,
    },
    FILTER: (location: string, typeEst: string) =>
        `/${location}/${typeEst}/filter`,
    FILTER_WITH_QUERY: (
        location: string,
        typeEst: string,
        tagId: string,
        typeTag: "c" | "t"
    ) => `/${location}/${typeEst}/filter?filter=${typeTag}${tagId}`,
    NEWS: {
        CATEGORY: (category: TCategoriesNews) => `/news/${category}`,
        NEWS: (category: TCategoriesNews, news: string) =>
            `/news/${category}/${news}`,
        AUTHOR: (author: string) => `/news/author/${author}`,
    },
    LOCATION: {
        LOCATION: (location: string) => `/${location}`,
        ESTABLISHMENT: (
            location: string,
            // district: string,
            typeEst: string,
            establishment: string
        ) => `/${location}/${typeEst}/${establishment}`,
    },
    SEARCH: (string: string, indexSearch: string = "") =>
        `/search?${CONSTANT_SEARCH_PARAMS.SEARCH}=${string}${
            indexSearch &&
            `&${CONSTANT_SEARCH_PARAMS.INDEX_SEARCH}=${indexSearch}`
        }`,
};
export const ROUTES_FINDER = {
    location: (location: string) => ROUTES.LOCATION.LOCATION(location),
    article: (news: string) => ROUTES.NEWS.NEWS("news", news),
    establishment: (establishment: string) =>
        ROUTES.LOCATION.ESTABLISHMENT(
            "01JQW07E3T1TYF1S25MFZHR9G6",
            CONSTANT_TYPES_OF_ESTABLISHMENT["ACCOMMODATION"].key,
            establishment
        ),
};
