import * as Yup from "yup";
import { validPhoneSchema } from "../phoneSchema";
import { validImageFileSchema } from "../file/imageArraySchema";

import { validDateSchema } from "../dateSchema";

 const validationUpdateBusinessSchema = Yup.object().shape({
    legalType: Yup.string().required("Должно быть"),
    officialName: Yup.string().required(
        "Название Индивидуального предпринимателя обязатиельно"
    ),
    numberOrganization: Yup.string().required(
        "Индивидуальный регистрационный номер обязательно"
    ),
    dateRegister: validDateSchema.required("Дата регистрации обязательна"),
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

        town: Yup.string().required("Город обязателен"),
        addressLine: Yup.string().required("Адрес обязателен"),
        postalCode: Yup.string(),
    }),

    // agreements: getAgreementsValidation(agreementKeysBusinessIndividual),
});
