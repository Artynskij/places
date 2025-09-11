import * as Yup from "yup";
import { TTypeUser } from "../models/types";

export const validContentEstablishmentSchema = Yup.object({
    lang: Yup.string().required("Выберите язык"),
    value: Yup.object({
        details: Yup.object({
            title: Yup.string().required("Название обязательно"),
            description: Yup.string().required("Описание обязательно"),
        }),
        location: Yup.object({
            street1: Yup.string().nullable(),
            street2: Yup.string().nullable(),
        }),
        seo: Yup.array().of(
            Yup.object({
                key: Yup.string().required('если есть нужно заполнить'),
                value: Yup.string().required('если есть нужно заполнить'),
            })
        ).nullable(),
        seoTrip: Yup.array().of(
            Yup.object({
                key: Yup.string().required('если есть нужно заполнить'),
                value: Yup.string().required('если есть нужно заполнить'),
            })
        ).nullable(),
    }),
});
