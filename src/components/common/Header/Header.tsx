import Link from "next/link";
import style from "./header.module.scss";
import Image from "next/image";
import { SelectLang } from "./SelectLang/SelectLang";
import Profile from "./Profile/Profile";

import { Navigation } from "./Navigation/Navigation";
import { Finder } from "./Finder/Finder";
import { Burger } from "./Burger/Burger";

import { mockTourist } from "@/asset/mockData/mockTourist";
import { Button } from "@/components/UI/Button/Button";
import { ROUTES } from "@/lib/config/Routes";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { TYPES_OF_ESTABLISHMENT } from "@/asset/constants/typesOfEstablishment";
import { FinderHeader } from "../Finder/FinderHeader/FinderHeader";

// { locale }: { locale: string }
export const Header = async () => {
    const tHeader = await getTranslations("Header");

    // const SelectLang = dynamic(
    //     () => import("./SelectLang/SelectLang").then((mod) => mod.SelectLang),
    //     {
    //         ssr: false,
    //     }
    // );
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
                            <Link href={"/login"}>
                                <Button
                                    className={style.right_auth_button}
                                    text={tHeader("text.buttonLogin")}
                                />
                            </Link>
                            {/* <Profile /> */}
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
                            href={ROUTES.PROFILE.USER("whois")}
                        >
                            <li className={"hover-underline"}>Лк туриста</li>
                        </Link>
                        <Link
                            className={style.header__second_link}
                            href={ROUTES.PROFILE.OWNER("whois")}
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
                            href={ROUTES.PROFILE.TOURIST(
                                mockTourist[0].username
                            )}
                        >
                            <li className={"hover-underline"}>Турист</li>
                        </Link>
                        <Link
                            className={style.header__second_link}
                            href={ROUTES.LOCATION.ESTABLISHMENT(
                                "01H9ZFTX89YTPD7QJW7N5EAWQP",
                                TYPES_OF_ESTABLISHMENT.ACCOMMODATION.key,
                                "01JJ21RRS0YER1XH9FM4D287JY"
                            )}
                        >
                            <li className={"hover-underline"}>Объекта</li>
                        </Link>
                        <Link
                            className={style.header__second_link}
                            href={ROUTES.FILTER(
                                "01HMY6V2B4YK8M9V4R6JQ3W5XT",
                                TYPES_OF_ESTABLISHMENT.ACCOMMODATION.key
                            )}
                        >
                            <li className={"hover-underline"}>Фильтр</li>
                        </Link>
                    </ul>
                </div>
            </header>
        </>
    );
};
