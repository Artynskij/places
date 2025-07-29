import * as Yup from "yup";

export const validDateSchema = Yup.string()
    .nullable() // разрешает `null`
    .transform(
        (value, originalValue) => (originalValue === "" ? null : value) // преобразует "" в null
    )
    .test("isValidDate", "Некорректная дата", (value) => {
        // Если значение пустое (null, undefined, "") — пропускаем валидацию
        if (!value) return true;

        // Проверяем формат ДД.ММ.ГГГГ
        if (!/^\d{2}\.\d{2}\.\d{4}$/.test(value)) {
            return false; // Выведет ошибку из .matches()
        }

        const [day, month, year] = value.split(".").map(Number);
        const date = new Date(year, month - 1, day);

        // Проверяем, что дата корректна (например, 31.02.2025 — invalid)
        return (
            date.getFullYear() === year &&
            date.getMonth() === month - 1 &&
            date.getDate() === day
        );
    })
    .matches(/^\d{2}\.\d{2}\.\d{4}$/, "Введите дату в формате ДД.ММ.ГГГГ");
