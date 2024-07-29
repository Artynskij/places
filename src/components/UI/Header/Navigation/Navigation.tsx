import { useTranslations } from "next-intl";
import style from "./navigation.module.scss";
import Link from "next/link";

export const Navigation = () => {
  const t = useTranslations("Header");
  return (
    <nav className={style.nav}>
      <menu className={style.menu}>
        {/* <li>
          <Link href={"/test"}>Test</Link>
        </li>
        <li>
          <Link href={"/belarus"}>CountryPage</Link>
        </li> */}

        <Link href={"/kazahstan"}>
          <li>{t('text.navigation.mainPageLink')}</li>
        </Link>
        <Link href={"/user"}>
          <li>testUser</li>
        </Link>
        <Link href={"/owner"}>
          <li>testOwner</li>
        </Link>
      </menu>
    </nav>
  );
};
