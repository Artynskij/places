"use client";
import style from "./establishmentForm.module.scss";
import * as Yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import useLocale from "@/lib/hooks/useLocale";
import {
    Controller,
    FieldError,
    SubmitHandler,
    useForm,
} from "react-hook-form";

import { IImageEntity, IOption } from "@/lib/models";
import { TAgreementKey } from "@/lib/models/types";

import { CONSTANT_TYPES_OF_ESTABLISHMENT_DB } from "@/asset/constants/database/types-of-establishment";
import { CONSTANT_MESSANGER_NETWORKS_ARRAY, CONSTANT_SOCIAL_NETWORKS_ARRAY } from "@/asset/constants/social-networks.const";
import { useNotification } from "@/lib/context";
import { useUser } from "@/lib/context/UserContext/UserContext";

import { InputForm } from "@/components/UI/Input/InputForm/InputForm";
import { InputPhoneNumber } from "@/components/UI/Input/InputPhone/InputPhone";

import { Button } from "@/components/UI/Button/Button";

import { SelectCustom } from "@/components/UI/SelectCustom/SelectCustom";
import { TextareaForm } from "@/components/UI/Textarea/TextareaForm/TextareaForm";

import { Loader } from "../../Loader/Loader";

import AddressBlockForm from "../_components/AddressBlock/AddressBlock";
import MapBlockForm from "../_components/MapBlock/MapBlockForm";
import TagBlockForm from "../_components/TagBlock/TagBlockForm";
import CategoryBlockForm from "../_components/CategoryBlock/CategoryBlockForm";
import { ScheduleBlockForm } from "../_components/ScheduleBlock/ScheduleBlock";
import { SocialContactsBlockForm } from "../_components/SocialContacts/SocialContacts";

import { getSchemaEstablishmentByTypeUser } from "./validationSchema";

import { useRouter } from "next/navigation";

import PhotoBlockForm from "../_components/PhotoBlock/PhotoBlock";
import { GeneralEstablishmentService } from "@/lib/Api/(MainService)/establishment.general";
import { ModalCustom } from "@/components/UI/ModalCustom/ModalCustom";
import { useState } from "react";

const agreementKeys: TAgreementKey[] = [
    "ConfirmedLegalAccommodation",
    "ConfirmedInformationResponsibility",
];

