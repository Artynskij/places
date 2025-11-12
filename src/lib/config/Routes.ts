import { CONSTANT_TYPES_OF_ESTABLISHMENT_DB } from "@/asset/constants/database/types-of-establishment";
import { TCategoriesNews } from "../models/types/TCategoriesNews";
import { CONSTANT_SEARCH_PARAMS } from "@/asset/constants/search-params.const";
import { TTypeOwnerBusiness } from "../models/types/auth/TTypeOwnerBusiness";
import { TTypeUser } from "../models/types";
// TODO DEFAULT ROUTES DATA
export const ROUTES = {
    MAIN: "/",
    COUNTRIES: "/countries",
    AUTH: {
        REGISTER: {
            TOURIST: "/register/tourist",
            OWNER: (query?: TTypeOwnerBusiness) =>
                `/register/owner${query ? "?type=" + query : ""}`,
            REGISTER: "/register",
        },
        LOGIN: "/login",
    },
    PROFILE: {
        OWNER: (username: string, tab?: string) =>
            `/owner/${username}${
                tab ? `?${CONSTANT_SEARCH_PARAMS.TAB}=${tab}` : ""
            }`,
        BUSINESS: (businessId: string, tab?: string) =>
            `/business/${businessId}${
                tab ? `?${CONSTANT_SEARCH_PARAMS.TAB}=${tab}` : ""
            }`,
        TOURIST: (username: string, tab?: string) =>
            `/tourist/${username}${
                tab ? `?${CONSTANT_SEARCH_PARAMS.TAB}=${tab}` : ""
            }`,
        USER: (username: string, tab?: string) =>
            `/user/${username}${
                tab ? `?${CONSTANT_SEARCH_PARAMS.TAB}=${tab}` : ""
            }`,
        SETTINGS: {
            OWNER: (username: string) => `/owner/${username}/settings`,
            TOURIST: (username: string, tab?: "notification" | "personal") =>
                `/tourist/${username}/settings${`?tab=${tab || "personal"}`}`,
            BUSINESS: (businessId: string) =>
                `/business/${businessId}/settings`,
        },
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
        TYPE: (type: string) => `/news/${type}`,
        SUB_TYPE: (type: string, subType: string) => `/news/${type}/${subType}`,
        ARTICLE: (article: string) => `/news/article/${article}`,
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
    SEARCH: (string: string, indexSearch: string = "", page: string = "") =>
        `/search?${CONSTANT_SEARCH_PARAMS.SEARCH}=${string}${
            !!indexSearch
                ? `&${
                      CONSTANT_SEARCH_PARAMS.INDEX_SEARCH
                  }=${indexSearch.toLocaleLowerCase()}`
                : ""
        }${
            !!page
                ? `&${CONSTANT_SEARCH_PARAMS.PAGE}=${page.toLocaleLowerCase()}`
                : ""
        }`,
    FORM: {
        BUSINESS: "/form/business",
        ESTABLISHMENT_CREATE: "/form/establishment",
    },
    ADMIN: {
        ROOT: "/admin",
        ARTICLES: "/admin/articles",
        ATTRIBUTES: "/admin/attributes",
        BUSINESS: "/admin/business",
        ESTABLISHMENTS: "/admin/establishments",
        LOCATIONS: "/admin/locations",
        USERS: "/admin/users",

        DATA_MANAGER: "/admin/data-management",
    },
};

export const ROUTES_FINDER = {
    location: (location: string) => ROUTES.LOCATION.LOCATION(location),
    article: (article: string) => ROUTES.NEWS.ARTICLE( article),
    establishment: (establishment: string) =>
        ROUTES.LOCATION.ESTABLISHMENT(
            "01JQW07E3T1TYF1S25MFZHR9G6",
            CONSTANT_TYPES_OF_ESTABLISHMENT_DB["ACCOMMODATION"].key,
            establishment
        ),
};
