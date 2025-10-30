"use client";
import style from "./settings.module.scss";

import * as Yup from "yup";

import { useNotification } from "@/lib/context";
import {
    Controller,
    FieldError,
    useFieldArray,
    useForm,
} from "react-hook-form";

import { validDateSchema, validPhoneSchema } from "@/lib/validationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputForm } from "@/components/UI/Input/InputForm/InputForm";
import { InputPhoneNumber } from "@/components/UI/Input/InputPhone/InputPhone";
import { Button } from "@/components/UI/Button/Button";

import { useEffect, useMemo, useState } from "react";

import { UploadButton } from "@/components/common/ButtonFunctional/UploadButton";
import { validImageFileSchema } from "@/lib/validationSchemas/file/imageArraySchema";
import { PersonService } from "@/lib/Api/(Person)/person/person.service";

// import { PersonNameService } from "@/lib/Api/(Person)/personName/personName.service";

import { IPersonFront } from "@/lib/models/frontend/(person)/person.front";

import { FileUploadService } from "@/lib/Api/fileUpload/fileUploads.service";
import Image from "next/image";

import { IPersonRequest } from "@/lib/models/server/request/(Person)/person.request";

import { getSimpleObjectDiff } from "@/lib/helpers/getChangedFieldsForApi";
import { IPersonNameRequest } from "@/lib/models/server/request/(Person)/personName.request";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/config/Routes";
import { Loader } from "../../Loader/Loader";

import { AvatarBlockForm } from "../_components/AvatarBlock/AvatarBlock";
import { CONSTANT_DEFAULT_AVATAR_URL } from "@/asset/constants/default.const";

import { useUser } from "@/lib/context/UserContext/UserContext";
import { PersonNameService } from "@/lib/Api/(Person)/personName.api";
import { validationPersonOwner } from "@/lib/validationSchemas/person/personValid.schema";
import { GeneralPersonService } from "@/lib/Api/(MainService)/person.general";
import { ModerationService } from "@/lib/Api/moderation/moderation.service";
// import { PersonNameService } from "@/lib/Api/(Person)/personName/personName.service";

type TTypeForm = Yup.InferType<typeof validationPersonOwner>;

