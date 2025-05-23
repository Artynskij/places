"use client";
import { FC, Suspense, useEffect, useState, useTransition } from "react";

import style from "./burger.module.scss";

import { SelectLang } from "../SelectLang/SelectLang";
import { Navigation } from "../Navigation/Navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { ButtonClose } from "@/components/UI/Button/ButtonClose";

import { Overlay } from "@/components/common/Overlay/Overlay";
import { Button } from "@/components/UI/Button/Button";
import Profile from "../Profile/Profile";
import { useTranslations } from "use-intl";

export const Burger = () => {
    // const searchParams = useSearchParams();
    const pathname = usePathname();

    const tHeader = useTranslations("Header");
    const [burgerActive, setBurgerActive] = useState<boolean>(false);

    useEffect(() => {
        setBurgerActive(false);
        
    }, [pathname]);
    
    const closeBurger = () => {
        setBurgerActive(false);
    };
    const toggleBurger = () => {
        setBurgerActive((prev) => !prev);
    };
    return (
        <>
            <div
                onClick={toggleBurger}
                active-target={`${burgerActive}`}
                className={style.ctn_burger}
            >
                <div className={style.burger}></div>
            </div>

            <div active-target={`${burgerActive}`} className={style.block}>
                <ButtonClose
                    onClick={closeBurger}
                    className={style.block_close_btn}
                />
                <div className={style.block_menu}>
                    <ul className={style.menu_list}>
                        <li className={style.menu_item}>
                            {/* <Button
                type="blue"
                className={style.right_auth_button}
                text="Вход в личный кабинет"
              /> */}
                            <Profile />

                            <SelectLang />
                        </li>

                        <li className={style.menu_item}>
                            <Navigation translations={tHeader} />
                        </li>
                    </ul>
                </div>
            </div>
            <Overlay active={burgerActive} setActive={setBurgerActive} />
        </>
    );
};
