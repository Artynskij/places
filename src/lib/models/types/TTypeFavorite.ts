import { CONSTANT_TYPE_FAVORITE } from "@/asset/constants/type-favorite";


export type TTypeFavoriteDb =
    (typeof CONSTANT_TYPE_FAVORITE)[keyof typeof CONSTANT_TYPE_FAVORITE];
