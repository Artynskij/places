import style from "./navigation.module.scss";
import Link from "next/link";
import { ROUTES } from "@/lib/config/Routes";

interface INavigationProps {
    translations: (str: string) => string;
}
export const Navigation = (prop: INavigationProps) => {
    const translations = prop.translations;

    return (
        <nav className={style.nav}>
            <menu className={style.menu}>
                <Link href={ROUTES.COUNTRIES}>
                    <li>{translations("text.navigation.mainPageLink")}</li>
                </Link>
                <Link href={ROUTES.NEWS.CATEGORY("news")}>
                    <li>{translations("text.navigation.newsLink")}</li>
                </Link>
                <Link href={ROUTES.NEWS.CATEGORY("recommend")}>
                    <li>{translations("text.navigation.recommendLink")}</li>
                </Link>
                <Link href={ROUTES.NEWS.CATEGORY("overview")}>
                    <li>{translations("text.navigation.reviewsLink")}</li>
                </Link>
            </menu>
        </nav>
    );
};
