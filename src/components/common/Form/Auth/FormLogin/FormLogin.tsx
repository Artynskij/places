"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import style from "./formLogin.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { useTranslations } from "next-intl";
import { InputForm } from "@/components/UI/Input/InputForm/InputForm";
import { Button } from "@/components/UI/Button/Button";
import { IconGoogle } from "@/components/common/Icons/IconGoogle/IconGoogle";
import { useAlertMessage, useNotification } from "@/lib/context";

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
    // age: Yup.number()
    //   .positive("Age must be positive")
    //   .integer("Age must be an integer")
    //   .required("Age is required"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/(?=.*[0-9])/, "Password must contain a number"),
    // confirmPassword: Yup.string()
    //   .oneOf([Yup.ref("password")], "Passwords must match")
    //   .required("Confirm Password is required"),
});

export const FormLogin = () => {
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

    const onSubmit: SubmitHandler<IFormInputs> = (data) => {
        console.log("Form Data:", data);
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

                <div className={style.form_ctnInput}>
                    <InputForm
                        error={errors.email?.message}
                        register={register("email")}
                        id="email"
                        placeholder=""
                        titleSpan="Email"
                        type="email"
                    />
                    <InputForm
                        error={errors.password?.message}
                        register={register("password")}
                        id="password"
                        placeholder=""
                        titleSpan={t("inputPassword") + "*"}
                        type="password"
                        titleNeighbor={buttonForgotSpan()}
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
                                className={style.form_button_google_icon}
                            />
                        }
                        type="light"
                        text={t("buttonGoogleLog")}
                    />
                </div>
                <div className={style.form_footer}>
                    {t("footerTextLog")}{" "}
                    <Link className={style.form_footer_link} href={"/register"}>
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
