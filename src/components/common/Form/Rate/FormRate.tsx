"use client";

import style from "./formRate.module.scss";
import { ModalCustom } from "@/components/UI/ModalCustom/ModalCustom";
import { useState } from "react";
import { RateCafe } from "../../RateCustom/RateCafe";
import { RateMain } from "../../RateCustom/RateMain";
import { useTranslations } from "next-intl";
import { TTypesOfEstablishment } from "@/lib/models/types";
interface IProp {
    children: React.ReactNode | React.ReactNode[];
    typeEstablishment: TTypesOfEstablishment;
}
export const FormRate = ({ children, typeEstablishment }: IProp) => {
    const tRate = useTranslations("Rates");
    const [modalActive, setModalActive] = useState(false);
    const handlerCloseModal = () => {
        setModalActive(false);
    };
    const ratesAccommodation = [
        "Service",
        "Rooms",
        "PriceQuality",
        "Clean",
        "Location",
    ];
    const ratesEater = ["Food", "Service", "Value"];
    return (
        <>
            <div onClick={() => setModalActive(true)}>{children}</div>
            <ModalCustom
                title="оценить объект"
                closeModal={handlerCloseModal}
                active={modalActive}
            >
                <form className={style.form}>
                    <div>
                        <span>Главная оценка</span>
                        <RateMain defaultValue={0} />
                    </div>

                    {typeEstablishment === "ACCOMMODATION" &&
                        ratesAccommodation.map((rate) => {
                            return (
                                <div key={rate}>
                                    <span>{tRate(rate)}</span>{" "}
                                    <RateMain defaultValue={0} />
                                </div>
                            );
                        })}
                    {typeEstablishment === "EATER" &&
                        ratesEater.map((rate) => {
                            return (
                                <div key={rate}>
                                    <span>{tRate(rate)}</span>{" "}
                                    <RateMain defaultValue={0} />
                                </div>
                            );
                        })}
                </form>
            </ModalCustom>
        </>
    );
};
