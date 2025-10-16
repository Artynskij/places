import { CONSTANT_RATES_ESTABLISHMENT_ARRAY_DB } from "@/asset/constants/database/rates-establishment.const";

// export type TTypesRateEstablishment =
//     | "Rooms"
//     | "PriceQuality"
//     | "Clean"
//     | "Location"
//     | "Rate"
//     | "Atmosphere"
//     | "Food"
//     | "Service"
//     | "Value"
//     | "Comfort"
//     | "Accessibility"
//     | "Quality"
//     | "Safety";
// type ConstantAgreement = ;
export type TTypesRateEstablishment =
    (typeof CONSTANT_RATES_ESTABLISHMENT_ARRAY_DB)[number];
