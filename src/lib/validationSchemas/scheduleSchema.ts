import * as Yup from "yup";

export const validScheduleSchema = Yup.array()

    .of(
        Yup.object({
            id: Yup.string()
                .transform((val) =>
                    val === undefined || val === null ? "" : val
                )
                .test(
                    "allow-empty-string",
                    "ID должен быть строкой",
                    (val) => typeof val === "string"
                ),
            day: Yup.string()
                .oneOf(["mon", "tue", "wed", "thu", "fri", "sat", "sun"])
                .required("День недели обязателен"),
            openTime: Yup.string().required("Время открытия обязательно"),
            closeTime: Yup.string().required("Время закрытия обязательно"),
            is24Hours: Yup.boolean().required("Эта ошибка не должна повиться"),
            isHoliday: Yup.boolean().required("Эта ошибка не должна повиться"),
        }).test("not-default", "Заполните расписание на каждый день", (val) => {
            const isEmptyTime = !val?.openTime || !val?.closeTime;
            const isDefault = !val?.is24Hours && !val?.isHoliday && isEmptyTime;

            return !isDefault;
        })
    )
   
