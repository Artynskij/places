"use client";
import { InputForm } from "@/components/UI/Input/InputForm/InputForm";
import style from "./businessForm.module.scss";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { InputPhoneNumber } from "@/components/UI/Input/InputPhone/InputPhone";
import { Button } from "@/components/UI/Button/Button";
import { UploadButton } from "../../ButtonFunctional/UploadButton";

import { BlockAgreements } from "../../BlockFunctional/BlockAgreements";

import { useNotification } from "@/lib/context";
import { InputDate } from "@/components/UI/Input/InputDate/InputDate";

import { agreementKeysBusinessLegalEntity } from "@/asset/constants/agreementsKeys";
import { validationBusinessLegalEntitySchema } from "@/lib/validationSchemas/business/legalEntity.schema";
import { useUser } from "@/lib/context/UserContext/UserContext";
import { useLocale } from "next-intl";
import { GeneralBusinessService } from "@/lib/Api/(MainService)/business.general";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/config/Routes";
import { CONSTANT_TABS } from "@/asset/constants/switcherTabsPage";

type TTypeForm = Yup.InferType<typeof validationBusinessLegalEntitySchema>;

interface IProp {
    activeTab: string;
}
export const FormLegalEntity = ({ activeTab }: IProp) => {
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
        resolver: yupResolver(validationBusinessLegalEntitySchema),
        defaultValues: {
            documentsVerify: [],

            agreements: [],
        },
    });
    const onSubmit: SubmitHandler<TTypeForm> = async (formData) => {
        if (!user) {
            notification.error({ message: "нету пользователя" });
            return;
        }
        const success = await generalBusinessService.create({
            formData: {
                officialName: formData.officialName,
                dateRegister: formData.dateRegister,
                numberOrganization: formData.numberOrganization,
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
            <InputForm
                error={errors.officialName?.message}
                register={register("officialName")}
                placeholder="Наименование юридического лица"
                titleSpan="Наименование юридического лица*"
                type="text"
            />

            <InputForm
                error={errors.numberOrganization?.message}
                register={register("numberOrganization")}
                placeholder="Индивидуальный регистрационный номер юридического лица"
                titleSpan="Индивидуальный регистрационный номер*"
                type="text"
            />

            <Controller
                name="dateRegister"
                control={control}
                render={({ field, fieldState }) => (
                    <InputDate
                        titleSpan="Дата регистрации юридического лица: ДД.ММ.ГГГГ*"
                        value={field.value}
                        onChange={field.onChange}
                        error={fieldState.error?.message}
                    />
                )}
            />
            <InputForm
                error={errors.email?.message}
                register={register("email")}
                placeholder="Адрес электронной почты компании"
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
                        titleSpam="Номер телефона организации"
                    />
                )}
            />

            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>
                    Юридический адрес компании
                </div>

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

            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>
                    Документы подтверждающие владение бизнесом
                </div>
                <div className={style.selectionBlock_content}>
                    <Controller
                        name="documentsVerify"
                        control={control}
                        defaultValue={[]}
                        render={({ field, fieldState }) => (
                            <UploadButton
                                titleSpan="Прикрепление подтверждающих документов"
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
                agreementKeys={agreementKeysBusinessLegalEntity}
                value={watch("agreements") as string[]}
                onChange={(vals) => setValue("agreements", vals)}
                error={errors.agreements?.message}
            />
            <Button typeLogic="submit" text={"Зарегистрировать"} />
        </form>
    );
};
