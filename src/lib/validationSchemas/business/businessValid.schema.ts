import * as Yup from "yup";
import { validPhoneSchema } from "../phoneSchema";
import { validImageFileSchema } from "../file/imageArraySchema";

import { getAgreementsValidation } from "@/components/common/BlockFunctional/BlockAgreements";
import {
    AGREEMENT_KEYS_BUS_INDIVIDUAL,
    AGREEMENT_KEYS_BUS_LEGAL_ENTITY,
} from "@/asset/constants/front-database/agreements-keys.data";
import { validDateSchema } from "../dateSchema";

const baseBusinessSchema = {
    officialName: Yup.string().required("Название обязательно"), // дефолтное
    email: Yup.string()
        .email("Некорректный email")
        .required("Email обязателен"),
    numberOrganization: Yup.string().nullable(),
    dateRegister: validDateSchema.nullable(),
    phone: validPhoneSchema.required("Телефон обязателен"),
    documentsVerify: Yup.array()
        .of(validImageFileSchema)
        .min(1, "Нужен хотя бы один документ")
        .max(10, "Не более 10 документов"),
    address: Yup.object({
        country: Yup.string().required("Страна обязательна"),
        district: Yup.string().required("Регион, область, штат обязателен"),
        town: Yup.string().required("Город обязателен"),
        addressLine: Yup.string().required("Адрес обязателен"),
        postalCode: Yup.string(),
    }),
};

export const validationBusinessSoleProprietorSchema = Yup.object({
    ...baseBusinessSchema,
    officialName: Yup.string().required("Название ИП обязательно"), // 👈 переопределяем текст
    numberOrganization: Yup.string().required("ИНН обязателен"),
    dateRegister: validDateSchema.required("Дата регистрации обязательна"),
    agreements: getAgreementsValidation(AGREEMENT_KEYS_BUS_INDIVIDUAL),
});

export const validationBusinessLegalEntitySchema = Yup.object({
    ...baseBusinessSchema,
    officialName: Yup.string().required("Название юр. лица обязательно"), // 👈 другой текст
    numberOrganization: Yup.string().required("ИНН юр. лица обязателен"),
    dateRegister: validDateSchema.required("Дата регистрации обязательно"),
    agreements: getAgreementsValidation(AGREEMENT_KEYS_BUS_LEGAL_ENTITY),
});

export const validationBusinessIndividualSchema = Yup.object({
    ...baseBusinessSchema,
    officialName: Yup.string().required("ФИО обязательно"), // 👈 ещё один вариант текста
    agreements: getAgreementsValidation(AGREEMENT_KEYS_BUS_INDIVIDUAL),
});
