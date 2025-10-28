import * as Yup from "yup";
import { validDateSchema } from "../dateSchema";
import { validSocialNetworksSchema } from "../socialNetworksSchema";
import { validPhoneSchema } from "../phoneSchema";
import { validImageFileSchema } from "../file/imageArraySchema";
import { validMessangerNetworksSchema } from "../messangersSchema";

export const validationPersonTourist = Yup.object().shape({
    fullName: Yup.object().shape({
        name: Yup.string(),
        secondName: Yup.string(), // Отчество может быть необязательным
        surname: Yup.string(),
    }),
    dateOfBirth: validDateSchema,
    gender: Yup.string(),
    nickname: Yup.string(),
    email: Yup.string().email("Невалидный email"),
    phone: validPhoneSchema,
    address: Yup.object().shape({
        country: Yup.string(),
        town: Yup.string(),
    }),
    webContact: Yup.string().url("Невалидный URL"),
    messangerContacts: validMessangerNetworksSchema,
    socialContacts: validSocialNetworksSchema,
    avatar: Yup.array()
        .of(validImageFileSchema)
        .max(1, "Можно загрузить не более 1 фоток"),
    description: Yup.string(),
    
});
export const validationPersonOwner = Yup.object().shape({
    fullName: Yup.object().shape({
        name: Yup.string().required("Имя обязательна"),
        secondName: Yup.string(),
        surname: Yup.string().required("Фамилия обязательна"),
    }),

    email: Yup.string().email("Невалидный email").required("Почта обязательна"),
    phone: validPhoneSchema,

    avatar: Yup.array()
        .of(validImageFileSchema)
        .max(1, "Можно загрузить не более 1 фоток"),

    passportDocument: Yup.array()
        .of(validImageFileSchema)
        .min(1, "Вы должны загрузить минимум 1 фото")
        .max(5, "Можно загрузить не более 5 фоток"),
})