interface IFormCreateEstablishment {
    closeModal?: (value: false) => void;
}
const FormCreateEstablishmentBase = ({
    closeModal,
}: IFormCreateEstablishment) => {
    const { user } = useUser();
    const typeUser = user?.typeUser || "tourist";
    const validationSchemaRegister = getSchemaEstablishmentByTypeUser(typeUser);
    const router = useRouter();

    type TTypeForm = Yup.InferType<typeof validationSchemaRegister>;

    const notification = useNotification();
    const generalEstablishmentService = new GeneralEstablishmentService();

    const locale = useLocale();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        watch,
    } = useForm({
        resolver: yupResolver(validationSchemaRegister),
    });
    const typeEstablishment = watch("typeEstablishment");
    const locationId = watch("locationId");
    const onSubmit: SubmitHandler<TTypeForm> = async (formData) => {
        if (!user) {
            notification.error({ message: "Это невозможно. User нету" });
            return;
        }
        try {
            const success = await generalEstablishmentService.create({
                formData,
                locale: locale,
                typeUser: user.typeUser,
                userId: user.id,
            });
            if (success) {
                notification.success({
                    message: "Объект успешно создан и отправлен на модерацию",
                });
                closeModal && closeModal(false);
            } else {
                notification.error({
                    message: "Произошла ошибка при создании объекта",
                });
            }
        } catch (error) {
            console.error("Ошибка при создании заведения:", error);
            notification.error({
                message: "Произошла ошибка при создании объекта",
            });
        }
    };

    const onSubmitInvalid = (e: any) => {
        console.log(e);

        notification.error({
            message: "Пожалуйста, заполните обязательные поля",
        });
    };

    const optionsTypesOfEstablishment: IOption[] = [
        { label: "Выбрать тип объекта", value: "" },
        ...Object.values(CONSTANT_TYPES_OF_ESTABLISHMENT_DB).map(
            ({ key, secondValue, info }) => ({
                value: key,
                label: secondValue,
                info: info,
            })
        ),
    ];
    console.log(optionsTypesOfEstablishment)
    return (
        <form
            className={style.form}
            onSubmit={handleSubmit(onSubmit, onSubmitInvalid)}
        >
            <h2>Создание объекта</h2>
            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_content}>
                    <InputForm
                        error={errors.title?.message}
                        register={register("title")}
                        placeholder="Название заведения*"
                        titleSpan="Название заведения"
                        type="text"
                    />
                    <Controller
                        control={control}
                        name="typeEstablishment"
                        render={({ field, fieldState }) => (
                            <div className={style.selectBlock}>
                                <label>Тип объекта*</label>
                                <SelectCustom
                                    classNameCtn={style.selectBlock_select}
                                    titleDefault='Выбрать тип объект'
                                    options={optionsTypesOfEstablishment}
                                    activeOption={field.value}
                                    onChange={(option) =>
                                        field.onChange(option.value)
                                    }
                                    error={fieldState.error?.message}
                                />
                                
                            </div>
                        )}
                    />
                    {typeEstablishment && (
                        <Controller
                            name="categories"
                            control={control}
                            render={({ field, fieldState }) => (
                                <div className={style.selectBlock}>
                                    <label>Категория объекта*</label>
                                    <CategoryBlockForm
                                        typeEstablishmentId={
                                            CONSTANT_TYPES_OF_ESTABLISHMENT_DB[
                                                typeEstablishment
                                            ].id
                                        }
                                        selectedCategories={
                                            field.value as string[]
                                        }
                                        onChange={field.onChange}
                                        error={fieldState.error || null}
                                    />
                                </div>
                            )}
                        />
                    )}
                </div>
            </div>

            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>
                    Адрес нахождения объекта
                </div>
                <div className={style.selectionBlock_content}>
                    <Controller
                        name="locationId"
                        control={control}
                        render={({ field, fieldState }) => (
                            <AddressBlockForm
                                locationId={field.value}
                                onChange={field.onChange}
                                error={fieldState.error || null}
                            />
                        )}
                    />

                    <Controller
                        name="coord"
                        control={control}
                        render={({ field, fieldState }) => (
                            <MapBlockForm
                                value={
                                    field.value?.lat
                                        ? {
                                            lat: field.value.lat,
                                            lon: field.value.lon,
                                            addressFullLine:
                                                field.value.addressFullLine ||
                                                null,
                                            addressLine:
                                                field.value.addressLine ||
                                                null,
                                        }
                                        : null
                                }
                                onChange={field.onChange}
                                error={fieldState.error || null}
                                locationId={locationId}
                            />
                        )}
                    />
                </div>
            </div>
            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>
                    Прикрепление фотографии объекта
                </div>
                <div className={style.selectionBlock_content}>
                    <Controller
                        name="images"
                        control={control}
                        defaultValue={[]}
                        render={({ field, fieldState }) => (
                            <>
                                <PhotoBlockForm
                                    error={fieldState.error || null}
                                    onChange={field.onChange}
                                    value={
                                        field.value?.filter((item) => !!item) ||
                                        []
                                    }
                                />
                            </>
                        )}
                    />
                </div>
            </div>

            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>
                    Контактные данные
                </div>
                <div className={style.selectionBlock_content}>
                    <InputForm
                        error={errors.email?.message}
                        register={register("email")}
                        placeholder="Адрес электронной почты*"
                        titleSpan="Адрес электронной почты."
                        type="email"
                    />

                    <Controller
                        control={control}
                        name="phone"
                        render={({ field, fieldState }) => (
                            <InputPhoneNumber
                                field={field}
                                error={fieldState.error || null}
                                titleSpan="Номер телефона*"
                            />
                        )}
                    />
                    {typeEstablishment === "EATER" && (
                        <InputForm
                            error={errors.menu?.message}
                            register={register("menu")}
                            placeholder="Ссылка на меню"
                            titleSpan="Ссылка на меню"
                            type="text"
                        />
                    )}
                    <InputForm
                        error={errors.webContact?.message}
                        register={register("webContact")}
                        placeholder="Вставьте ссылку на ваш сайт"
                        titleSpan="Вставьте ссылку на ваш сайт"
                        type="text"
                    />
                    <Controller
                        name="socialContacts"
                        control={control}
                        render={({ field }) => (
                            <SocialContactsBlockForm
                                keysData={CONSTANT_SOCIAL_NETWORKS_ARRAY}
                                value={field.value || []}
                                onChange={field.onChange}
                                nameSelectImportant="Добавить социальную сеть"
                                errors={
                                    errors.socialContacts as {
                                        [index: number]: { url?: FieldError };
                                    }
                                }
                            />

                        )}
                    />
                    <Controller
                        name="messangerContacts"
                        control={control}
                        render={({ field }) => (
                            <SocialContactsBlockForm
                                keysData={CONSTANT_MESSANGER_NETWORKS_ARRAY}
                                value={field.value || []}
                                onChange={field.onChange}
                                nameSelectImportant="Добавить мессенджер"
                                errors={
                                    errors.messangerContacts as {
                                        [index: number]: { url?: FieldError };
                                    }
                                }
                            />
                        )}
                    />

                </div>
            </div>
            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>Время работы</div>
                <div className={style.selectionBlock_content}>
                    <Controller
                        name="schedule"
                        control={control}
                        render={({ field, fieldState }) => (
                            <ScheduleBlockForm
                                value={field.value || null}
                                onChange={field.onChange}
                                error={fieldState.error?.message}
                            />
                        )}
                    />
                </div>
            </div>

            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>
                    Описание и Характеристики объекта
                </div>

                <div className={style.selectionBlock_content}>
                    <TextareaForm
                        error={errors.description?.message}
                        register={register("description")}
                        placeholder="Описание объекта*"
                        titleSpan="Описание объекта"
                    />
                    <Controller
                        name="tags"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TagBlockForm
                                selectedTags={field.value as string[]}
                                onChange={field.onChange}
                                error={fieldState.error || null}
                            />
                        )}
                    />
                </div>
            </div>
            {/* {typeUser === "owner" && (
                <div className={style.selectionBlock}>
                    <div className={style.selectionBlock_title}>
                        Видео подтверждающее о владении
                    </div>

                    <div className={style.selectionBlock_content}>
                        <Controller
                            name="videoVerification"
                            control={control}
                            defaultValue={[]}
                            render={({ field, fieldState }) => (
                                <UploadButton
                                    titleSpan="Прикрепление видеоверификацию объекта*"
                                    accept="video"
                                    // maxSizeMB={10}
                                    maxCount={1}
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={fieldState.error || null}
                                />
                            )}
                        />
                    </div>
                </div>
            )} */}

            {/* <BlockAgreements
                agreementKeys={agreementKeys}
                value={watch("agreements") as string[]}
                onChange={(vals) => setValue("agreements", vals)}
                error={errors.agreements?.message}
            /> */}
            <Button
                className={style.form_buttonSubmit}
                typeLogic="submit"
                text={"Зарегистрировать"}
            />
            {isSubmitting && <Loader />}
        </form>
    );
};
interface IProp {
    children: React.ReactNode | React.ReactNode[] | null;
}
export const FormCreateEstablishment = ({ children }: IProp) => {
    const [modalCreateActive, setModalCreateActive] = useState(false);
    return (
        <>
            <div onClick={() => setModalCreateActive(true)}>{children}</div>
            {/* <AuthGuard> */}
            <ModalCustom
                title="Создать объект"
                view="middle"
                active={modalCreateActive}
                closeModal={() => {
                    setModalCreateActive(false);
                }}
            >
                <div className="container">
                    {modalCreateActive && (
                        <FormCreateEstablishmentBase
                            closeModal={setModalCreateActive}
                        />
                    )}
                </div>
            </ModalCustom>
            {/* </AuthGuard> */}
        </>
    );
};
