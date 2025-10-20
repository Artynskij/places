import { CONSTANT_CONSUMPTION_TYPE_DB } from "@/asset/constants/database/consumption.const";

export type TConsumptionType =
    (typeof CONSTANT_CONSUMPTION_TYPE_DB)[keyof typeof CONSTANT_CONSUMPTION_TYPE_DB];
