"use client";
import { Button } from "@/components/UI/Button/Button";
import style from "./objectsOwner.module.scss";
import { IconPlus } from "@/components/common/Icons";

import { CardObjectOwner } from "./CardObjectOwner/CardObjectOwner";
import { mockObjectsHotels } from "@/asset/mockData/mockObject";
import { useTranslations } from "next-intl";

export const TabObjectsOwner = () => {
    const t = useTranslations("ProfilePage");
    return (
        <>
            <div className={style.title}>
                <h3 className={style.title_text}>{t("objectTab.myObject")}</h3>
                <Button
                    text={t("objectTab.regObject")}
                    type="blue"
                    className={style.title_button}
                    icon={<IconPlus className={style.title_button_icon} />}
                />
            </div>
            <div className={style.list}>
                {mockObjectsHotels.map((item, index) => {
                    return (
                        <CardObjectOwner
                            editObjectText={t("objectTab.editObject")}
                            data={item}
                            key={index}
                        />
                    );
                })}
            </div>
        </>
    );
};
