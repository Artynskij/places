import * as Yup from "yup";

export const validAddressSchema = Yup.object().shape({
    country: Yup.string(),//.required("Страна обязательна")
    district: Yup.string(),//.required("Область обязательна")
    town: Yup.string(),//.required("Город обязателен")
    addressLine: Yup.string(),//.required("Адрес обязателен")
    postalCode: Yup.string(),
});
