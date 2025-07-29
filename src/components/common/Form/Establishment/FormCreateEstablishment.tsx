"use client";
import {
    validDocumentFileSchema,
    validFullNameSchema,
    validImageFileSchema,
    validPhoneSchema,
    validScheduleSchema,
    validVideoFileSchema,
} from "@/lib/validationSchemas";
import style from "./establishmentForm.module.scss";
import * as Yup from "yup";
import {
    Controller,
    FormProvider,
    SubmitHandler,
    useFieldArray,
    useForm,
} from "react-hook-form";
import { useState } from "react";
import dayjs from "dayjs";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNotification } from "@/lib/context";
import { InputForm } from "@/components/UI/Input/InputForm/InputForm";
import { InputPhoneNumber } from "@/components/UI/Input/InputPhone/InputPhone";
import { UploadButton } from "../../ButtonFunctional/UploadButton";
import { Button } from "@/components/UI/Button/Button";
import { CONSTANT_TYPES_OF_ESTABLISHMENT } from "@/asset/constants/TypesOfEstablishment";
import { ISelectOption } from "@/lib/models";
import { SelectCustom } from "@/components/UI/SelectCustom/SelectCustom";
import { TTypesOfEstablishment } from "@/lib/models/types/TTypesEstablishment";

import { TSocialNetworks } from "@/lib/models/types/TSocialNetworks";
import { DeleteButton } from "../../ButtonFunctional/DeleteButton";
import { TimePickerCustom } from "../_components/TimePicker/TimePickerCustom";
import { CONSTANT_SOCIAL_NETWORKS_ARRAY } from "@/asset/constants/socialNetworks";
import { validSocialNetworksSchema } from "@/lib/validationSchemas/socialNetworksSchema";
import AddressBlockForm from "../_components/AddressBlock/AddressBlock";
import MapBlockForm from "../_components/MapBlock/MapBlockForm";
import { TextareaForm } from "@/components/UI/Textarea/TextareaForm/TextareaForm";
import TagBlockForm from "../_components/TagBlock/TagBlockForm";
import CategoryBlockForm from "../_components/CategoryBlock/CategoryBlockForm";
import {
    BlockAgreements,
    getAgreementsValidation,
} from "../../BlockFunctional/BlockAgreements";
import { TAgreementKey } from "@/lib/models/types/TAgreementKey";
import { ContactsService } from "@/lib/Api/contacts/contacts.service";
import { EstablishmentService } from "@/lib/Api/(Establishment)/establishment/establishment.service";
import { IEstablishmentCreateRequest } from "@/lib/models/api/request";
import { Loader } from "../../Loader/Loader";
import { useLocale } from "next-intl";

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
    tags: Yup.array()
        .of(Yup.string())
        .min(1, "Выберите хотя бы один тег")
        .required("Выберите хотя бы один тег"),
    categories: Yup.array()
        .of(Yup.string())
        .min(1, "Выберите хотя бы одну категорию")
        .required("Выберите хотя бы одну категорию"),
    email: Yup.string().email("Неккоректный адрес электронной почты"),
    // .required("Адрес электронной почты обязателен"),
    phone: validPhoneSchema,
    images: Yup.array().of(validImageFileSchema),
    // .min(5, "Необходимо загрузить хотя бы 5 фотографий"),
    locationId: Yup.string().required("Выбор локации обязателен"),
    coord: Yup.object().shape({
        lon: Yup.number().required("Координаты обязательны"),
        lat: Yup.number().required("Координаты обязательны"),
        addressFullLine: Yup.string(),
        addressLine: Yup.string(),
    }),
    socialNetworks: validSocialNetworksSchema,
    schedule: validScheduleSchema,
    videoVerification: Yup.array()
        .of(validVideoFileSchema)
        // .min(1, "Необходимо загрузить видео")
        .max(1, "Можно загрузить только одно видео"),
    agreements: getAgreementsValidation(agreementKeys),
});

