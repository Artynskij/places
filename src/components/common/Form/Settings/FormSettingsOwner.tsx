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
// import { ContactsService } from "@/lib/Api/contacts/contacts.service";
import { ContactsService } from "@/lib/Api/contacts/contact.api";
import { AddressService } from "@/lib/Api/(Person)/address/address.api";
// import { AddressService } from "@/lib/Api/(Person)/address/address.service";
import { SocialNetworksPersonService } from "@/lib/Api/(Person)/socialNetworksPerson/socialNetworksPerson.service";

import { ISocialContactsRequest } from "@/lib/models/api/request/(Person)/socialContacts.request";
import { IPersonFront } from "@/lib/models/frontend/(person)/person.front";
import { validSocialNetworksSchema } from "@/lib/validationSchemas/socialNetworksSchema";
import { CONSTANT_SOCIAL_NETWORKS_ARRAY } from "@/asset/constants/socialNetworks";
import { FileUploadService } from "@/lib/Api/fileUpload/fileUploads.service";
import Image from "next/image";
import { DataLoadManagementService } from "@/lib/Api/dataLoadManagement/dataLoadManagement.service";
import { TextareaForm } from "@/components/UI/Textarea/TextareaForm/TextareaForm";
import { IPersonRequest } from "@/lib/models/api/request/(Person)/person.request";
import { IContactsRequest } from "@/lib/models/api/request/contacts/contacts.request";
import { SocialContactsBlockForm } from "../_components/SocialContacts/SocialContacts";
import { getObjectDiffWithNulls } from "@/lib/helpers/getChangedFieldsForApi";
import { IPersonNameCreateRequest } from "@/lib/models/api/request/(Person)/personName.request";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/config/Routes";
import { Loader } from "../../Loader/Loader";
import { DeleteButton } from "../../ButtonFunctional/DeleteButton";
import { GenderBlockForm } from "../_components/GenderBlock/GenderBlock";
import { InputDate } from "@/components/UI/Input/InputDate/InputDate";
import { parseDateToISO } from "@/lib/helpers/getFormatDate";
import { SpanErrorForm } from "@/components/UI/Span/SpanErrorForm";

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
    const addressService = new AddressService();
    const contactsPersonService = new ContactsService();
    const socialNetworksService = new SocialNetworksPersonService();
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
        console.log("Данные из формы UI:", dataForm);

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
                bodyToPersonUpdate.ProfilePhotoPath = imageUrl?.blobPath;
            } else {
                bodyToPersonUpdate.ProfilePhotoPath = null;
            }
        }

        //  Обработка описания

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

        // 📌 Финальный update
        if (bodyToPersonUpdate) {
            await personService.updatePerson(personData.id, bodyToPersonUpdate);
        }

        notification.success({ message: "Данные успешно сохранены" });
        setTimeout(() => {
            router.push(ROUTES.PROFILE.TOURIST("sherlock_bones"));
        }, 3000);
    };

    const onSubmitInvalid = (e: any) => {
        console.log(e);

        notification.error({
            message: "Пожалуйста, заполните обязательные поля",
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
                <div className={style.selectionBlock_title}>Фото</div>
                <div className={style.selectionBlock_content}>
                    <div className={style.avatar}>
                        {personData?.profileImg && (
                            <Image
                                className={style.avatar_img}
                                width={96}
                                height={96}
                                alt="avatar"
                                src={personData.profileImg}
                            />
                        )}
                        <div className={style.avatar_buttons}>
                            <Controller
                                control={control}
                                name="avatar"
                                render={({ field, fieldState }) => (
                                    <UploadButton
                                        type="box"
                                        titleSpan="Загрузить Аватар"
                                        titleButton={
                                            personData.profileImg
                                                ? "Изменить фотографию"
                                                : "Добавить фотографию"
                                        }
                                        accept="image"
                                        value={field.value}
                                        maxCount={1}
                                        onChange={field.onChange}
                                        error={fieldState.error || null}
                                        className={style.avatar_upload}
                                    />
                                )}
                            />
                            {personData?.profileImg && (
                                <DeleteButton
                                    onClick={async () => {
                                        await personService.updatePerson(
                                            personData.id,
                                            { ProfilePhotoPath: null }
                                        );
                                        notification.success({
                                            message:
                                                "Фотография успешно удалена",
                                        });
                                    }}
                                />
                            )}
                        </div>
                    </div>
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
