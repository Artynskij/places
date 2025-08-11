"use client";

import style from "./formLogin.module.scss";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

import { ROUTES } from "@/lib/config/Routes";
import { useNotification } from "@/lib/context";
import { useUser } from "@/lib/context/UserContext/UserContext";
import { PersonService } from "@/lib/Api/(Person)/person/person.service";
import { TTypeUser } from "@/lib/models/types";

import { InputForm } from "@/components/UI/Input/InputForm/InputForm";
import { Button } from "@/components/UI/Button/Button";
import { IconGoogle } from "@/components/common/Icons/IconGoogle/IconGoogle";
import { CONSTANT_SEARCH_PARAMS } from "@/asset/constants/SearchParamsConst";

interface IFormInputs {
    name?: string;
    email?: string;
    age?: number;
    password?: string;
    confirmPassword?: string;
}
const validationSchemaSignIn = Yup.object().shape({
    // name: Yup.string().required("Name is required"),

    email: Yup.string().email("Invalid email").required("Email is required"),

    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/(?=.*[0-9])/, "Password must contain a number"),
});

export const FormLogin = () => {
    const switcherDataUser: { title: string; value: TTypeUser }[] = [
        { title: "турист", value: "tourist" },
        { title: "владелец", value: "owner" },
    ];
    const router = useRouter();
    const searchParams = useSearchParams();
    const personService = new PersonService();

    const [activeUserType, setActiveUserType] = useState<TTypeUser | null>(
        null
    );
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchemaSignIn),
    });
    const t = useTranslations("AuthPage.text");
    const notification = useNotification();
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
    const { user, setUser } = useUser();
    const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
        console.log("Form Data:", data);
        const response = await personService.getPersonById(
            "01JZMZWTCTHYV5APEJKD6F74DF"
        );

        if (response && activeUserType) {
            setUser({ ...response, typeUser: activeUserType });
            notification.success({
                message: `добро пожаловать на Places Gold ${
                    response.personName?.name || response.nickname
                }`,
            });

            const redirect = searchParams.get(CONSTANT_SEARCH_PARAMS.REDIRECT);
           

            router.replace(
                redirect
                    ? redirect
                    : activeUserType === "owner"
                    ? ROUTES.PROFILE.OWNER
                    : ROUTES.PROFILE.TOURIST(response.nickname || "noNick")
            );
        } else {
            notification.error({ message: "нету пользователя" });
            return;
        }
    };

    const buttonForgotSpan = () => {
        const clickForgot = () => {
            notification.info({
                message: "Забыл что ли?",
            });
        };

        return (
            <span onClick={clickForgot} className={style.form_button_forgot}>
                {t("buttonForgot")}
            </span>
        );
    };
    return (
        <div className={style.container}>
            <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
                <div className={style.form_ctnTitle}>
                    <h3>{t("titleTextLog")}</h3>
                </div>
                <div className={style.switcher}>
                    {switcherDataUser.map((switcherItem) => {
                        const isActive = activeUserType === switcherItem.value;
                        return (
                            <button
                                type="button"
                                className={`${style.switcher_item} ${
                                    isActive ? style.switcher_item__active : ""
                                }`}
                                key={switcherItem.value}
                                onClick={() =>
                                    setActiveUserType(switcherItem.value)
                                }
                            >
                                <span>{switcherItem.title}</span>
                            </button>
                        );
                    })}
                </div>
                <div
                    onClick={() => {
                        if (!activeUserType) {
                            notification.info({
                                message:
                                    "Для начала выберете турист вы или владелец бизнеса.",
                            });
                        }
                    }}
                >
                    <div className={!activeUserType ? style.disable : ""}>
                        <div className={style.form_ctnInput}>
                            <InputForm
                                error={errors.email?.message}
                                register={register("email")}
                                id="email"
                                placeholder=""
                                titleSpan="Email"
                                type="email"
                                current="email"
                            />
                            <InputForm
                                error={errors.password?.message}
                                register={register("password")}
                                id="password"
                                placeholder=""
                                titleSpan={t("inputPassword") + "*"}
                                type="password"
                                titleNeighbor={buttonForgotSpan()}
                                current="current-password"
                            />
                        </div>

                        <div className={style.form_ctnButton}>
                            <Button
                                typeLogic="submit"
                                className={style.form_button_submit}
                                text={t("buttonLog")}
                            />
                            <div className={style.form_textOr}>или</div>
                            <Button
                                typeLogic="button"
                                onClick={() => console.log("goge")}
                                className={style.form_button_google}
                                icon={
                                    <IconGoogle
                                        className={
                                            style.form_button_google_icon
                                        }
                                    />
                                }
                                type="light"
                                text={t("buttonGoogleLog")}
                            />
                        </div>
                    </div>
                </div>
                <div className={style.form_footer}>
                    {t("footerTextLog")}{" "}
                    <Link
                        className={style.form_footer_link}
                        href={ROUTES.AUTH.REGISTER.REGISTER}
                    >
                        {t("buttonReg")}.
                    </Link>
                </div>
            </form>

            <Image
                className={style.image}
                width={688}
                height={836}
                src={"/img/reg-img.png"}
                alt="img-reg"
            />
        </div>
    );
};
