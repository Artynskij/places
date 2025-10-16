import { CONSTANT_TYPE_LOCATION_DB } from "@/asset/constants/database/type-location";

// export type TTypeLocationDb = (typeof CONSTANT_TYPE_LOCATION_ARRAY)[number];
export type TTypeLocationDb =
    (typeof CONSTANT_TYPE_LOCATION_DB)[keyof typeof CONSTANT_TYPE_LOCATION_DB];
