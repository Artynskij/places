"use client";
import { FC, useEffect, useState } from "react";

import style from "./burger.module.scss";

import { SelectLang } from "../SelectLang/SelectLang";
import { Navigation } from "../Navigation/Navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { ButtonClose } from "@/components/UI/Button/ButtonClose";

import { Overlay } from "@/components/common/Overlay/Overlay";
import { Button } from "@/components/UI/Button/Button";

export const Burger = () => {
  const [burgerActive, setBurgerActive] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  useEffect(() => {
    if (burgerActive) {
      setBurgerActive(false);
    }
  }, [searchParams, pathname]);
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
        <ButtonClose onClick={closeBurger} className={style.block_close_btn} />
        <div className={style.block_menu}>
          <ul className={style.menu_list}>
            <li className={style.menu_item}>
              <Button
                type="blue"
                className={style.right_auth_button}
                text="Вход в личный кабинет"
              />
              <SelectLang />
            </li>

            <li className={style.menu_item}>
              <Navigation />
            </li>
          </ul>
        </div>
      </div>
      <Overlay active={burgerActive} setActive={setBurgerActive} />
    </>
  );
};
