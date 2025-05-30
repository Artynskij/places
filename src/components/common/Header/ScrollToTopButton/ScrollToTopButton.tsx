"use client";
import style from "./scrollToTopButton.module.scss";
import { IconUp } from "../../Icons";
import { useEffect, useState } from "react";

export const ScrollToTopButton = () => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handlerScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        visible && (
            <div onClick={handlerScrollToTop} className={style.buttonUp}>
                <IconUp className={style.buttonUp_icon} />
            </div>
        )
    );
};
