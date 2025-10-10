import { useLocale as useNextIntlLocale } from "next-intl";
import { TLocale } from "@/lib/models/types";

export default function useLocale(): TLocale {
    const locale = useNextIntlLocale();
    return locale as TLocale;
}
