import * as Yup from "yup";
import { validPhoneSchema } from "../phoneSchema";
import { validImageFileSchema } from "../file/imageArraySchema";

import { getAgreementsValidation } from "@/components/common/BlockFunctional/BlockAgreements";
import { AGREEMENT_KEYS_BUS_INDIVIDUAL } from "@/asset/constants/front-database/agreements-keys.data";

const validationBusinessIndividualSchema = Yup.object().shape({
    officialName: Yup.string().required("Название организации обязательно"),

    email: Yup.string()
        .email("Неккоректный адрес электронной почты")
        .required("Адрес электронной почты обязателен"),
    phone: validPhoneSchema.required("телефон обязателен"),
    documentsVerify: Yup.array()
        .of(validImageFileSchema)
        .min(1, "Необходимо загрузить хотя бы один документ")
        .max(10, "Можно загрузить не более 10 документов"),
    address: Yup.object().shape({
        country: Yup.string().required("Страна обязательна"),
        // district: Yup.string().required("Область обязательна"),
        town: Yup.string().required("Город обязателен"),
        addressLine: Yup.string().required("Адрес обязателен"),
        postalCode: Yup.string(),
    }),

    agreements: getAgreementsValidation(AGREEMENT_KEYS_BUS_INDIVIDUAL),
});
