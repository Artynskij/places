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
import { TAgreementKey } from "@/lib/models/common/TAgreementKey";
import { useNotification } from "@/lib/context";
import { InputDate } from "@/components/UI/Input/InputDate/InputDate";
import {
    validAddressSchema,
    validDateSchema,
    validDocumentFileSchema,
    validPhoneSchema,
} from "@/lib/validationSchemas";

type TTypeForm = Yup.InferType<typeof validationSchemaRegister>;
const agreementKeys: TAgreementKey[] = [
    "ConfirmedLegalPerson",
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
    date: validDateSchema,
    emailOrganization: Yup.string()
        .email("Неккоректный адрес электронной почты")
        .required("Адрес электронной почты обязателен"),
    phone: validPhoneSchema,
    documentsOrganization: Yup.array()
        .of(validDocumentFileSchema)
        // .min(1, "Необходимо загрузить хотя бы один документ")
        .max(10, "Можно загрузить не более 10 документов"),
    address: validAddressSchema,
    agreements: getAgreementsValidation(agreementKeys),
});

export const FormSoleProprietor = () => {
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
            nameOrganization: "",
            numberOrganization: "",
            date: "",
            emailOrganization: "",
            phone: "",
            documentsOrganization: [],
            address: {
                country: "",
                district: "",
                town: "",
                addressLine: "",
                mailIndex: "",
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
                placeholder="Название Индивидуального предпринимателя"
                titleSpan="Официальное название Индивидуального предпринимателя*"
                type="text"
            />
            {/* <InputForm
                error={errors.secondName?.message}
                register={register("secondName")}
                placeholder="	Индивидуальный регистрационный номер"
                titleSpan="Второе имя (отчество) согласно удостоверению личности"
                type="text"
            /> */}
            <InputForm
                error={errors.numberOrganization?.message}
                register={register("numberOrganization")}
                placeholder="Индивидуальный регистрационный номер"
                titleSpan="Индивидуальный регистрационный номер*"
                type="text"
            />
            <Controller
                name="date"
                control={control}
                render={({ field, fieldState }) => (
                    <InputDate
                        titleSpan="Дата регистрации: ДД.ММ.ГГГГ*"
                        value={field.value}
                        onChange={field.onChange}
                        error={fieldState.error?.message}
                    />
                )}
            />
            {/* <InputDate titleSpan="Дата регистрации" onChange={() => {}} /> */}
            <Controller
                name="documentsOrganization"
                control={control}
                defaultValue={[]}
                render={({ field, fieldState }) => (
                    <UploadButton
                        titleSpan="Прикрепление подтверждающих документов"
                        accept=".pdf,.doc,.docx,.txt"
                        maxSizeMB={10}
                        maxCount={10}
                        value={field.value}
                        onChange={field.onChange}
                        error={fieldState.error || null}
                    />
                )}
            />
            <InputForm
                error={errors.emailOrganization?.message}
                register={register("emailOrganization")}
                placeholder="Адрес электронной почты"
                titleSpan="Адрес электронной почты"
                type="email"
            />

            <Controller
                control={control}
                name="phone"
                render={({ field, fieldState }) => (
                    <InputPhoneNumber
                        field={field}
                        error={fieldState.error || null}
                        titleSpam="Номер телефона организации*"
                    />
                )}
            />

            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>
                    Основное местонахождение владельца бизнеса
                </div>

                <InputForm
                    error={errors.address?.country?.message}
                    register={register("address.country")}
                    titleSpan="Страна*"
                    type="text"
                />
                <InputForm
                    error={errors.address?.district?.message}
                    register={register("address.district")}
                    titleSpan="Область*"
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
                    error={errors.address?.mailIndex?.message}
                    register={register("address.mailIndex")}
                    titleSpan="Почтовый индекс"
                    type="text"
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
