import * as Yup from "yup";

export const validDateSchema = Yup.string()
  .required("Дата обязательна")
  .matches(/^\d{2}\.\d{2}\.\d{4}$/, "ДД.ММ.ГГГГ")
  .test("isValidDate", "Некорректная дата", (value) => {
    if (!value) return false;
    const [d, m, y] = value.split(".").map(Number);
    const date = new Date(y, m - 1, d);
    return (
      date.getFullYear() === y &&
      date.getMonth() === m - 1 &&
      date.getDate() === d
    );
  });