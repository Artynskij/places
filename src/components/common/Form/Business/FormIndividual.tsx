"use client";
import { InputForm } from "@/components/UI/Input/InputForm/InputForm";
import style from "./businessForm.module.scss";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { InputPhoneNumber } from "@/components/UI/Input/InputPhone/InputPhone";
import { Button } from "@/components/UI/Button/Button";
import { UploadButton } from "../../ButtonFunctional/UploadButton";
import { BlockSelectAddress } from "../../BlockFunctional/BlockSelectAddress";

type TTypeForm = Yup.InferType<typeof validationSchemaRegister>;
const validationSchemaRegister = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    secondName: Yup.string().required("secondName is required"),
    surname: Yup.string().required("surname is required"),

    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
        .required("Номер телефона обязателен")
        .matches(/^\+?[0-9]{10,15}$/, "Некорректный формат номера"),
    documents: Yup.array()
        .of(
            Yup.mixed<File>()
                .test("fileType", "Неверный формат файла", (file) => {
                    if (!file) return false;
                    const validTypes = [
                        "application/pdf",
                        "application/msword",
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                        "text/plain",
                    ];
                    return validTypes.includes(file.type);
                })
                .test("fileSize", "Файл слишком большой", (file) => {
                    if (!file) return false;
                    return file.size <= 10 * 1024 * 1024; // 10MB
                })
        )
        .min(1, "Необходимо загрузить хотя бы один документ")
        .max(10, "Можно загрузить не более 10 документов"),
    address: Yup.object().shape({
        country: Yup.string().required("Страна обязательна"),
        district: Yup.string().required("Область обязательна"),
        town: Yup.string().required("Город обязателен"),
        addressLine: Yup.string().required("Адрес обязателен"),
        mailIndex: Yup.number(),
    }),
    // age: Yup.number()
    //   .positive("Age must be positive")
    //   .integer("Age must be an integer")
    //   .required("Age is required"),
});

export const FormIndividual = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchemaRegister),
    });
    const onSubmit: SubmitHandler<TTypeForm> = (data) => {
        console.log("Form Data:", data);
    };
    return (
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
            <InputForm
                error={errors.name?.message}
                register={register("name")}
                placeholder="Имя"
                titleSpan="Имя согласно удостоверению личности"
                type="text"
            />
            <InputForm
                error={errors.secondName?.message}
                register={register("secondName")}
                placeholder="Второе имя"
                titleSpan="Второе имя (отчество) согласно удостоверению личности"
                type="text"
            />
            <InputForm
                error={errors.surname?.message}
                register={register("surname")}
                placeholder="Фамилия"
                titleSpan="Фамилия согласно удостоверению личности*"
                type="text"
            />
            <InputForm
                error={errors.email?.message}
                register={register("email")}
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
                    />
                )}
            />

            <Controller
                name="documents"
                control={control}
                defaultValue={[]}
                render={({ field, fieldState }) => (
                    <UploadButton
                        accept=".pdf,.doc,.docx,.txt"
                        maxSizeMB={10}
                        maxCount={10}
                        value={field.value}
                        onChange={field.onChange}
                        error={fieldState.error || null}
                    />
                )}
            />
            <div className={style.blockAddress}>
                <div className={style.blockAddress_title}>
                    Адрес регистрации
                </div>
                <div className={style.blockAddress_content}>
                    <InputForm
                        error={errors.address?.country?.message}
                        register={register("address.country")}
                        titleSpan="Страна"
                        type="text"
                    />
                    <InputForm
                        error={errors.address?.district?.message}
                        register={register("address.district")}
                        titleSpan="Область"
                        type="text"
                    />
                    <InputForm
                        error={errors.address?.town?.message}
                        register={register("address.town")}
                        titleSpan="Город"
                        type="text"
                    />
                    <InputForm
                        error={errors.address?.addressLine?.message}
                        register={register("address.addressLine")}
                        titleSpan="Адрес – улица, дом, корпус, квартира/офис"
                        type="text"
                    />
                    <InputForm
                        error={errors.address?.mailIndex?.message}
                        register={register("address.mailIndex")}
                        titleSpan="Почтовый индекс"
                        type="text"
                    />
                </div>
            </div>
            {/* <BlockSelectAddress /> */}
            <Button typeLogic="submit" text={"Зарегистрироваться"} />
        </form>
    );
};