interface IFormCreateEstablishment {}
export const FormCreateEstablishment = () => {
    const notification = useNotification();
    const [selectedSocial, setSelectedSocial] = useState<string | null>(null);

    const contactService = new ContactsService();
    const establishmentService = new EstablishmentService();
    const locale = useLocale();
    const handleSelect = (item: ISelectOption) => {
        const val = item.value as TSocialNetworks;
        if (val) {
            onAddSocial(val);
            setSelectedSocial(null);
        }
    };

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(validationSchemaRegister),
    });

    const onSubmit: SubmitHandler<TTypeForm> = async (dataForm) => {
        console.log("Form Data:", dataForm);

        const createdContacts = await contactService.createContacts({
            source: {
                Phone: dataForm.phone,
                Email: !!dataForm.email ? dataForm.email : null,
            },
        });

        if (!createdContacts) {
            notification.error({
                message: "системная ошибка. не получилось создать контакты",
            });
            return null;
        }
        const bodyEstablishment: IEstablishmentCreateRequest = {
            source: {
                CategoryIds: dataForm.categories as string[],
                ContactsId: createdContacts?.id,
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
                                name: dataForm.title,
                                description: dataForm.description,
                            },
                            location: {
                                street1: null,
                            },
                        },
                    },
                ],
            },
        };
        const createdEst = await establishmentService.createEstablishment({
            ...bodyEstablishment,
        });
        if (!createdEst) {
            notification.error({
                message: "системная ошибка. не получилось создать заведение",
            });
            return null;
        }
        notification.success({ message: "Объект отправлен на модерацию" });
    };
    const onSubmitInvalid = (e: any) => {
        console.log(e);

        notification.error({
            message: "Пожалуйста, заполните обязательные поля",
        });
    };
    // добавление соц сетей
    const { fields, append, remove } = useFieldArray({
        control,
        name: "socialNetworks",
    });
    const usedTypes = fields.map((f) => f.type);
    const availableTypes = CONSTANT_SOCIAL_NETWORKS_ARRAY.filter(
        (s) => !usedTypes.includes(s)
    );
    const onAddSocial = (type: TSocialNetworks) => {
        append({ type, url: "" });
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
    const socialOptions: ISelectOption[] = [
        { name: "Добавить соцсеть", value: "" },
        ...availableTypes.map((s) => ({
            value: s,
            name: s.charAt(0).toUpperCase() + s.slice(1),
        })),
    ];
    return (
        // <FormProvider {...methodsForm}>
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

                    {fields.map((field, index) => (
                        <div key={field.id} className={style.socialRow}>
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
            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>Время работы</div>
                <div className={style.selectionBlock_content}>
                    <Controller
                        name="schedule"
                        control={control}
                        render={({ field, fieldState }) => {
                            const isValidSchedule =
                                Array.isArray(field.value) &&
                                field.value.length === 2 &&
                                typeof field.value[0] === "string" &&
                                typeof field.value[1] === "string";

                            const timeRange = isValidSchedule
                                ? (field.value as [
                                      string | undefined,
                                      string | undefined
                                  ])
                                : null;
                            return (
                                <TimePickerCustom
                                    value={
                                        timeRange
                                            ? [
                                                  dayjs(timeRange[0], "HH:mm"),
                                                  dayjs(timeRange[1], "HH:mm"),
                                              ]
                                            : null
                                    }
                                    onChange={(val) => {
                                        if (val) {
                                            field.onChange([
                                                val[0].format("HH:mm"),
                                                val[1].format("HH:mm"),
                                            ]);
                                        } else {
                                            field.onChange(null);
                                        }
                                    }}
                                    error={fieldState.error?.message || null}
                                />
                            );
                        }}
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
            <BlockAgreements
                agreementKeys={agreementKeys}
                value={watch("agreements") as string[]}
                onChange={(vals) => setValue("agreements", vals)}
                error={errors.agreements?.message}
            />
            <Button typeLogic="submit" text={"Зарегистрировать"} />
            {isSubmitting && <Loader />}
        </form>
        // </FormProvider>
    );
};
