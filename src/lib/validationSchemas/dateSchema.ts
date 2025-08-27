import * as Yup from "yup";

export const validDateSchema = Yup.date()
    .nullable() // разрешаем null
    .transform((value, originalValue) => {
        // если пришла пустая строка из инпута → null
        if (!originalValue || originalValue === "") {
            return null;
        }

        // если уже Date — оставляем
        if (value instanceof Date && !isNaN(value.getTime())) {
            return value;
        }

        return null;
    })
    .typeError("Некорректная дата")
    .test("isValidDate", "Некорректная дата", (value) => {
        if (!value) return true; // null разрешён
        return !isNaN(value.getTime()); // валидная ли дата
    });
