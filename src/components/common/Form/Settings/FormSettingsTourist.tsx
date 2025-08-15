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

import { useEffect, useState } from "react";

import { UploadButton } from "@/components/common/ButtonFunctional/UploadButton";
import { validImageFileSchema } from "@/lib/validationSchemas/file/imageArraySchema";
import { PersonService } from "@/lib/Api/(Person)/person/person.service";
import { mockPersonId } from "@/asset/mockData/mockServerData";

import { PersonNameService } from "@/lib/Api/(Person)/personName/personName.service";
// import { ContactsPersonService } from "@/lib/Api/contacts/contacts.service";
import { ContactsPersonService } from "@/lib/Api/(Person)/contactPerson.api";
import { AddressService } from "@/lib/Api/(Person)/address/address.api";
// import { AddressService } from "@/lib/Api/(Person)/address/address.service";
import { SocialNetworksService } from "@/lib/Api/(Person)/socialNetworksPerson/socialNetworksPerson.service";

import { validSocialNetworksSchema } from "@/lib/validationSchemas/socialNetworksSchema";
import { CONSTANT_SOCIAL_NETWORKS_ARRAY } from "@/asset/constants/socialNetworks";
import { FileUploadService } from "@/lib/Api/fileUpload/fileUploads.service";
import Image from "next/image";

import { TextareaForm } from "@/components/UI/Textarea/TextareaForm/TextareaForm";

import { SocialContactsBlockForm } from "../_components/SocialContacts/SocialContacts";
import { getObjectDiffWithNulls } from "@/lib/helpers/getChangedFieldsForApi";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/config/Routes";
import { Loader } from "../../Loader/Loader";
import { DeleteButton } from "../../ButtonFunctional/DeleteButton";
import { GenderBlockForm } from "../_components/GenderBlock/GenderBlock";
import { InputDate } from "@/components/UI/Input/InputDate/InputDate";
import { getFormatDate, parseDateToISO } from "@/lib/helpers/getFormatDate";
import { AvatarBlockForm } from "../_components/AvatarBlock/AvatarBlock";
import { CONSTANT_DEFAULT_AVATAR_URL } from "@/asset/constants/DefaultConstant";
import {
    IContactsRequest,
    IPersonFront,
    IPersonNameCreateRequest,
    IPersonRequest,
    ISocialContactsRequest,
} from "@/lib/models";

type TTypeForm = Yup.InferType<typeof validationSchema>;

