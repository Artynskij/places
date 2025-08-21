import * as Yup from "yup";
import { validPhoneSchema } from "../phoneSchema";
import { validImageFileSchema } from "../file/imageArraySchema";

import { getAgreementsValidation } from "@/components/common/BlockFunctional/BlockAgreements";
import { agreementKeysBusinessIndividual } from "@/asset/constants/agreementsKeys";

export const validationBusinessIndividualSchema = Yup.object().shape({
    fullName: Yup.object().shape({
        name: Yup.string().required("имя обязательно"),
        secondName: Yup.string(), // Отчество может быть необязательным
        surname: Yup.string().required("имя обязательно"),
    }),

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

    agreements: getAgreementsValidation(agreementKeysBusinessIndividual),
});
