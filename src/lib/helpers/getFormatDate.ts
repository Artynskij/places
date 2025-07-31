import dayjs from "dayjs";
import "dayjs/locale/ru";

// Форматируем дату в ДД.ММ.ГГГГ
export const getFormatDate = (value: string) => {
    if (!value) return "";

    // Серверный формат YYYY/DD/MM
    if (/^\d{4}\/\d{2}\/\d{2}$/.test(value)) {
        return dayjs(value, "YYYY/DD/MM").locale("ru").format("DD.MM.YYYY");
    }

    // ISO без времени YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return dayjs(value).locale("ru").format("DD.MM.YYYY");
    }

    // ISO с временем YYYY-MM-DDTHH:mm:ss.sssZ
    if (/^\d{4}-\d{2}-\d{2}T/.test(value)) {
        return dayjs(value).locale("ru").format("DD.MM.YYYY");
    }

    // Уже в ДД.ММ.ГГГГ — возвращаем как есть
    if (/^\d{2}\.\d{2}\.\d{4}$/.test(value)) {
        return value;
    }

    return value;
};
export const parseDateToISO = (rawValue: string) => {
    const cleanedValue = rawValue.replace(/[^\d.]/g, "");

    // Если дата неполная → возвращаем как есть
    if (cleanedValue.length < 10) return cleanedValue;

    // Полная дата в ДД.ММ.ГГГГ → переводим в ISO
    if (/^\d{2}\.\d{2}\.\d{4}$/.test(cleanedValue)) {
        return dayjs(cleanedValue, "DD.MM.YYYY").format("YYYY-MM-DD");
    }

    return cleanedValue;
};