const validationSchema = Yup.object().shape({
    fullName: Yup.object().shape({
        name: Yup.string(),
        secondName: Yup.string(), // Отчество может быть необязательным
        surname: Yup.string(),
    }),
    dateOfBirth: validDateSchema,
    gender: Yup.string(),
    nickname: Yup.string(),
    email: Yup.string().email("Невалидный email"),
    phone: validPhoneSchema,
    address: Yup.object().shape({
        country: Yup.string(),
        town: Yup.string(),
    }),
    socialContacts: validSocialNetworksSchema,
    avatar: Yup.array()
        .of(validImageFileSchema)
        .max(1, "Можно загрузить не более 1 фоток"),
    description: Yup.string(),
});
export const FormSettingsTourist = () => {
    const notification = useNotification();
    const personService = new PersonService();
    const personNameService = new PersonNameService();
    const addressService = new AddressService();
    const contactsPersonService = new ContactsPersonService();
    const socialNetworksService = new SocialNetworksService();

    const fileUploadService = new FileUploadService();

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
        resolver: yupResolver(validationSchema),
    });
    const avatarFiles = watch("avatar");
    useEffect(() => {
        personService.getById(mockPersonId).then((person) => {
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
                    dateOfBirth: person.birthDate
                        ? getFormatDate(person.birthDate)
                        : "",
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

    const onSubmit = async (dataForm: TTypeForm) => {
        if (!initialFormData) {
            notification.error({
                message: "не найден изначальные данные формы",
            });
            return;
        }

        const changes = getObjectDiffWithNulls<TTypeForm>(
            initialFormData,
            dataForm
        );
        console.log(changes);

        if (Object.keys(changes).length === 0) {
            notification.info({ message: "Нет изменений для сохранения" });
            return;
        }

        if (!personData) {
            notification.error({ message: "не найден пользователь" });
            return;
        }

        const bodyToPersonUpdate: IPersonRequest = {};

        //  Обработка аватара
        if (changes.avatar) {
            const file = changes.avatar[0];
            if (file) {
                const imageUrl = await fileUploadService.uploadPublicFile({
                    file,
                    type: "image",
                    vendorId: personData.id,
                });
                bodyToPersonUpdate.AvatarPhotoPath = imageUrl?.blobPath;
            } else {
                bodyToPersonUpdate.AvatarPhotoPath = null;
            }
        }

        //  Обработка описания
        if ("description" in changes) {
            bodyToPersonUpdate.About = changes.description ?? null;
        }
        if ("gender" in changes) {
            bodyToPersonUpdate.Gender = changes.gender ?? null;
        }
        if ("dateOfBirth" in changes) {
            bodyToPersonUpdate.BirthDate = changes.dateOfBirth ?? null;
        }
        //  nickname описания
        if ("nickname" in changes) {
            bodyToPersonUpdate.Nickname = changes.nickname ?? null;
        }

        //  Обработка ФИО
        if ("fullName" in changes && changes.fullName) {
            const fullName = changes.fullName;

            const bodyPersonName: Partial<IPersonNameCreateRequest> = {};

            if ("name" in fullName) {
                // bodyPersonName.FirstName = fullName.name ?? null;
                bodyPersonName.FirstName = fullName.name ?? null; // если нужно
            }
            if ("surname" in fullName) {
                // bodyPersonName.LastName = fullName.surname ?? null;
                bodyPersonName.LastName = fullName.surname ?? null; // если нужно
            }
            if ("secondName" in fullName) {
                bodyPersonName.MiddleName = fullName.secondName ?? null;
            }

            // Если есть хоть одно поле
            if (Object.keys(bodyPersonName).length > 0) {
                const personNameResponse =
                    await personNameService.updatePersonName(
                        personData.personName?.id || null,
                        bodyPersonName
                    );

                if (personNameResponse) {
                    bodyToPersonUpdate.PersonName = personNameResponse.id;
                }
            }
        }

        // 📌 Обработка адреса
        let addressRes = null;
        if ("address" in changes) {
            const addr = changes.address || {};
            const bodyAddress = {
                Country: addr.country ?? null,

                Town: addr.town ?? null,
            };

            addressRes = await addressService.updateOrCreate(
                personData.contacts?.address?.id || null,
                bodyAddress
            );
        }

        // 📌 Обработка соцсетей
        let socialRes = null;
        if ("socialContacts" in changes) {
            const bodySocialNetworks =
                changes.socialContacts?.reduce<ISocialContactsRequest>(
                    (acc, soc) => {
                        acc[soc.type] = soc.url;
                        return acc;
                    },
                    {}
                ) ?? null;

            socialRes = await socialNetworksService.updateSocialNetworksPerson(
                personData.contacts?.socialNetworks?.id || null,
                bodySocialNetworks
            );
        }

        // 📌 Обработка контактов
        if (
            "email" in changes ||
            "phone" in changes ||
            addressRes ||
            socialRes
        ) {
            const bodyContacts: IContactsRequest = {
                source: {
                    Email:
                        "email" in changes
                            ? changes.email ?? null
                            : personData.contacts?.email ?? null,
                    Phone:
                        "phone" in changes
                            ? changes.phone ?? null
                            : personData.contacts?.phone ?? null,
                    AddressId:
                        addressRes?.id ||
                        personData.contacts?.address?.id ||
                        null,
                    SocialContactsId:
                        socialRes?.id ||
                        personData.contacts?.socialNetworks?.id ||
                        null,
                },
            };

            const contactsResponse = await contactsPersonService.updateOrCreate(
                personData.contacts?.id || null,
                bodyContacts
            );

            if (contactsResponse) {
                bodyToPersonUpdate.Contacts = contactsResponse.id;
            }
        }

        // 📌 Финальный update
        if (bodyToPersonUpdate) {
            await personService.update(personData.id, bodyToPersonUpdate);
        }

        notification.success({ message: "Данные отправлены на верификацию" });

        router.push(ROUTES.PROFILE.TOURIST("sherlock_bones"));
    };

    const onSubmitInvalid = (e: any) => {
        console.log(e);

        notification.error({
            message: "Пожалуйста, заполните обязательные поля",
        });
    };
    const handlerDeleteAvatar = () => {
        if (!personData) return;
        personService
            .update(personData.id, {
                AvatarPhotoPath: null,
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
                                value={field.value || ""}
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
                                titleSpam="Телефон"
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
