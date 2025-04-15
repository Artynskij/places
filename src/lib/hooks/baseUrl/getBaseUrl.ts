import { getLocale } from "next-intl/server";
import { headers } from "next/headers";

export const getBaseUrlServer = async () => {
    const headersList = headers();
    const host = headersList.get("host");
    const protocol = headersList.get("x-forwarded-proto") || "http";

    // Получаем путь из заголовка или URL
    // const pathname = headersList.get("x-pathname") || "/";
    const lang = await getLocale();

    // Убираем лишние слеши и добавляем язык, если он есть
    const baseUrl = `${protocol}://${host}/${lang}`;

    return baseUrl;
};
