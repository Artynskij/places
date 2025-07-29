import * as Yup from "yup";

export const validPhoneSchema = Yup.string()
.matches(/^\+?[0-9]{10,15}$/, "Некорректный формат номера");
