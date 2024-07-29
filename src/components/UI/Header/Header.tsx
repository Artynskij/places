import Link from "next/link";
import style from "./header.module.scss";
import { Button } from "@/components/UI/Button/Button";
import Image from "next/image";
import { SelectLang } from "./SelectLang/SelectLang";
import { CiGlobe } from "react-icons/ci";
import { IconGlobe } from "../Icons/IconGlobe/IconGlobe";
import { Navigation } from "./Navigation/Navigation";
import { Finder } from "./Finder/Finder";
import { Burger } from "./Burger/Burger";
import { useTranslations } from "next-intl";

// { locale }: { locale: string }
export const Header = () => {
  const t = useTranslations("Header");

  return (
    <header className={style.header}>
      <div className={"container " + style.container}>
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
    </header>
  );
};