export const FormSettingsOwner = () => {
    const notification = useNotification();
    const { user } = useUser();

    const services = useMemo(
        () => ({
            person: new PersonService(),
            moderation: new ModerationService(),
            generalPerson: new GeneralPersonService(),
        }),
        []
    );
    const router = useRouter();

    const [personData, setPersonData] = useState<IPersonFront>();
    const [initialFormData, setInitialFormData] = useState<TTypeForm>();
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<TTypeForm>({
        resolver: yupResolver(validationPersonOwner),
    });

    useEffect(() => {
        if (!user) return;
        services.person.getById(user.id).then(async (person) => {
            if (person) {
                setPersonData(person);

                const formData: TTypeForm = {
                    fullName: {
                        name: person.personName?.originalName || "",
                        secondName: person.personName?.originalSecondName || "",
                        surname: person.personName?.originalSurname || "",
                    },

                    email: person.contacts?.email || "",
                    phone: person.contacts?.phone || "",
                    avatar: [],
                    passportDocument: [],
                };
                setInitialFormData(formData);
                reset(formData);
            }
        });
    }, [reset, services, user]);

    const onSubmit = async (formData: TTypeForm) => {
        if (!initialFormData) {
            notification.error({
                message: "не найден изначальные данные формы",
            });
            return;
        }
        if (!personData) {
            notification.error({ message: "не найден пользователь" });
            return;
        }
        const response = await services.generalPerson.updateOwner({
            formData: formData,
            initialForm: initialFormData,
            personData: personData,
        });
        if (response) {
            notification.success({
                message: "Данные отправлены на верификацию",
            });

            router.push(ROUTES.PROFILE.OWNER(personData.id));
        } else {
            notification.error({
                message: "Что-то пошло не так при обновлении данных",
            });
        }
    };

    const onSubmitInvalid = (e: any) => {
        console.log(e);

        notification.error({
            message: "Пожалуйста, заполните обязательные поля",
        });
    };
    const handlerDeleteAvatar = async () => {
        if (!personData) return;
        const moderationObject = await services.moderation.getModerationData(
            personData.id
        );
        if (!moderationObject) return;
        services.person
            .update(personData.id, {
                moderation: moderationObject,
                data: {
                    source: {
                        ProfilePhotoPath: null,
                    },
                },
            })
            .then(() => {
                setPersonData((prev) => {
                    if (!prev) return prev;
                    return {
                        ...prev,
                        ProfilePhotoPath: null,
                    };
                });
                notification.success({
                    message: "Фотография успешно удалена",
                });
            });
    };
    if (!personData) {
        return <Loader />;
    }
    return (
        <form
            className={style.form}
            onSubmit={handleSubmit(onSubmit, onSubmitInvalid)}
        >
            {/* <h2>Настройки персональных данных и верификация</h2> */}
            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_content}>
                    <div className={style.avatar_ctn}>
                        <span>Фото</span>
                        <div className={style.avatar}>
                            <Image
                                className={style.avatar_img}
                                width={250}
                                height={250}
                                alt="avatar"
                                src={
                                    personData.avatar.ownerImageSrc ||
                                    CONSTANT_DEFAULT_AVATAR_URL
                                }
                            />
                            <Controller
                                control={control}
                                name="avatar"
                                render={({ field, fieldState }) => (
                                    <AvatarBlockForm
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={fieldState.error || null}
                                        serverPhotoUrl={
                                            personData.avatar.ownerImageSrc
                                        }
                                        handlerDeleteAvatar={
                                            handlerDeleteAvatar
                                        }
                                        // className={style.avatar_upload}
                                    />
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>
                    Данные законного представителя
                </div>
                <div className={style.selectionBlock_content}>
                    <InputForm
                        error={errors.fullName?.name?.message}
                        register={register("fullName.name")}
                        placeholder="Имя согласно удостоверению личности*"
                        titleSpan="Имя согласно удостоверению личности*"
                        type="text"
                    />

                    <InputForm
                        error={errors.fullName?.secondName?.message}
                        register={register("fullName.secondName")}
                        placeholder="Второе имя (отчество) согласно удостоверению личности"
                        titleSpan="Второе имя (отчество) согласно удостоверению личности"
                        type="text"
                    />

                    <InputForm
                        error={errors.fullName?.surname?.message}
                        register={register("fullName.surname")}
                        placeholder="Фамилия согласно удостоверению личности*"
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
                        titleSpan="Адрес электронной почты*"
                        type="email"
                    />
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field, fieldState }) => (
                            <InputPhoneNumber
                                field={field}
                                error={fieldState.error || null}
                                titleSpan="Номер телефона "
                            />
                        )}
                    />
                </div>
            </div>
            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>
                    Прикрепление подтверждающих документов*
                </div>
                <div className={style.selectionBlock_content}>
                    <Controller
                        control={control}
                        name="passportDocument"
                        render={({ field, fieldState }) => (
                            <>
                                <UploadButton
                                    type="box"
                                    titleSpan="Загрузить документ"
                                    titleButton="загрузить документ"
                                    accept="image"
                                    value={field.value}
                                    maxCount={5}
                                    onChange={field.onChange}
                                    error={fieldState.error || null}
                                    className={style.document_upload}
                                />
                                <ul className={style.document_list}>
                                    {field.value &&
                                        field.value.length > 0 &&
                                        field.value?.map((doc, index) => {
                                            if (!doc) return null;
                                            return (
                                                <li key={doc.name}>
                                                    {index + 1}. {doc.name}
                                                </li>
                                            );
                                        })}
                                </ul>
                            </>
                        )}
                    />
                </div>
            </div>

            <Button
                className={style.buttonSubmit}
                typeLogic="submit"
                text="Отправить на проверку"
            />
        </form>
    );
};
