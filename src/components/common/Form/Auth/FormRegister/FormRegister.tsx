"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import style from "./formRegister.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { useTranslations } from "next-intl";
import { Button } from "@/components/UI/Button/Button";
import { IconGoogle } from "@/components/common/Icons/IconGoogle/IconGoogle";
import { InputForm } from "@/components/UI/Input/InputForm/InputForm";
import { Switcher } from "@/components/common/Switcher/Switcher";
import { useNotification } from "@/lib/context";
import { ContactsPersonService } from "@/lib/Api/(Person)/contactPerson.api";
import { PersonService } from "@/lib/Api/(Person)/person/person.service";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/config/Routes";
type TTypeForm = Yup.InferType<typeof validationSchemaRegister>;

const validationSchemaRegister = Yup.object().shape({
    nickname: Yup.string().required("Nickname is required"),

    email: Yup.string().email("Invalid email").required("Email is required"),

    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/(?=.*[0-9])/, "Password must contain a number"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
});

export const FormRegister = () => {
    const router = useRouter();
    const notification = useNotification();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchemaRegister),
    });
    const t = useTranslations("AuthPage.text");
    const personService = new PersonService();
    const contactsPersonService = new ContactsPersonService();
    useEffect(() => {
        const header = document.querySelector("header");
        const footer = document.querySelector("footer");
        if (header && footer) {
            header.style.backgroundColor = "rgb(214, 219, 220, 0.5)";

            footer.style.display = "none";
        }
        return () => {
            if (header && footer) {
                footer.style.display = "";
                header.style.backgroundColor = "";
            }
        };
    }, []);

    const onSubmit: SubmitHandler<TTypeForm> = async (dataForm) => {
        console.log("Form Data:", dataForm);
        const createdContact = await contactsPersonService.create({
            source: { Email: dataForm.email },
        });
        if (!createdContact) {
            notification.error({
                message: "Такая почта у нас уже зарегистрирована",
            });
            return;
        }
        const createdPerson = await personService.create({
            source: {
                Nickname: dataForm.nickname,
                Contacts: createdContact.id,
            },
        });
        if (!createdPerson) {
            notification.error({
                message: "Что-то пошло не так при создании пользователя",
            });
            return;
        }
        console.log(createdPerson);
        notification.success({ message: "Теперь можете войти" });
        router.push(ROUTES.AUTH.LOGIN);
    };
    const onSubmitInvalid = () => {
        notification.error({
            message: "Пожалуйста, заполните обязательные поля",
        });
    };
    return (
        <div className={style.container}>
            <form
                onSubmit={handleSubmit(onSubmit, onSubmitInvalid)}
                className={style.form}
            >
                <div className={style.form_ctnTitle}>
                    <h3>{t("titleTextReg")}</h3>
                </div>
                {/* <div className={style.switcher}>
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
                </div> */}
                {/* <div
                    onClick={() => {
                        if (!activeUserType) {
                            notification.info({
                                message: "Для начала выберете турист вы или владелец бизнеса.",
                            });
                        }
                    }}
                > */}
                {/* <div className={!activeUserType ? style.disable : ""}> */}
                <Button
                    typeLogic="button"
                    onClick={() => console.log("goge")}
                    className={style.form_button_google}
                    icon={
                        <IconGoogle className={style.form_button_google_icon} />
                    }
                    type="light"
                    text={t("buttonGoogleReg")}
                />
                {/* <div className={style.form_textOr}>или</div> */}
                <div className={style.form_ctnInput}>
                    <InputForm
                        error={errors.nickname?.message}
                        register={register("nickname")}
                        id="nickname"
                        placeholder=""
                        titleSpan={t("inputName")}
                        type="text"
                    />
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
                        titleSpan={t("inputPassword") + " *"}
                        type="password"
                        // titleNeighbor={buttonForgotSpan()}
                    />
                    <InputForm
                        error={errors.confirmPassword?.message}
                        register={register("confirmPassword")}
                        id="passwordConfirm"
                        placeholder=""
                        titleSpan={t("inputConfirmPassword") + " *"}
                        type="password"
                        // titleNeighbor={buttonForgotSpan()}
                    />
                </div>

                <Button
                    typeLogic="submit"
                    className={style.form_button_submit}
                    text={t("buttonReg")}
                />
                {/* </div> */}
                {/* </div> */}

                <div className={style.form_footer}>
                    {t("footerTextReg")}{" "}
                    <Link className={style.form_footer_link} href={"/login"}>
                        {t("buttonLog")}.
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

// const buttonForgotSpan = () => {
//   const clickForgot = () => {
//     alert("forgot");
//   };

//   return (
//     <span onClick={clickForgot} className={style.form_button_forgot}>
//       Forgot your password?
//     </span>
//   );
// };
