import { CONSTANT_TYPE_FAVORITE_DB } from "@/asset/constants/database/type-favorite.const";

export type TTypeFavoriteDb =
    (typeof CONSTANT_TYPE_FAVORITE_DB)[keyof typeof CONSTANT_TYPE_FAVORITE_DB];
