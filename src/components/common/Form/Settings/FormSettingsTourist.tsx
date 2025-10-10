"use client";
import style from "./settings.module.scss";

import * as Yup from "yup";

import { useNotification } from "@/lib/context";
import { Controller, FieldError, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { InputForm } from "@/components/UI/Input/InputForm/InputForm";
import { InputPhoneNumber } from "@/components/UI/Input/InputPhone/InputPhone";
import { Button } from "@/components/UI/Button/Button";

import { useEffect, useState } from "react";

import { PersonService } from "@/lib/Api/(Person)/person/person.service";

import { CONSTANT_SOCIAL_NETWORKS_ARRAY } from "@/asset/constants/socialNetworks";

import Image from "next/image";

import { TextareaForm } from "@/components/UI/Textarea/TextareaForm/TextareaForm";

import { SocialContactsBlockForm } from "../_components/SocialContacts/SocialContacts";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/config/Routes";
import { Loader } from "../../Loader/Loader";

import { GenderBlockForm } from "../_components/GenderBlock/GenderBlock";
import { InputDate } from "@/components/UI/Input/InputDate/InputDate";

import { AvatarBlockForm } from "../_components/AvatarBlock/AvatarBlock";
import { CONSTANT_DEFAULT_AVATAR_URL } from "@/asset/constants/DefaultConstant";
import { IPersonFront } from "@/lib/models";
import { useUser } from "@/lib/context/UserContext/UserContext";
import { validationPersonTourist } from "@/lib/validationSchemas/person/personValid.schema";
import { ModerationService } from "@/lib/Api/moderation/moderation.service";
import { GeneralPersonService } from "@/lib/Api/(MainService)/person.general";

type TTypeForm = Yup.InferType<typeof validationPersonTourist>;

export const FormSettingsTourist = () => {
    const notification = useNotification();
    const { user } = useUser();

    const personService = new PersonService();
    const moderationService = new ModerationService();

    const generalPersonService = new GeneralPersonService();

    const router = useRouter();

    const [personData, setPersonData] = useState<IPersonFront>();
    const [initialFormData, setInitialFormData] = useState<TTypeForm>();
    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        formState: { errors },
    } = useForm<TTypeForm>({
        resolver: yupResolver(validationPersonTourist),
    });

    useEffect(() => {
        if (!user) return;
        personService.getById(user.id).then((person) => {
            if (person) {
                setPersonData(person);

                const socialEntity = person.contacts?.socialNetworks || null;
                const socialNetworks =
                    socialEntity &&
                    CONSTANT_SOCIAL_NETWORKS_ARRAY.map((type) => {
                        const url = socialEntity[type];
                        if (url) return { type, url };
                        return null;
                    }).filter(Boolean); // удаляем null

                const formData: TTypeForm = {
                    fullName: {
                        name: person.personName?.name || "",
                        secondName: person.personName?.secondName || "",
                        surname: person.personName?.surname || "",
                    },
                    dateOfBirth: person.birthDate ? person.birthDate : null,
                    gender: person.gender?.id || "",
                    nickname: person.nickname || "",
                    address: {
                        country: person.contacts?.address?.country || "",

                        town: person.contacts?.address?.town || "",
                    },
                    email: person.contacts?.email || "",
                    phone: person.contacts?.phone || "",
                    socialContacts:
                        socialNetworks as TTypeForm["socialContacts"],
                    description: person.aboutDescription || "",
                    avatar: [], // аватар на начальном этапе пуст
                };
                setInitialFormData(formData);
                reset(formData);
            }
        });
    }, [reset]);

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
        const response = await generalPersonService.updateTourist({
            formData: formData,
            initialForm: initialFormData,
            personData: personData,
        });
        if (response) {
            notification.success({
                message: "Данные отправлены на верификацию",
            });

            router.push(ROUTES.PROFILE.TOURIST(personData.id));
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
        const moderationObject = await moderationService.getModerationData(
            personData.id
        );
        if (!moderationObject) return;
        personService
            .update(personData.id, {
                moderation: moderationObject,
                data: {
                    source: {
                        AvatarPhotoPath: null,
                    },
                },
            })
            .then(() => {
                setPersonData((prev) => {
                    if (!prev) return prev;
                    return {
                        ...prev,
                        avatarImg: null,
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
            <h2>Данные профиля туриста</h2>
            <div className={style.selectionBlock}>
                {/* <div className={style.selectionBlock_title}>Фото</div> */}
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
                                    personData.avatar.touristImageSrc ||
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
                                            personData.avatar.touristImageSrc
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
                    <div className={style.description}>
                        <TextareaForm
                            error={errors.description?.message}
                            register={register("description")}
                            placeholder="О себе*"
                            titleSpan="О себе"
                        />
                    </div>
                </div>
            </div>
            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>Данные туриста</div>
                <div className={style.selectionBlock_content}>
                    <InputForm
                        error={errors.fullName?.name?.message}
                        register={register("fullName.name")}
                        placeholder="Имя"
                        titleSpan="Имя"
                        type="text"
                    />
                    {/* 
                    <InputForm
                        error={errors.fullName?.secondName?.message}
                        register={register("fullName.secondName")}
                        placeholder="Отчество"
                        titleSpan="Отчество"
                        type="text"
                    /> */}

                    <InputForm
                        error={errors.fullName?.surname?.message}
                        register={register("fullName.surname")}
                        placeholder="Фамилия"
                        titleSpan="Фамилия"
                        type="text"
                    />
                    <InputForm
                        error={errors.fullName?.surname?.message}
                        register={register("nickname")}
                        placeholder="@Никнейм"
                        titleSpan="@Никнейм"
                        type="text"
                    />
                    <Controller
                        name="gender"
                        control={control}
                        render={({ field, fieldState }) => (
                            <div className={style.selectBlock}>
                                <span>Выберите пол</span>
                                <GenderBlockForm
                                    selectedGender={field.value as string}
                                    onChange={field.onChange}
                                    error={fieldState.error || null}
                                />
                            </div>
                        )}
                    />
                    <Controller
                        name="dateOfBirth"
                        control={control}
                        render={({ field, fieldState }) => (
                            <InputDate
                                titleSpan="Дата рождения ДД.ММ.ГГГГ*"
                                value={field.value || null}
                                onChange={field.onChange}
                                error={fieldState.error?.message}
                            />
                        )}
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
                                titleSpan="Телефон"
                            />
                        )}
                    />
                </div>
            </div>
            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>
                    Место проживание
                </div>
                <div className={style.selectionBlock_content}>
                    <InputForm
                        error={errors.address?.country?.message}
                        register={register("address.country")}
                        placeholder="Страна"
                        titleSpan="Страна"
                        type="text"
                    />

                    <InputForm
                        error={errors.address?.town?.message}
                        register={register("address.town")}
                        placeholder="Город"
                        titleSpan="Город"
                        type="text"
                    />
                </div>
            </div>

            <div className={style.selectionBlock}>
                {/* <div className={style.selectionBlock_title}>О Себе</div> */}
                <div className={style.selectionBlock_content}></div>
            </div>
            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>
                    Социальные сети
                </div>
                <div
                    className={`${style.selectionBlock_content} ${style.social}`}
                >
                    <Controller
                        name="socialContacts"
                        control={control}
                        render={({ field }) => (
                            <SocialContactsBlockForm
                                value={field.value || []}
                                onChange={field.onChange}
                                errors={
                                    errors.socialContacts as {
                                        [index: number]: { url?: FieldError };
                                    }
                                }
                            />
                        )}
                    />
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
