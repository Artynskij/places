"use client";
import { FC, useEffect, useState } from "react";
import { Overlay } from "../../Overlay/Overlay";
import style from "./burger.module.scss";
import { Button } from "../../Button/Button";
import { SelectLang } from "../SelectLang/SelectLang";
import { Navigation } from "../Navigation/Navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { ButtonClose } from "../../Button/ButtonClose";

export const Burger = () => {
  const [burgerActive, setBurgerActive] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  useEffect(() => {
    if (burgerActive) {
      setBurgerActive(false);
    }
  }, [searchParams, pathname]);
  function closeBurger() {
    setBurgerActive(false);
  }
  return (
    <>
      <div
        onClick={() => setBurgerActive(!burgerActive)}
        active-target={`${burgerActive}`}
        className={style.ctn_burger}
      >
        <span>Menu</span>

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
