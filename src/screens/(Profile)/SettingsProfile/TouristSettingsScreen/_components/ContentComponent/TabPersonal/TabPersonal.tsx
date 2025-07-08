import style from "../contentComponent.module.scss";

import * as Yup from "yup";

import { useNotification } from "@/lib/context";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import {
    validAddressSchema,
    validFullNameSchema,
    validPhoneSchema,
} from "@/lib/validationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputForm } from "@/components/UI/Input/InputForm/InputForm";
import { InputPhoneNumber } from "@/components/UI/Input/InputPhone/InputPhone";
import { Button } from "@/components/UI/Button/Button";
import { TSocialNetworks } from "@/lib/models/common/TSocialNetworks";
import { SelectCustom } from "@/components/UI/SelectCustom/SelectCustom";
import { ISelectOption } from "@/lib/models";
import { useState } from "react";
import { IconDelete } from "@/components/common/Icons";
import { DeleteButton } from "@/components/common/ButtonFunctional/DeleteButton";
import { UploadButton } from "@/components/common/ButtonFunctional/UploadButton";
import { validImageFileSchema } from "@/lib/validationSchemas/imageArraySchema";

type TTypeForm = Yup.InferType<typeof validationSchema>;
const allSocials: TSocialNetworks[] = [
    "web",
    "telegram",
    "viber",
    "vk",
    "linkedin",
    "instagram",
    "ok",
    "x",
    "rutube",
    "youtube",
    "tiktok",
    "threads",
];
const validationSchema = Yup.object().shape({
    fullName: validFullNameSchema,
    email: Yup.string().email("Невалидный email").required("Email обязателен"),
    phone: validPhoneSchema,
    address: validAddressSchema,
    socialNetworks: Yup.array().of(
        Yup.object({
            type: Yup.mixed<TSocialNetworks>()
                .oneOf(allSocials)
                .required("Тип обязателен"),
            url: Yup.string().url("Невалидный URL").required("Введите ссылку"),
        })
    ),
    avatar: Yup.array()
        .of(validImageFileSchema)
        .max(3, "Можно загрузить не более 3 фоток"),
});
const TabPersonal = () => {
    const notification = useNotification();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<TTypeForm>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            fullName: { name: "", secondName: "", surname: "" },
            email: "",
            phone: "",
            address: {
                addressLine: "",
                country: "",
                district: "",
                town: "",
                mailIndex: "",
            },
            socialNetworks: [],
        },
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "socialNetworks",
    });

    const usedTypes = fields.map((f) => f.type);
    const availableTypes = allSocials.filter((s) => !usedTypes.includes(s));

    const onAddSocial = (type: TSocialNetworks) => {
        append({ type, url: "" });
    };

    const onSubmit = (data: TTypeForm) => {
        console.log("Настройки уведомлений:", data);
        notification.success({ message: "данные успешно сохранены" });
    };
    const onSubmitInvalid = (e: any) => {
        console.log(e);

        notification.error({
            message: "Пожалуйста, заполните обязательные поля",
        });
    };

    const [selectedSocial, setSelectedSocial] = useState<string | null>(null);

    const handleSelect = (item: ISelectOption) => {
        const val = item.value as TSocialNetworks;
        if (val) {
            onAddSocial(val);
            setSelectedSocial(null); // сброс выбора
        }
    };

    // availableTypes: TSocialNetworks[]
    const socialOptions: ISelectOption[] = [
        { name: "Добавить соцсеть", value: "" },
        ...availableTypes.map((s) => ({
            value: s,
            name: s.charAt(0).toUpperCase() + s.slice(1),
        })),
    ];
    return (
        <form
            className={style.form}
            onSubmit={handleSubmit(onSubmit, onSubmitInvalid)}
        >
            <h2>Настройки персональных данных</h2>
            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>Фото</div>
                <div className={style.selectionBlock_content}>
                    <Controller
                        control={control}
                        name="avatar"
                        render={({ field, fieldState, formState }) => (
                            <UploadButton
                                titleSpan="Загрузка аватарку"
                                accept="image"
                                value={field.value}
                                maxCount={3}
                                onChange={field.onChange}
                                error={fieldState.error || null}
                            />
                        )}
                    />
                </div>
            </div>
            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>Полное имя</div>
                <div className={style.selectionBlock_content}>
                    <InputForm
                        error={errors.fullName?.name?.message}
                        register={register("fullName.name")}
                        placeholder="Имя"
                        titleSpan="Имя"
                        type="text"
                    />

                    <InputForm
                        error={errors.fullName?.secondName?.message}
                        register={register("fullName.secondName")}
                        placeholder="Отчество"
                        titleSpan="Отчество"
                        type="text"
                    />

                    <InputForm
                        error={errors.fullName?.surname?.message}
                        register={register("fullName.surname")}
                        placeholder="Фамилия"
                        titleSpan="Фамилия"
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
                        placeholder="Email"
                        titleSpan="Электронная почта"
                        type="email"
                    />
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field, fieldState }) => (
                            <InputPhoneNumber
                                field={field}
                                error={fieldState.error || null}
                                titleSpam="Телефон"
                            />
                        )}
                    />
                </div>
            </div>
            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>Адрес</div>
                <div className={style.selectionBlock_content}>
                    <InputForm
                        error={errors.address?.country?.message}
                        register={register("address.country")}
                        placeholder="Страна"
                        titleSpan="Страна"
                        type="text"
                    />
                    <InputForm
                        error={errors.address?.district?.message}
                        register={register("address.district")}
                        placeholder="Область"
                        titleSpan="Область"
                        type="text"
                    />
                    <InputForm
                        error={errors.address?.town?.message}
                        register={register("address.town")}
                        placeholder="Город"
                        titleSpan="Город"
                        type="text"
                    />
                    <InputForm
                        error={errors.address?.addressLine?.message}
                        register={register("address.addressLine")}
                        placeholder="Улица"
                        titleSpan="Улица"
                        type="text"
                    />
                    <InputForm
                        error={errors.address?.mailIndex?.message}
                        register={register("address.mailIndex")}
                        placeholder="Почтовый индекс"
                        titleSpan="Почтовый индекс"
                        type="text"
                    />
                </div>
            </div>
            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>
                    Социальные сети
                </div>
                <div className={style.selectionBlock_content}>
                    {fields.map((field, index) => (
                        <div key={field.id} className={style.socialRow}>
                            {/* <label className={style.socialLabel}>
                                {field.type.charAt(0).toUpperCase() +
                                    field.type.slice(1)}
                            </label> */}
                            <InputForm
                                register={register(
                                    `socialNetworks.${index}.url` as const
                                )}
                                error={
                                    errors.socialNetworks?.[index]?.url &&
                                    `${errors.socialNetworks[index]?.url?.message}`
                                }
                                titleSpan={
                                    field.type.charAt(0).toUpperCase() +
                                    field.type.slice(1)
                                }
                                placeholder="Введите ссылку"
                                type="text"
                            />

                            <DeleteButton onClick={() => remove(index)} />
                        </div>
                    ))}
                    {availableTypes.length > 0 && (
                        <>
                            <SelectCustom
                                options={socialOptions}
                                activeOption={selectedSocial}
                                onChange={(item) => {
                                    setSelectedSocial(item.value); // установить выбранное
                                    handleSelect(item); // обработка
                                }}
                                classNameCtn={style.selectSocial}
                            />
                        </>
                    )}
                </div>
            </div>
            <Button
                className={style.buttonSubmit}
                typeLogic="submit"
                text="Сохранить изменения"
            />
        </form>
    );
};
export default TabPersonal;
