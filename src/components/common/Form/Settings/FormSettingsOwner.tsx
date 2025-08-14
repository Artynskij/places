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

import { ContactsPersonService } from "@/lib/Api/(Person)/contactPerson.api";
import { AddressService } from "@/lib/Api/(Person)/address/address.api";
// import { AddressService } from "@/lib/Api/(Person)/address/address.service";
import { SocialNetworksService } from "@/lib/Api/(Person)/socialNetworksPerson/socialNetworksPerson.service";

import { IPersonFront } from "@/lib/models/frontend/(person)/person.front";

import { FileUploadService } from "@/lib/Api/fileUpload/fileUploads.service";
import Image from "next/image";

import { IPersonRequest } from "@/lib/models/api/request/(Person)/person.request";

import { getObjectDiffWithNulls } from "@/lib/helpers/getChangedFieldsForApi";
import { IPersonNameCreateRequest } from "@/lib/models/api/request/(Person)/personName.request";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/config/Routes";
import { Loader } from "../../Loader/Loader";

import { AvatarBlockForm } from "../_components/AvatarBlock/AvatarBlock";
import { CONSTANT_DEFAULT_AVATAR_URL } from "@/asset/constants/DefaultConstant";
import { VerificationService } from "@/lib/Api/verification/verification.api";
import { IImageEntity } from "@/lib/models";

type TTypeForm = Yup.InferType<typeof validationSchema>;

const validationSchema = Yup.object().shape({
    fullName: Yup.object().shape({
        name: Yup.string().required("Имя обязательна"),
        secondName: Yup.string(),
        surname: Yup.string().required("Фамилия обязательна"),
    }),

    email: Yup.string().email("Невалидный email").required("Почта обязательна"),
    phone: validPhoneSchema,

    avatar: Yup.array()
        .of(validImageFileSchema)
        .max(1, "Можно загрузить не более 1 фоток"),

    passportDocument: Yup.array()
        .of(validImageFileSchema)
        .min(1, "Вы должны загрузить минимум 1 фото")
        .max(5, "Можно загрузить не более 5 фоток"),
});
export const FormSettingsOwner = () => {
    const notification = useNotification();
    const personService = new PersonService();
    const personNameService = new PersonNameService();

    const verificationService = new VerificationService();
    const fileUploadService = new FileUploadService();

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
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        personService.getPersonById(mockPersonId).then(async (person) => {
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
                bodyToPersonUpdate.Avatar2BPhotoPath = imageUrl?.blobPath;
            } else {
                bodyToPersonUpdate.Avatar2BPhotoPath = null;
            }
        }

        //  Обработка ФИО
        if ("fullName" in changes && changes.fullName) {
            const fullName = changes.fullName;

            const bodyPersonName: Partial<IPersonNameCreateRequest> = {};

            if ("name" in fullName) {
                // bodyPersonName.FirstName = fullName.name ?? null;
                bodyPersonName.OriginalName = fullName.name ?? null; // если нужно
            }
            if ("surname" in fullName) {
                // bodyPersonName.LastName = fullName.surname ?? null;
                bodyPersonName.OriginalLastName = fullName.surname ?? null; // если нужно
            }
            if ("secondName" in fullName) {
                bodyPersonName.OriginalMiddleName = fullName.secondName ?? null;
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
        if (changes.passportDocument) {
            const documentFiles = changes.passportDocument;

            const uploadFilesPromises: Promise<IImageEntity>[] = documentFiles
                .filter((file): file is File => !!file)
                .map(async (file) => {
                    return fileUploadService
                        .uploadPrivateFile({
                            file,
                            fileName: "image",
                            vendorId: personData.id,
                        })
                        .then((res) => {
                            if (!res) throw new Error("Файл не загрузился");

                            const uploadedFile: IImageEntity = {
                                id: res.blobPath,
                                blobPath: res.blobPath,
                                fileName: file.name,
                                type: "iamge",
                                width: 400,
                                height: 400,
                                details: [
                                    {
                                        lang: "ru",
                                        value: {
                                            title: "Документ", // или другое название
                                        },
                                    },
                                ],
                            };

                            return uploadedFile;
                        });
                });

            let uploadFiles: IImageEntity[];

            try {
                uploadFiles = await Promise.all(uploadFilesPromises);
            } catch (error) {
                notification.error({
                    message: "ошибка загрузки фото верификации",
                });
                return;
            }

            const createdVerification = await verificationService.create({
                source: {
                    Person: personData.id,
                },
                content: {
                    details: [{ lang: "ru", value: "documentPerson" }],
                    privateMedia: uploadFiles,
                },
            });

            if (createdVerification) {
                notification.success({
                    message: "сервис верификации отработал",
                });
            } else {
                notification.error({
                    message: "ошибка при отправке данных на верификацию",
                });
                return;
            }
        }
        // 📌 Финальный update
        if (bodyToPersonUpdate) {
            await personService.updatePerson(personData.id, bodyToPersonUpdate);
        }

        notification.success({
            message: "Данные успешно отправлены на модерацию",
        });

        router.push(ROUTES.PROFILE.OWNER);
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
            .updatePerson(personData.id, {
                ProfilePhotoPath: null,
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
                                        serverPhotoUrl={personData.avatar.ownerImageSrc}
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
                    Данные владельца
                </div>
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
                <div className={style.selectionBlock_title}>
                    Загрузка документов
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
