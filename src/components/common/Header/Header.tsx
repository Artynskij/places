import Link from "next/link";
import style from "./header.module.scss";
import { Button } from "@/components/UI/Button/Button";
import Image from "next/image";
import { SelectLang } from "./SelectLang/SelectLang";

import { Navigation } from "./Navigation/Navigation";
import { Finder } from "./Finder/Finder";
import { Burger } from "./Burger/Burger";
import { useTranslations } from "next-intl";

// { locale }: { locale: string }
export const Header = () => {
  const t = useTranslations("Header");

  return (
    <>
      <header className={style.header}>
        <div className={`container  + ${style.container}`}>
          <div className={style.logo}>
            <Link href={"/"}>
              <div className={style.logo_small}>
                <Image
                  width={38}
                  height={38}
                  src={"/icons/favicon big.svg"}
                  alt="logo"
                />
              </div>
              <div className={style.logo_big}>
                <Image
                  width={172}
                  height={38}
                  src={"/icons/logo.svg"}
                  alt="logo"
                />
              </div>
            </Link>
          </div>

          <Finder />
          <div className={style.nav_block}>
            <Navigation />
          </div>

          <div className={style.right}>
            <div className={style.right_lang}>
              <SelectLang />
            </div>
            <div className={style.right_auth}>
              <Link href={"/login"}>
                <Button
                  className={style.right_auth_button}
                  text={t("text.buttonLogin")}
                />
              </Link>
            </div>
          </div>
          <Burger />
        </div>
        <div className={`container  + ${style.header__second}`}>
          <ul>
            <Link className={style.header__second_link} href={"/user"}>
              <li className={"hover-underline"}>Лк туриста</li>
            </Link>
            <Link className={style.header__second_link} href={"/owner"}>
              <li className={"hover-underline"}>Лк Владельца</li>
            </Link>
            <Link className={style.header__second_link} href={"/news/news"}>
              <li className={"hover-underline"}>Рубрик</li>
            </Link>
            <Link className={style.header__second_link} href={"/news/news/01JJPD613ZCBDVPGBKN4JG3014"}>
              <li className={"hover-underline"}>Новости</li>
            </Link>
            <Link className={style.header__second_link} href={"/news/author/name"}>
              <li className={"hover-underline"}>Автора</li>
            </Link>
            <Link className={style.header__second_link} href={"/belarus/minskObl/minsk/01JJ21RRS0YER1XH9FM4D287JY"}>
              <li className={"hover-underline"}>Объекта</li>
            </Link>
            <Link className={style.header__second_link} href={"/filter"}>
              <li className={"hover-underline"}>Фильтр</li>
            </Link>
          </ul>
        </div>
      </header>
      {/* <div className={`container ${style.test}`} style={{}}>
        <span>Тестовые страницы</span>
      </div> */}
    </>
  );
};
