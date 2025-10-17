import { CONSTANT_CONSUMPTION_TYPE_CONTENT_DB } from "@/asset/constants/database/consumption.const";

export type TConsumptionTypeContent =
    (typeof CONSTANT_CONSUMPTION_TYPE_CONTENT_DB)[keyof typeof CONSTANT_CONSUMPTION_TYPE_CONTENT_DB];
