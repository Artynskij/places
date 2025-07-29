// lib/helpers/getFormatDate.ts
import dayjs from "dayjs";
import "dayjs/locale/ru";
import "dayjs/locale/en";

// Форматирует дату из ISO (YYYY-MM-DD) в DD.MM.YYYY для маски
export const getFormatDate = (value: string, locale: string = "ru") => {
  if (!value) return "";
  return dayjs(value).locale(locale).format("DD.MM.YYYY");
};

// Парсит дату из DD.MM.YYYY обратно в ISO (для onChange)
export const parseDateToISO = (rawValue: string) => {
  const cleanedValue = rawValue.replace(/[^\d.]/g, "");
  if (!/^\d{2}\.\d{2}\.\d{4}$/.test(cleanedValue)) return rawValue; // Если ввод неполный
  return dayjs(cleanedValue, "DD.MM.YYYY").format("YYYY-MM-DD");
};