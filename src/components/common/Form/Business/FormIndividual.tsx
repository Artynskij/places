"use client";
import style from "./businessForm.module.scss";
import * as Yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { InputForm } from "@/components/UI/Input/InputForm/InputForm";
import { InputPhoneNumber } from "@/components/UI/Input/InputPhone/InputPhone";
import { Button } from "@/components/UI/Button/Button";
import { UploadButton } from "../../ButtonFunctional/UploadButton";

import { BlockAgreements } from "../../BlockFunctional/BlockAgreements";

import { useNotification } from "@/lib/context";

import { useUser } from "@/lib/context/UserContext/UserContext";
import { useEffect } from "react";

import { useLocale } from "next-intl";
import { GeneralBusinessService } from "@/lib/Api/(MainService)/business.general";
import { validationBusinessIndividualSchema } from "@/lib/validationSchemas/business/individual.schema";
import { agreementKeysBusinessIndividual } from "@/asset/constants/agreementsKeys";

import { ROUTES } from "@/lib/config/Routes";
import { useRouter } from "next/navigation";
import { CONSTANT_TABS } from "@/asset/constants/switcherTabsPage";

type TTypeForm = Yup.InferType<typeof validationBusinessIndividualSchema>;

interface IProp {
    activeTab: string;
}
export const FormIndividual = ({ activeTab }: IProp) => {
    const notification = useNotification();
    const { user } = useUser();
    const locale = useLocale();
    const router = useRouter();
    const generalBusinessService = new GeneralBusinessService();

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationBusinessIndividualSchema),
    });

    useEffect(() => {}, []);

    const onSubmit: SubmitHandler<TTypeForm> = async (formData) => {
        if (!user) {
            notification.error({ message: "нету пользователя" });
            return;
        }

        const success = await generalBusinessService.create({
            formData: {
                officialName: `${formData.fullName.surname} ${
                    formData.fullName.name
                } ${formData.fullName.secondName || ""}`,
                dateRegister: null,
                numberOrganization: null,
                email: formData.email,
                phone: formData.phone,
                address: {
                    country: formData.address.country,
                    town: formData.address.town,
                    addressLine: formData.address.addressLine,
                    postalCode: formData.address.postalCode || null,
                },
                agreements: formData.agreements || null,
                documentsVerify: formData.documentsVerify || null,
            },
            activeTab: activeTab,

            userId: user.id,
            locale: locale,
        });
        if (success) {
            notification.success({ message: "Бизнес отправлен на модерацию" });
            router.push(ROUTES.PROFILE.OWNER(user.id, CONSTANT_TABS.owner.business));
        } else {
            notification.error({
                message:
                    "Произошла ошибка при создании бизнеса. Технические неполадки",
            });
        }
    };
    const onSubmitInvalid = () => {
        notification.error({
            message: "Пожалуйста, заполните обязательные поля",
        });
    };

    return (
        <form
            className={style.form}
            onSubmit={handleSubmit(onSubmit, onSubmitInvalid)}
        >
            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>ФИО</div>
                <div className={style.selectionBlock_content}>
                    <InputForm
                        error={errors.fullName?.name?.message}
                        register={register("fullName.name")}
                        placeholder="Имя*"
                        titleSpan="Имя согласно удостоверению личности"
                        type="text"
                    />
                    <InputForm
                        error={errors.fullName?.secondName?.message}
                        register={register("fullName.secondName")}
                        placeholder="Второе имя"
                        titleSpan="Второе имя (отчество) согласно удостоверению личности"
                        type="text"
                    />
                    <InputForm
                        error={errors.fullName?.surname?.message}
                        register={register("fullName.surname")}
                        placeholder="Фамилия*"
                        titleSpan="Фамилия согласно удостоверению личности*"
                        type="text"
                    />
                </div>
            </div>

            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>Контакты</div>
                <div className={style.selectionBlock_content}>
                    <InputForm
                        error={errors.email?.message}
                        register={register("email")}
                        placeholder="Адрес электронной почты*"
                        titleSpan="Адрес электронной почты"
                        type="email"
                    />

                    <Controller
                        control={control}
                        name="phone"
                        render={({ field, fieldState }) => (
                            <InputPhoneNumber<"phone">
                                field={field}
                                error={fieldState.error || null}
                                titleSpam="Номер телефона*"
                            />
                        )}
                    />
                </div>
            </div>

            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>
                    Адрес регистрации
                </div>
                <div className={style.selectionBlock_content}>
                    <InputForm
                        error={errors.address?.country?.message}
                        register={register("address.country")}
                        titleSpan="Страна*"
                        type="text"
                    />
                    <InputForm
                        error={errors.address?.town?.message}
                        register={register("address.town")}
                        titleSpan="Город*"
                        type="text"
                    />
                    <InputForm
                        error={errors.address?.addressLine?.message}
                        register={register("address.addressLine")}
                        titleSpan="Адрес – улица, дом, корпус, квартира/офис*"
                        type="text"
                    />
                    <InputForm
                        error={errors.address?.postalCode?.message}
                        register={register("address.postalCode")}
                        titleSpan="Почтовый индекс"
                        type="text"
                    />
                </div>
            </div>
            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>
                    Документы подтверждающие личность
                </div>
                <div className={style.selectionBlock_content}>
                    <Controller
                        name="documentsVerify"
                        control={control}
                        defaultValue={[]}
                        render={({ field, fieldState }) => (
                            <UploadButton
                                titleSpan="Прикрепление подтверждающих документов*"
                                accept="image"
                                maxSizeMB={10}
                                maxCount={10}
                                value={field.value}
                                onChange={field.onChange}
                                error={fieldState.error || null}
                            />
                        )}
                    />
                </div>
            </div>
            <BlockAgreements
                agreementKeys={agreementKeysBusinessIndividual}
                value={watch("agreements") as string[]}
                onChange={(vals) => setValue("agreements", vals)}
                error={errors.agreements?.message}
            />
            <Button
                className={style.buttonAccept}
                typeLogic="submit"
                text={"Зарегистрировать"}
            />
        </form>
    );
};
