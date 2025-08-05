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

import {
    validImageFileSchema,
    validPhoneSchema,
    validScheduleSchema,
    validVideoFileSchema,
    validSocialNetworksSchema,
} from "@/lib/validationSchemas";
import { ISelectOption } from "@/lib/models";
import { TTypesOfEstablishment, TAgreementKey } from "@/lib/models/types";
import {
    IEstablishmentCreateRequest,
    ISocialContactsRequest,
} from "@/lib/models/api/request";

import { CONSTANT_TYPES_OF_ESTABLISHMENT } from "@/asset/constants/TypesOfEstablishment";

import { useNotification } from "@/lib/context";
import { EstablishmentService } from "@/lib/Api/(Establishment)/establishment/establishment.service";

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
import { ScheduleService } from "@/lib/Api/(Establishment)/schedule/schedule.service";
import { ContactsEstablishmentService } from "@/lib/Api/(Establishment)/contactsEstablishment/contactsEstablishment.api";
import { SocialNetworksService } from "@/lib/Api/(Person)/socialNetworksPerson/socialNetworksPerson.service";

type TTypeForm = Yup.InferType<typeof validationSchemaRegister>;
const agreementKeys: TAgreementKey[] = [
    "ConfirmedLegalAccommodation",
    "ConfirmedInformationResponsibility",
];
const validationSchemaRegister = Yup.object().shape({
    title: Yup.string().required("Название заведения обязательно"),
    description: Yup.string().required("Описание обязательно"),
    typeEstablishment: Yup.mixed<TTypesOfEstablishment>()
        .oneOf(
            Object.values(CONSTANT_TYPES_OF_ESTABLISHMENT).map(
                (el) => el.key as TTypesOfEstablishment
            ),
            "Неверный тип объекта"
        )
        .required("Тип объекта обязателен"),
    tags: Yup.array().of(Yup.string()).min(1, "Выберите хотя бы один тег"),
    // .required("Выберите хотя бы один тег"),
    categories: Yup.array()
        .of(Yup.string())
        .min(1, "Выберите хотя бы одну категорию")
        .required("Выберите хотя бы одну категорию"),
    menu: Yup.string()
        .url("Невалидный URL")
        .when("typeEstablishment", {
            is: (val: TTypesOfEstablishment) => val === "EATER",
            then: (schema) => schema.required("Введите ссылку на меню"),
            otherwise: (schema) => schema.notRequired(),
        }),
    email: Yup.string()
        .email("Неккоректный адрес электронной почты")
        .required("Адрес электронной почты обязателен"),
    phone: validPhoneSchema.required("телефон обязателен"),
    images: Yup.array().of(validImageFileSchema),
    // .min(5, "Необходимо загрузить хотя бы 5 фотографий"),
    locationId: Yup.string().required("Выбор локации обязателен"),
    coord: Yup.object().shape({
        lon: Yup.number().required("Координаты обязательны"),
        lat: Yup.number().required("Координаты обязательны"),
        addressFullLine: Yup.string(),
        addressLine: Yup.string(),
    }),
    socialContacts: validSocialNetworksSchema,
    schedule: validScheduleSchema,
    videoVerification: Yup.array()
        .of(validVideoFileSchema)
        // .min(1, "Необходимо загрузить видео")
        .max(1, "Можно загрузить только одно видео"),
    // agreements: getAgreementsValidation(agreementKeys),
});

interface IFormCreateEstablishment {}
export const FormCreateEstablishment = () => {
    const notification = useNotification();

    const establishmentService = new EstablishmentService();
    const scheduleService = new ScheduleService();
    const contactEstablishmentService = new ContactsEstablishmentService();
    const socialContactsService = new SocialNetworksService();
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
        console.log("Form Data:", dataForm);
        if (!dataForm.schedule) {
            notification.error({
                message: "WTF MF",
            });
            return;
        }
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
            notification.error({
                message: "системная ошибка. не получилось создать контакты",
            });
            return null;
        } else {
            notification.success({
                message: "contact entity созданы",
            });
        }
        const bodyEstablishment: IEstablishmentCreateRequest = {
            source: {
                CategoryIds: dataForm.categories as string[],
                Contacts: createdContacts.id,
                Latitude: dataForm.coord.lat,
                Longitude: dataForm.coord.lon,
                Locations: dataForm.locationId,
                // Moderate: false,
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
                                description: dataForm.description,
                            },
                            seo: null,
                            location: {
                                street1: !!dataForm.coord.addressLine
                                    ? (dataForm.coord.addressLine as string)
                                    : null,
                            },
                        },
                    },
                ],
                media: { gallery: null },
            },
        };
        // создание establishment
        const createdEst = await establishmentService.createEstablishment({
            ...bodyEstablishment,
        });
        if (!createdEst) {
            notification.error({
                message: "системная ошибка. не получилось создать заведение",
            });
            return null;
        }
        notification.success({ message: "establishmentService отработал" });
        // создание расписаний
        const scheduleRes = dataForm.schedule
            ? await Promise.all(
                  dataForm.schedule.map((schItem) =>
                      scheduleService.createScheduleDay({
                          Establishment: createdEst.Id,
                          Day: schItem.day,
                          OpenTime: schItem.openTime,
                          CloseTime: schItem.closeTime,
                          Is24Hours: schItem.is24Hours,
                          IsHoliday: schItem.isHoliday,
                      })
                  )
              )
            : null;
        if (!scheduleRes) {
            notification.error({
                message: "Не получилось создать расписание или привязать его",
            });
        }
        // привязка тегов
        console.log("созданное заведение", createdEst.Id);

        notification.success({ message: "Объект отправлен на модерацию" });
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

                    <Controller
                        name="categories"
                        control={control}
                        render={({ field, fieldState }) => (
                            <div className={style.selectBlock}>
                                <label>Категория объекта*</label>
                                <CategoryBlockForm
                                    selectedCategories={field.value as string[]}
                                    onChange={field.onChange}
                                    error={fieldState.error || null}
                                />
                            </div>
                        )}
                    />
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
            <Controller
                name="images"
                control={control}
                defaultValue={[]}
                render={({ field, fieldState }) => (
                    <UploadButton
                        titleSpan="Прикрепление фотографии объекта*"
                        accept="image"
                        maxSizeMB={10}
                        maxCount={100}
                        value={field.value}
                        onChange={field.onChange}
                        error={fieldState.error || null}
                    />
                )}
            />
            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>
                    Контактные данные
                </div>
                <div className={style.selectionBlock_content}>
                    <InputForm
                        error={errors.email?.message}
                        register={register("email")}
                        placeholder="Адрес электронной почты*"
                        titleSpan="Адрес электронной почты(для тестов пока не обязательное) НАСТЯ, Я ВЕРНУ, ТОК НАПОМНИ"
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
            {/* <BlockAgreements
                agreementKeys={agreementKeys}
                value={watch("agreements") as string[]}
                onChange={(vals) => setValue("agreements", vals)}
                error={errors.agreements?.message}
            /> */}
            <Button className={style.form_buttonSubmit} typeLogic="submit" text={"Зарегистрировать"} />
            {isSubmitting && <Loader />}
        </form>
        // </FormProvider>
    );
};
