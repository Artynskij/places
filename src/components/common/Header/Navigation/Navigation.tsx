import { useTranslations } from "next-intl";
import style from "./navigation.module.scss";
import Link from "next/link";
import { ROUTES } from "@/lib/config/Routes";
import { getTranslations } from "next-intl/server";

export const Navigation = async () => {
  const t = await getTranslations("Header");
  return (
    <nav className={style.nav}>
      <menu className={style.menu}>
      

        <Link href={ROUTES.COUNTRIES}>
          <li>{t('text.navigation.mainPageLink')}</li>
        </Link>
        <Link href={ROUTES.NEWS.CATEGORY('news')}>
          <li>{t('text.navigation.newsLink')}</li>
        </Link>
        <Link href={ROUTES.NEWS.CATEGORY('recommend')}>
          <li>{t('text.navigation.recommendLink')}</li>
        </Link>
        <Link href={ROUTES.NEWS.CATEGORY('overview')}>
          <li>{t('text.navigation.reviewsLink')}</li>
        </Link>
    
      </menu>
    </nav>
  );
};
