import { CONSTANT_RATES_ESTABLISHMENT_ARRAY } from "@/asset/constants/ratesEstablishment";

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
    (typeof CONSTANT_RATES_ESTABLISHMENT_ARRAY)[number];
