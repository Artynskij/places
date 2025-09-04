"use client";
import style from "./establishmentForm.module.scss";
import * as Yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { useLocale } from "next-intl";
import {
    Controller,
    FieldError,
    SubmitHandler,
    useForm,
} from "react-hook-form";

import { IImageEntity, ISelectOption } from "@/lib/models";
import { TAgreementKey } from "@/lib/models/types";
import {
    IEstablishmentCreateRequest,
    ISocialContactsRequest,
} from "@/lib/models/api/request";

import { CONSTANT_TYPES_OF_ESTABLISHMENT } from "@/asset/constants/TypesOfEstablishment";

import { useNotification } from "@/lib/context";
import { useUser } from "@/lib/context/UserContext/UserContext";

import { EstablishmentService } from "@/lib/Api/(Establishment)/establishment/establishment.service";
import { ScheduleService } from "@/lib/Api/(Establishment)/schedule/schedule.service";
import { ContactsEstablishmentService } from "@/lib/Api/(Establishment)/contactsEstablishment/contactsEstablishment.api";
import { SocialNetworksService } from "@/lib/Api/(Person)/socialNetworksPerson/socialNetworksPerson.service";
import { TagsService } from "@/lib/Api/(Establishment)/tags/tag.service";
import { FileUploadService } from "@/lib/Api/fileUpload/fileUploads.service";

import { InputForm } from "@/components/UI/Input/InputForm/InputForm";
import { InputPhoneNumber } from "@/components/UI/Input/InputPhone/InputPhone";
import { UploadButton } from "../../ButtonFunctional/UploadButton";
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
import { getImageDimensions } from "@/lib/helpers/getImageDimensions";
import { getSchemaByTypeUser } from "./validationSchema";

import { EstablishmentPersonAssignmentApi } from "@/lib/Api/(Establishment)/establishment/establishmentAssignment.api";
import { AuthGuard } from "../../Auth/guards/AuthGuard";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/config/Routes";

import PhotoBlockForm from "../_components/PhotoBlock/PhotoBlock";

const agreementKeys: TAgreementKey[] = [
    "ConfirmedLegalAccommodation",
    "ConfirmedInformationResponsibility",
];

