import { CONSTANT_AGREEMENTS_DATA } from "@/asset/constants/front-database/agreements.data";

type ConstantAgreement = (typeof CONSTANT_AGREEMENTS_DATA)[number];
export type TAgreementKey = ConstantAgreement["key"];
