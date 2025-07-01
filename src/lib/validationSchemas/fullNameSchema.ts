import * as Yup from "yup";

export const validFullNameSchema = Yup.object().shape({
  name: Yup.string().required("Имя обязательно"),
  secondName: Yup.string(), // Отчество может быть необязательным
  surname: Yup.string().required("Фамилия обязательна"),
});