import Link from "next/link";
import style from "./header.module.scss";
import Image from "next/image";
import { SelectLang } from "./SelectLang/SelectLang";
import Profile from "./Profile/Profile";

import { Navigation } from "./Navigation/Navigation";
// import { Finder } from "./Finder/Finder";
import { Burger } from "./Burger/Burger";

import { mockTourist } from "@/asset/mockData/mockTourist";
import { Button } from "@/components/UI/Button/Button";
import { ROUTES } from "@/lib/config/Routes";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { CONSTANT_TYPES_OF_ESTABLISHMENT_DB } from "@/asset/constants/database/types-of-establishment";
import { FinderHeader } from "../Finder/FinderHeader/FinderHeader";
import { ScrollToTopButton } from "./ScrollToTopButton/ScrollToTopButton";

export const Header = async () => {
    const tHeader = await getTranslations("Header");

    return (
        <>
            <header className={style.header}>
                <div className={`container ${style.container}`}>
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

                    <FinderHeader />
                    <div className={style.nav_block}>
                        <Navigation translations={tHeader} />
                    </div>

                    <div className={style.right}>
                        <div className={style.right_lang}>
                            {/* <Suspense fallback={<div>select lang</div>}>
                                <SelectLang />
                            </Suspense> */}
                        </div>
                        <div className={style.right_auth}>
                            <Profile />
                        </div>
                    </div>
                    <Suspense fallback={<div>Burger</div>}>
                        <Burger />
                    </Suspense>
                </div>
                <div className={`container  + ${style.header__second}`}>
                    <ul>
                        <Link
                            className={style.header__second_link}
                            href={ROUTES.PROFILE.TOURIST("anastaTest")}
                        >
                            <li className={"hover-underline"}>Лк туриста</li>
                        </Link>
                        <Link
                            className={style.header__second_link}
                            href={ROUTES.PROFILE.OWNER("anastaTest")}
                        >
                            <li className={"hover-underline"}>Лк Владельца</li>
                        </Link>
                        <Link
                            className={style.header__second_link}
                            href={"/news/news"}
                        >
                            <li className={"hover-underline"}>Рубрик</li>
                        </Link>
                        <Link
                            className={style.header__second_link}
                            href={ROUTES.NEWS.NEWS(
                                "news",
                                "01JJPD613ZCBDVPGBKN4JG3014"
                            )}
                        >
                            <li className={"hover-underline"}>Новости</li>
                        </Link>
                        <Link
                            className={style.header__second_link}
                            href={ROUTES.NEWS.AUTHOR("name")}
                        >
                            <li className={"hover-underline"}>Автора</li>
                        </Link>

                        <Link
                            className={style.header__second_link}
                            href={ROUTES.LOCATION.ESTABLISHMENT(
                                "01JQW07G5Y3AQHM4EXC2M1NZ83",
                                CONSTANT_TYPES_OF_ESTABLISHMENT_DB.EATER.key,
                                "01JPZDQ0A2WENCX080NTEC4JTJ"
                            )}
                        >
                            <li className={"hover-underline"}>Объекта</li>
                        </Link>
                        <Link
                            className={style.header__second_link}
                            href={ROUTES.FILTER(
                                "01HMY6V2B4YK8M9V4R6JQ3W5XT",
                                CONSTANT_TYPES_OF_ESTABLISHMENT_DB.ACCOMMODATION
                                    .key
                            )}
                        >
                            <li className={"hover-underline"}>Фильтр</li>
                        </Link>
                        <Link
                            className={style.header__second_link}
                            href={ROUTES.ADMIN.ROOT}
                        >
                            <li className={"hover-underline"}>Админка</li>
                        </Link>
                    </ul>
                </div>
                <ScrollToTopButton />
            </header>
        </>
    );
};
