import { IMediaFront } from "./../../../../lib/models/frontend/(establishment)/parts/media.front";
import { CONSTANT_TYPES_OF_ESTABLISHMENT_DB } from "@/asset/constants/database/types-of-establishment";
import { TTypesOfEstablishment } from "@/lib/models/types";
import { TTypeUser } from "@/lib/models/types/TTypeUser";
import {
    validImageFileSchema,
    validPhoneSchema,
    validScheduleSchema,
    validSocialNetworksSchema,
    validVideoFileSchema,
} from "@/lib/validationSchemas";
import { validContentEstablishmentSchema } from "@/lib/validationSchemas/contentEstablishmentSchema";
import { validImageAntdFileSchema } from "@/lib/validationSchemas/file/imageAntdArraySchema";
import * as Yup from "yup";

const validationSchemaBase = {
    title: Yup.string().required("Название заведения обязательно"),
    typeEstablishment: Yup.mixed<TTypesOfEstablishment>()
        .oneOf(
            Object.values(CONSTANT_TYPES_OF_ESTABLISHMENT_DB).map(
                (el) => el.key as TTypesOfEstablishment
            ),
            "Неверный тип объекта"
        )
        .required("Тип объекта обязателен"),
    categories: Yup.array()
        .of(Yup.string())
        .min(1, "Выберите хотя бы одну категорию")
        .required("Выберите хотя бы одну категорию"),
    locationId: Yup.string().required("Выбор локации обязателен"),
    coord: Yup.object().shape({
        lon: Yup.number().required("Координаты обязательны"),
        lat: Yup.number().required("Координаты обязательны"),
        addressFullLine: Yup.string(),
        addressLine: Yup.string(),
    }),
    socialContacts: validSocialNetworksSchema,
};
const validationSchemaOwner = {
    description: Yup.string().required("Описание обязательно"),
    tags: Yup.array()
        .of(Yup.string())
        .min(1, "Выберите хотя бы одну характеристику")
        .required("Выберите хотя бы одну характеристику"),
    menu: Yup.string()
        .url("Невалидный URL")
        .when("typeEstablishment", {
            is: (val: TTypesOfEstablishment) => val === "EATER",
            then: (schema) => schema.required("Введите ссылку на меню"),
            otherwise: (schema) => schema.notRequired(),
        }),
    email: Yup.string()
        .email("Неккоректный адрес электронной почты")
        .required("Адрес электронной почты обязателен"),
    phone: validPhoneSchema.required("телефон обязателен"),
    images: Yup.array()
        .of(validImageAntdFileSchema)
        .min(5, "Необходимо загрузить хотя бы 5 фотографий"),

    schedule: validScheduleSchema
        .required("Расписание обязательно")
        .length(7, "Должно быть 7 дней расписания"),
    videoVerification: Yup.array()
        .of(validVideoFileSchema)
        .min(1, "Необходимо загрузить видео")
        .max(1, "Можно загрузить только одно видео"),
};
const validationSchemaTourist = {
    description: Yup.string(),
    tags: Yup.array()
        .of(Yup.string())
        .min(1, "Выберите хотя бы одну характеристику"),
    menu: Yup.string().url("Невалидный URL").notRequired(),
    email: Yup.string().email("Неккоректный адрес электронной почты"),

    phone: validPhoneSchema,
    images: Yup.array()
        .of(validImageAntdFileSchema)
        .min(1, "Необходимо загрузить хотя бы 1 фотографий"),

    schedule: validScheduleSchema,
    // videoVerification: Yup.array().of(validVideoFileSchema),
};

export const getSchemaEstablishmentByTypeUser = (typeUser: TTypeUser) => {
    switch (typeUser) {
        case "owner":
            return Yup.object({
                ...validationSchemaBase,
                ...validationSchemaOwner,
            });

        case "tourist":
            return Yup.object({
                ...validationSchemaBase,
                ...validationSchemaTourist,
            });

        default:
            return Yup.object({
                ...validationSchemaBase,
                ...validationSchemaTourist,
            });
    }
};
export const validationSchemaEstablishmentUpdate = Yup.object({
    // title: Yup.string().required("Название заведения обязательно"),
    typeEstablishment: Yup.mixed<TTypesOfEstablishment>()
        .oneOf(
            Object.values(CONSTANT_TYPES_OF_ESTABLISHMENT_DB).map(
                (el) => el.key as TTypesOfEstablishment
            ),
            "Неверный тип объекта"
        )
        .required("Тип объекта обязателен"),
    categories: Yup.array()
        .of(Yup.string())
        .min(1, "Выберите хотя бы одну категорию")
        .required("Выберите хотя бы одну категорию"),
    locationId: Yup.string().required("Выбор локации обязателен"),
    coord: Yup.object().shape({
        lon: Yup.number().required("Координаты обязательны"),
        lat: Yup.number().required("Координаты обязательны"),
        addressFullLine: Yup.string().nullable(),
        addressLine: Yup.string().nullable(),
    }),
    socialContacts: validSocialNetworksSchema,
    // description: Yup.string().required("Описание обязательно"),
    tags: Yup.array()
        .of(Yup.string())
        .min(1, "Выберите хотя бы одну характеристику")
        .required("Выберите хотя бы одну характеристику"),
    menu: Yup.string()
        .url("Невалидный URL")
        .when("typeEstablishment", {
            is: (val: TTypesOfEstablishment) => val === "EATER",
            then: (schema) => schema.required("Введите ссылку на меню"),
            otherwise: (schema) => schema.notRequired(),
        }),
    email: Yup.string()
        .email("Неккоректный адрес электронной почты")
        .required("Адрес электронной почты обязателен"),
    phone: validPhoneSchema.required("телефон обязателен"),

    images: Yup.array()
        .of(validImageAntdFileSchema)
        .min(5, "Необходимо загрузить хотя бы 5 фотографий"),

    schedule: validScheduleSchema
        .required("Расписание обязательно")
        .length(7, "Должно быть 7 дней расписания"),
    // typeUser: Yup.mixed<TTypeUser>()
    //     .oneOf(["owner", "tourist", "admin"], "Неверный тип объекта")
    //     .required("Тип объекта обязателен"),
    content: Yup.array()
        .of(validContentEstablishmentSchema)
        .min(1, "Добавьте хотя бы один язык")
        .nullable()
        .required("Необходимо заполнить языковые версии"),
});
