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

import { TAgreementKey } from "@/lib/models/types/TAgreementKey";
import { useNotification } from "@/lib/context";
import {
    validAddressSchema,
    validDocumentFileSchema,
    validFullNameSchema,
    validPhoneSchema,
} from "@/lib/validationSchemas";
import { BusinessService } from "@/lib/Api/business/business.service";

import { useUser } from "@/lib/context/UserContext/UserContext";
import { useEffect, useState } from "react";
import { IPersonFront } from "@/lib/models/frontend/(person)/person.front";
import { PersonService } from "@/lib/Api/(Person)/person/person.service";
import { mockPersonId } from "@/asset/mockData/mockServerData";

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
    address: validAddressSchema,
    agreements: getAgreementsValidation(agreementKeys),
});

export const FormIndividual = () => {
    const notification = useNotification();
    const { user, setUser } = useUser();

    const businessService = new BusinessService();
    const personService = new PersonService();

    const [personData, setPersonData] = useState<IPersonFront>();

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchemaRegister),
    });

    useEffect(() => {
        personService.getPersonById(mockPersonId).then(async (person) => {
            if (person) {
                setPersonData(person);
            }
        });
    }, []);

    const onSubmit: SubmitHandler<TTypeForm> = async (formData) => {
        if (!user) {
            notification.error({ message: "нету пользователя" });
            return;
        }
        console.log("Form Data:", formData);
        const officialName = `${formData.fullName.surname} ${
            formData.fullName.name
        } ${formData.fullName.surname || ""}`;
        const createdBusiness = await businessService.createBusiness(
            {
                OfficialName: officialName,
                RegistrationDate: null,
                RegistrationNumber: null,
            },
            user.id
        );

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
                <div className={style.selectionBlock_content}>
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
                        error={errors.address?.postalCode?.message}
                        register={register("address.postalCode")}
                        titleSpan="Почтовый индекс"
                        type="text"
                    />
                </div>
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
