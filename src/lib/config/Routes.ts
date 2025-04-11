import { newsCategoriesData } from "@/asset/constants/data";


  
type INewsCategory= typeof newsCategoriesData[keyof typeof newsCategoriesData]
export const ROUTES = {
    MAIN: "/",
    COUNTRIES:'/countries',
    AUTH: { REGISTER: "/register", LOGIN: "/login" },
    PROFILE: {
        OWNER: (username: string) => `/owner/${username}`,
        TOURIST: (username: string) => `/tourist/${username}`,
        USER: (username: string) => `/user/${username}`,
    },
    FILTER: (location: string, typeEst:string) => `/${location}/${typeEst}/filter`,
    NEWS: {
        CATEGORY: (category: INewsCategory) => `/news/${category}`,
        NEWS: (category: INewsCategory, news: string) =>
            `/news/${category}/${news}`,
        AUTHOR: (author: string) => `/news/author/${author}`,
    },
    LOCATION: {
        LOCATION: (location: string) => `/${location}`,
        // DISTRICT: (country: string, district: string) =>
        //     `/${country}/${district}`,
        // TOWN: (country: string, district: string, town: string) =>
        //     `/${country}/${district}/${town}`,
        ESTABLISHMENT: (
            location: string,
            // district: string,
            typeEst: string,
            establishment: string
        ) => `/${location}/${typeEst}/${establishment}`,
    },
};
