"use client";
import style from "./businessForm.module.scss";
import * as Yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { InputForm } from "@/components/UI/Input/InputForm/InputForm";
import { InputPhoneNumber } from "@/components/UI/Input/InputPhone/InputPhone";
import { Button } from "@/components/UI/Button/Button";
import { UploadButton } from "../../ButtonFunctional/UploadButton";

import {
    BlockAgreements,
    getAgreementsValidation,
} from "../../BlockFunctional/BlockAgreements";

import { TAgreementKey } from "@/lib/models/common/TAgreementKey";
import { useNotification } from "@/lib/context";
import {
    validDocumentFileSchema,
    validFullNameSchema,
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
    fullName: validFullNameSchema,

    email: Yup.string()
        .email("Неккоректный адрес электронной почты")
        .required("Адрес электронной почты обязателен"),
    phone: validPhoneSchema,
    documents: Yup.array()
        .of(validDocumentFileSchema)
        .min(1, "Необходимо загрузить хотя бы один документ")
        .max(10, "Можно загрузить не более 10 документов"),
    address: Yup.object().shape({
        country: Yup.string().required("Страна обязательна"),
        district: Yup.string().required("Область обязательна"),
        town: Yup.string().required("Город обязателен"),
        addressLine: Yup.string().required("Адрес обязателен"),
        mailIndex: Yup.string(),
    }),
    agreements: getAgreementsValidation(agreementKeys),
    // age: Yup.number()
    //   .positive("Age must be positive")
    //   .integer("Age must be an integer")
    //   .required("Age is required"),
});

export const FormIndividual = () => {
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
            fullName: {
                name: "",
                secondName: "",
                surname: "",
            },
            email: "",
            phone: "",
            documents: [],
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

    // const agreementValues = ;

    return (
        <form
            className={style.form}
            onSubmit={handleSubmit(onSubmit, onSubmitInvalid)}
        >
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
                    <InputPhoneNumber
                        field={field}
                        error={fieldState.error || null}
                        titleSpam="Номер телефона*"
                    />
                )}
            />

            <Controller
                name="documents"
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
            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>
                    Адрес регистрации
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
