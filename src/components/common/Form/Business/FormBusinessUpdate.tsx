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

import { useUser } from "@/lib/context/UserContext/UserContext";
import { useLocale } from "next-intl";
import { GeneralBusinessService } from "@/lib/Api/(MainService)/business.general";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/config/Routes";
import { CONSTANT_TABS } from "@/asset/constants/switcherTabsPage";
import { useEffect, useState } from "react";
import { BusinessService } from "@/lib/Api/business/business.service";
import { IBusinessFront } from "@/lib/models";
import { getFormatDate } from "@/lib/helpers/getFormatDate";
import { getObjectDiffWithNulls } from "@/lib/helpers/getChangedFieldsForApi";
import { validationUpdateBusinessSchema } from "@/lib/validationSchemas/business/updateBusiness.schema";

type TTypeForm = Yup.InferType<typeof validationUpdateBusinessSchema>;

interface IProp {
    businessId: string;
}
export const FormBusinessUpdate = ({ businessId }: IProp) => {
    const generalBusinessService = new GeneralBusinessService();
    const businessService = new BusinessService();

    const notification = useNotification();
    const { user } = useUser();
    const locale = useLocale();
    const router = useRouter();

    const [dataBusiness, setDataBusiness] = useState<IBusinessFront>();
    const [initialFormData, setInitialFormData] = useState<TTypeForm>();

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationUpdateBusinessSchema),
        defaultValues: {
            legalType: "",
            officialName: "",
            dateRegister: "",
            numberOrganization: "",
            email: "",
            phone: "",
            address: {
                addressLine: "",
                country: "",
                town: "",
                postalCode: "",
            },
            documentsVerify: [],
        },
    });

    useEffect(() => {
        businessService.getBusinessById(businessId, locale).then((business) => {
            if (!business) return business;
            setDataBusiness(business);
            const formData: TTypeForm = {
                legalType: business.LegalType.Id,
                officialName: business.OfficialName,
                dateRegister: business.RegistrationDate
                    ? getFormatDate(business.RegistrationDate)
                    : "",
                numberOrganization: business.RegistrationNumber || "",
                email: business.Contacts?.Email || "",
                phone: business.Contacts?.Phone || "",
                address: {
                    addressLine: business.Contacts?.Address?.Street || "",
                    country: business.Contacts?.Address?.Country || "",
                    town: business.Contacts?.Address?.Town || "",
                    postalCode: business.Contacts?.Address?.PostalCode || "",
                },

                documentsVerify: [],
            };
            setInitialFormData(formData);
            reset(formData);
        });
    }, []);

    const onSubmit: SubmitHandler<TTypeForm> = async (formData) => {
        if (!initialFormData) {
            notification.error({
                message: "не найден изначальные данные формы",
            });
            return;
        }
        if (!user) {
            notification.error({ message: "нету пользователя" });
            return;
        }
        if (!dataBusiness) {
            notification.error({ message: "не найден бизнес" });
            return;
        }

        const success = await generalBusinessService.update({
            initialForm: initialFormData,
            formData: formData,
            locale: locale,
            business: dataBusiness,
        });
        if (success) {
            notification.success({ message: "Бизнес отправлен на модерацию" });
            router.push(
                ROUTES.PROFILE.OWNER(user.id, CONSTANT_TABS.owner.business)
            );
        } else {
            notification.error({
                message: "Нету изменений",
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
            {/* <BlockAgreements
                agreementKeys={agreementKeysBusinessLegalEntity}
                value={watch("agreements") as string[]}
                onChange={(vals) => setValue("agreements", vals)}
                error={errors.agreements?.message}
            /> */}
            <Button typeLogic="submit" text={"Обновить"} />
        </form>
    );
};
