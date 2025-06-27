"use client";

import { Button } from "@/components/UI/Button/Button";
import layoutStyle from "../../layoutStyle.module.scss";
import style from "../registerScreen.module.scss";
import { IPageProps } from "@/lib/models";
import Image from "next/image";
import { useEffect } from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/config/Routes";
import { FormOwnerIndividual } from "@/components/common/Form/Auth/FormRegister/FormOwnerIndividual/FormOwnerIndividual";
import { TTypeOwnerBusiness } from "@/lib/models/common/auth/TTypeOwnerBusiness";
import { useRouter } from "next/navigation";

interface IProp extends IPageProps {
    searchParams: { type: TTypeOwnerBusiness };
}
export const RegisterOwnerScreen = ({ params, searchParams }: IProp) => {
    const router = useRouter()
    useEffect(() => {
        const header = document.querySelector("header");
        const footer = document.querySelector("footer");
        if (header && footer) {
            header.style.backgroundColor = "rgb(214, 219, 220, 0.5)";
            // footer.style.backgroundColor = "rgb(214, 219, 220, 0.2)";
            footer.style.display = "none";
        }
        return () => {
            if (header && footer) {
                footer.style.display = "";
                header.style.backgroundColor = "";
            }
        };
    }, []);
    return (
        <div className={layoutStyle.container}>
            <div className={style.groupButton}>
                <Link href={ROUTES.AUTH.REGISTER.OWNER("INDIVIDUAL")}>
                    <Button
                        className={style.groupButton_item}
                        text="Вы Физ лицо?"
                    />
                </Link>
                <Link href={ROUTES.AUTH.REGISTER.OWNER("SOLE_PROPRIETOR")}>
                    <Button
                        className={style.groupButton_item}
                        text="Вы индивидуальный предприниматель?"
                    />
                </Link>
                <Link href={ROUTES.AUTH.REGISTER.OWNER("LEGAL_ENTITY")}>
                    <Button
                        className={style.groupButton_item}
                        text="Вы юр лицо?"
                    />
                </Link>
            </div>
            <span style={{ color: "white" }}>формы пилим</span>
            <Image
                className={layoutStyle.backgroundImage}
                width={688}
                height={836}
                src={"/img/reg-img.png"}
                alt="img-reg"
            />
            <FormOwnerIndividual
                activeModal={searchParams.type === 'ind'}
                setActiveModal={() => router.back()}
            />
        </div>
    );
};