interface IFormCreateEstablishment {}
const FormCreateEstablishmentBase = ({}: IFormCreateEstablishment) => {
    const { user } = useUser();
    const typeUser = user?.typeUser || "tourist";
    const validationSchemaRegister = getSchemaByTypeUser(typeUser);
    const router = useRouter();

    type TTypeForm = Yup.InferType<typeof validationSchemaRegister>;

    const notification = useNotification();

    const establishmentService = new EstablishmentService();
    const establishmentAssignmentService =
        new EstablishmentPersonAssignmentApi();
    const scheduleService = new ScheduleService();
    const contactEstablishmentService = new ContactsEstablishmentService();
    const socialContactsService = new SocialNetworksService();
    const tagsService = new TagsService();
    const fileUploadService = new FileUploadService();

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
    const onSubmit: SubmitHandler<TTypeForm> = async (dataForm) => {
        if (!user) {
            notification.error({ message: "Это невозможно. User нету" });
            return;
        }
        try {
            // 1. Создание соц.сетей
            const bodySocialNetworks =
                dataForm.socialContacts?.reduce<ISocialContactsRequest>(
                    (acc, soc) => {
                        acc[soc.type] = soc.url;
                        return acc;
                    },
                    {}
                ) ?? null;

            const createdSocialContact = bodySocialNetworks
                ? await socialContactsService.createSocialNetworksPerson(
                      bodySocialNetworks
                  )
                : null;

            // 2. Создание контактов
            const createdContacts = await contactEstablishmentService.create({
                source: {
                    Email: dataForm.email || null,
                    Menu: dataForm.menu || null,
                    Phone: dataForm.phone || null,
                    SocialContactsId: createdSocialContact?.id || null,
                    Web: null,
                },
            });

            if (!createdContacts) {
                notification.error({ message: "Не удалось создать контакты" });
                return; // ⛔ Останавливаем выполнение, чтобы не продолжать с null
            }

            // 3. Создание заведения
            const bodyEstablishment: IEstablishmentCreateRequest = {
                source: {
                    CategoryIds: dataForm.categories as string[],
                    Contacts: createdContacts.id,
                    Latitude: dataForm.coord.lat,
                    Longitude: dataForm.coord.lon,
                    Locations: dataForm.locationId,
                    Type: CONSTANT_TYPES_OF_ESTABLISHMENT[
                        dataForm.typeEstablishment
                    ].id,
                },
                content: {
                    value: [
                        {
                            lang: locale,
                            value: {
                                details: {
                                    title: dataForm.title,
                                    description: dataForm.description || null,
                                },
                                seo: null,
                                location: {
                                    street1: dataForm.coord.addressLine || null,
                                },
                            },
                        },
                    ],
                    media: { gallery: null },
                },
            };

            const createdEstablishment = await establishmentService.create(
                bodyEstablishment
            );

            if (!createdEstablishment) {
                notification.error({ message: "Не удалось создать заведение" });
                return;
            }

            // 4. Создание связи персоны и заведения
            const createdPersonEstablishmentAssign =
                await establishmentAssignmentService.create({
                    source: {
                        Person: user.id, // гарантированно есть
                        Establishment: createdEstablishment.Id,
                        IsAddedByPerson: true,
                        Note: "Создание пользователем",
                        Source: "Cabinet",
                    },
                });

            if (!createdPersonEstablishmentAssign) {
                console.log(
                    "Establishment",
                    createdEstablishment.Id,
                    "Person",
                    user.id
                );

                notification.error({
                    message: "Не удалось создать связь заведение-персона",
                });
                return;
            }

            // 5. Загрузка изображений
            const filesBlobPromises =
                dataForm.images?.filter(Boolean).map(async (imageForm) => {
                    const file = imageForm as File;

                    try {
                        const dimensions = await getImageDimensions(file);

                        const res = await fileUploadService.uploadPublicFile({
                            file,
                            type: "image",
                            vendorId: createdEstablishment.Id,
                        });

                        if (!res) return null;

                        return {
                            id: res.blobPath,
                            type: "image",
                            blobPath: res.blobPath,
                            fileName: file.name,
                            details: [],
                            width: dimensions.width,
                            height: dimensions.height,
                        } as IImageEntity;
                    } catch (error) {
                        console.error("Ошибка загрузки изображения:", error);
                        return null;
                    }
                }) ?? [];

            const imageBlobFiles = (
                await Promise.all(filesBlobPromises)
            ).filter(Boolean);

            // 6. Обновление заведения с изображениями

            const updatedEstablishmentForImages =
                await establishmentService.update(createdEstablishment.Id, {
                    source: {},
                    content: {
                        value: [
                            {
                                lang: locale,
                                value: {
                                    details: {
                                        title: dataForm.title,
                                        description:
                                            dataForm.description || null,
                                    },
                                    seo: null,
                                    location: {
                                        street1:
                                            dataForm.coord.addressLine || null,
                                    },
                                },
                            },
                        ],
                        media: {
                            gallery: imageBlobFiles as IImageEntity[],
                        },
                    },
                });

            // 7. Создание расписания
            if (dataForm.schedule) {
                await Promise.all(
                    dataForm.schedule.map((schItem) =>
                        scheduleService.createScheduleDay({
                            Establishment: createdEstablishment.Id,
                            Day: schItem.day,
                            OpenTime: schItem.openTime,
                            CloseTime: schItem.closeTime,
                            Is24Hours: schItem.is24Hours,
                            IsHoliday: schItem.isHoliday,
                        })
                    )
                );
            }

            // 8. Привязка тегов
            if (dataForm.tags) {
                await Promise.all(
                    dataForm.tags
                        .filter((item) => !!item)
                        .map((tag) =>
                            tagsService.createTagEstablishmentConnect({
                                Establishment: createdEstablishment.Id,
                                Tag: tag as string,
                            })
                        )
                );
            }

            // ✅ Финальный успех
            notification.success({
                message: "Объект успешно создан и отправлен на модерацию",
            });
            console.log("Созданное заведение:", createdEstablishment.Id);
            router.replace(
                user.typeUser === "owner"
                    ? ROUTES.PROFILE.OWNER(user.id)
                    : ROUTES.PROFILE.TOURIST(user.id || "noNick")
            );
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

    const optionsTypesOfEstablishment: ISelectOption[] = [
        { name: "Выбрать тип объекта", value: "" },
        ...Object.values(CONSTANT_TYPES_OF_ESTABLISHMENT).map(
            ({ key, title }) => ({
                value: key,
                name: title,
            })
        ),
    ];

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
                                            CONSTANT_TYPES_OF_ESTABLISHMENT[
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
                                onChange={field.onChange}
                                error={fieldState.error || null}
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
                                titleSpam="Номер телефона*"
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
        // </FormProvider>
    );
};

export const FormCreateEstablishment = () => (
    <AuthGuard>
        <FormCreateEstablishmentBase />
    </AuthGuard>
);
