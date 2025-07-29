import * as Yup from "yup";

export const validScheduleSchema = Yup.array()
    .of(Yup.string()) //.required("Обязательное поле")
    .length(2, "Укажите интервал от и до")
    .required("Укажите график работы");
