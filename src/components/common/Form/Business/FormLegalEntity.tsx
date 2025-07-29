"use client";
import { InputForm } from "@/components/UI/Input/InputForm/InputForm";
import style from "./businessForm.module.scss";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { InputPhoneNumber } from "@/components/UI/Input/InputPhone/InputPhone";
import { Button } from "@/components/UI/Button/Button";
import { UploadButton } from "../../ButtonFunctional/UploadButton";

import {
    BlockAgreements,
    getAgreementsValidation,
} from "../../BlockFunctional/BlockAgreements";
import { TAgreementKey } from "@/lib/models/types/TAgreementKey";
import { useNotification } from "@/lib/context";
import { InputDate } from "@/components/UI/Input/InputDate/InputDate";
import {
    validAddressSchema,
    validDateSchema,
    validDocumentFileSchema,
    validFullNameSchema,
    validPhoneSchema,
} from "@/lib/validationSchemas";

type TTypeForm = Yup.InferType<typeof validationSchemaRegister>;
const agreementKeys: TAgreementKey[] = [
    "ConfirmedHonesty",
    "ConfirmedLegalBusiness",
    "AcceptedTerms",
    "AgreedMarketing",
    "AgreedReviewsNotification",
];
const validationSchemaRegister = Yup.object().shape({
    nameOrganization: Yup.string().required(
        "Название Индивидуального предпринимателя обязатиельно"
    ),
    // secondName: Yup.string(),

    numberOrganization: Yup.string().required(
        "Индивидуальный регистрационный номер обязательно"
    ),
    date: validDateSchema.required("дата обязательна"),
    emailOrganization: Yup.string()
        .email("Неккоректный адрес электронной почты")
        .required("Адрес электронной почты обязателен"),
    phoneOrganization: validPhoneSchema,
    documentsOrganization: Yup.array()
        .of(validDocumentFileSchema)
        // .min(1, "Необходимо загрузить хотя бы один документ")
        .max(10, "Можно загрузить не более 10 документов"),
    addressOrganization: validAddressSchema,
    personData: Yup.object().shape({
        jobTitle: Yup.string().required("Должность обязательна"),
        fullName: validFullNameSchema,
        documentsPerson: Yup.array()
            .of(validDocumentFileSchema)
            .min(1, "Необходимо загрузить хотя бы один документ")
            .max(10, "Можно загрузить не более 10 документов"),
        emailPerson: Yup.string()
            .email("Неккоректный адрес электронной почты")
            .required("Адрес электронной почты обязателен"),
        phonePerson: validPhoneSchema,
    }),
    agreements: getAgreementsValidation(agreementKeys),
});

export const FormLegalEntity = () => {
    const notification = useNotification();
    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchemaRegister),
        defaultValues: {
            documentsOrganization: [],
            date: "",
            personData: {
                documentsPerson: [],
            },
            agreements: [],
        },
    });
    const onSubmit: SubmitHandler<TTypeForm> = (data) => {
        console.log("Form Data:", data);
        notification.success({ message: "Бизнес отправлен на модерацию" });
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
                error={errors.nameOrganization?.message}
                register={register("nameOrganization")}
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
                name="documentsOrganization"
                control={control}
                defaultValue={[]}
                render={({ field, fieldState }) => (
                    <UploadButton
                        titleSpan="Прикрепление подтверждающих документов "
                        accept="doc"
                        maxSizeMB={10}
                        maxCount={10}
                        value={field.value}
                        onChange={field.onChange}
                        error={fieldState.error || null}
                    />
                )}
            />

            <Controller
                name="date"
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
                error={errors.emailOrganization?.message}
                register={register("emailOrganization")}
                placeholder="Адрес электронной почты компании"
                titleSpan="Адрес электронной почты"
                type="email"
            />

            <Controller
                control={control}
                name="phoneOrganization"
                render={({ field, fieldState }) => (
                    <InputPhoneNumber<"phoneOrganization">
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
                    error={errors.addressOrganization?.country?.message}
                    register={register("addressOrganization.country")}
                    titleSpan="Страна*"
                    type="text"
                />
                <InputForm
                    error={errors.addressOrganization?.district?.message}
                    register={register("addressOrganization.district")}
                    titleSpan="Область*"
                    type="text"
                />
                <InputForm
                    error={errors.addressOrganization?.town?.message}
                    register={register("addressOrganization.town")}
                    titleSpan="Город*"
                    type="text"
                />
                <InputForm
                    error={errors.addressOrganization?.addressLine?.message}
                    register={register("addressOrganization.addressLine")}
                    titleSpan="Адрес – улица, дом, корпус, квартира/офис*"
                    type="text"
                />
                <InputForm
                    error={errors.addressOrganization?.postalCode?.message}
                    register={register("addressOrganization.postalCode")}
                    titleSpan="Почтовый индекс"
                    type="text"
                />
            </div>
            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>
                    Личные данные законного представителя
                </div>
                <InputForm
                    error={errors.personData?.jobTitle?.message}
                    register={register("personData.jobTitle")}
                    titleSpan="Должность законного представителя*"
                    type="text"
                />
                <InputForm
                    error={errors.personData?.fullName?.name?.message}
                    register={register("personData.fullName.name")}
                    titleSpan="Имя*"
                    type="text"
                />
                <InputForm
                    error={errors.personData?.fullName?.secondName?.message}
                    register={register("personData.fullName.secondName")}
                    titleSpan="Отчество"
                    type="text"
                />
                <InputForm
                    error={errors.personData?.fullName?.surname?.message}
                    register={register("personData.fullName.surname")}
                    titleSpan="Фамилия*"
                    type="text"
                />
                <Controller
                    name="personData.documentsPerson"
                    control={control}
                    defaultValue={[]}
                    render={({ field, fieldState }) => (
                        <UploadButton
                            titleSpan="Прикрепление подтверждающих документов*"
                            accept="doc"
                            maxSizeMB={10}
                            maxCount={10}
                            value={field.value}
                            onChange={field.onChange}
                            error={fieldState.error || null}
                        />
                    )}
                />
                <InputForm
                    error={errors.personData?.emailPerson?.message}
                    register={register("personData.emailPerson")}
                    placeholder="Адрес электронной почты"
                    titleSpan="Адрес электронной почты"
                    type="email"
                />
                <Controller
                    control={control}
                    name="personData.phonePerson"
                    render={({ field, fieldState }) => (
                        <InputPhoneNumber
                            field={field}
                            error={fieldState.error || null}
                            titleSpam="Номер телефона*"
                        />
                    )}
                />
            </div>
            <BlockAgreements
                agreementKeys={agreementKeys}
                value={watch("agreements") as string[]}
                onChange={(vals) => setValue("agreements", vals)}
                error={errors.agreements?.message}
            />
            <Button typeLogic="submit" text={"Зарегистрировать"} />
        </form>
    );
};
