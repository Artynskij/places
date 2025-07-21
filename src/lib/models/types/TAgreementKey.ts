import { CONSTANT_AGREEMENTS_DATA } from "@/asset/constants/AgreementsData";

type ConstantAgreement = (typeof CONSTANT_AGREEMENTS_DATA)[number];
export type TAgreementKey = ConstantAgreement["value"];