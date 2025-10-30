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

import { IEstablishmentFront, IOption } from "@/lib/models";

import {
    IEstablishmentCreateRequest,
    ISocialContactsRequest,
} from "@/lib/models/server/request";

import { CONSTANT_TYPES_OF_ESTABLISHMENT_DB } from "@/asset/constants/database/types-of-establishment";

import { useNotification } from "@/lib/context";
import { EstablishmentService } from "@/lib/Api/(Establishment)/establishment/establishment.service";

import { InputForm } from "@/components/UI/Input/InputForm/InputForm";
import { InputPhoneNumber } from "@/components/UI/Input/InputPhone/InputPhone";

import { Button } from "@/components/UI/Button/Button";

import { SelectCustom } from "@/components/UI/SelectCustom/SelectCustom";

import { Loader } from "../../Loader/Loader";

import AddressBlockForm from "../_components/AddressBlock/AddressBlock";
import MapBlockForm from "../_components/MapBlock/MapBlockForm";
import TagBlockForm from "../_components/TagBlock/TagBlockForm";
import CategoryBlockForm from "../_components/CategoryBlock/CategoryBlockForm";
import { ScheduleBlockForm } from "../_components/ScheduleBlock/ScheduleBlock";
import { SocialContactsBlockForm } from "../_components/SocialContacts/SocialContacts";
// import { ScheduleService } from "@/lib/Api/(Establishment)/schedule/schedule.service";

import { TagsService } from "@/lib/Api/(Establishment)/tags/tag.service";
import { FileUploadService } from "@/lib/Api/fileUpload/fileUploads.service";

import { validationSchemaEstablishmentUpdate } from "./validationSchema";

import { ModalCustom } from "@/components/UI/ModalCustom/ModalCustom";
import { useEffect, useState } from "react";
import { useUser } from "@/lib/context/UserContext/UserContext";
import { GeneralEstablishmentService } from "@/lib/Api/(MainService)/establishment.general";
import { FormLanguagesBlock } from "../_components/ContentBlock/ContentBlock";

import PhotoBlockForm from "../_components/PhotoBlock/PhotoBlock";

import { SpinnerAnt } from "../../Spinner/SpinnerAnt";
import { CONSTANT_MESSANGER_NETWORKS_ARRAY, CONSTANT_SOCIAL_NETWORKS_ARRAY } from "@/asset/constants/social-networks.const";
import { ScheduleService } from "@/lib/Api/(Establishment)/schedule.api";
import { SocialNetworksService } from "@/lib/Api/social-networks.api";
interface IFormCreateEstablishment {
    establishmentId: string;
    closeModal?: (value: false) => void;
}
const FormUpdateEstablishmentBase = ({
    establishmentId,
    closeModal,
}: IFormCreateEstablishment) => {
    const { user } = useUser();
    const typeUser = user?.typeUser || "admin";
    const schema = validationSchemaEstablishmentUpdate;
    type TTypeForm = Yup.InferType<typeof schema>;

    const [mounted, setMounted] = useState(false);
    const [initialFormData, setInitialFormData] = useState<TTypeForm>();
    const [establishment, setEstablishment] = useState<IEstablishmentFront>();
    const notification = useNotification();

    const generalEstablishmentService = new GeneralEstablishmentService();
    const establishmentService = new EstablishmentService();
    const socialNetworksService = new SocialNetworksService();

    const scheduleService = new ScheduleService();

    const tagsService = new TagsService();

    const locale = useLocale();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        watch,
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            content: [],
        },
    });
    const typeEstablishment = watch("typeEstablishment");
    const locationId = watch("locationId");

    useEffect(() => {
        const getAllData = async () => {
            const establishment = await establishmentService.getById(
                establishmentId
            );
            if (!establishment) {
                return;
            }
            setEstablishment(establishment);
            const scheduleRes =
                await scheduleService.getScheduleByEstablishmentId(
                    establishment.id
                );
            const tagResponse = await tagsService.getAllTagsOfEstablishment({
                lang: locale,
                establishmentIds: [establishment.id],
            });

            const socialEntity = establishment.contacts?.socialNetworksId
                ? await socialNetworksService.getById(
                    establishment.contacts?.socialNetworksId
                )
                : null;
            const socialNetworks =
                socialEntity &&
                CONSTANT_SOCIAL_NETWORKS_ARRAY.map((type) => {
                    const url = socialEntity[type];
                    if (url) return { type, url };
                    return null;
                }).filter(Boolean); // удаляем null
            const initialForm: TTypeForm = {
                typeEstablishment: establishment.typeEstablishment,
                categories: establishment.categoriesAll.map((cat) => cat.id),
                coord: {
                    lat: establishment.location.latitude,
                    lon: establishment.location.longitude,
                    addressFullLine: establishment.location.street || null,
                    addressLine: establishment.location.street || null,
                },
                locationId: establishment.location.town.id,
                email: establishment.contacts?.email || "",
                phone: establishment.contacts?.phone || "",

                images:
                    establishment.media.gallery?.map((media, idx) => ({
                        uid: `existing_${idx}`,
                        name: media.title || `file-${idx}`,
                        status: "done",
                        url: media.src,
                    })) || [],
                menu: establishment.contacts?.menu || "",
                tags: tagResponse
                    ? tagResponse.map((item) => item.tag.id.toString())
                    : [],

                schedule: scheduleRes ? scheduleRes : [],
                content:
                    establishment.content?.value?.map((content) => ({
                        ...content,
                        value: {
                            ...content.value,
                            seo:
                                content.value.seo ??
                                content.value.seoTrip ??
                                null,
                            seoTrip: content.value.seoTrip ?? null,
                            // location:content.value.location,
                            details: {
                                title: content.value.details.title || "",
                                description:
                                    content.value.details.description || "",
                            },
                        },
                    })) ?? [],
                socialContacts: socialNetworks as TTypeForm["socialContacts"],
            };

            setInitialFormData(initialForm);
            reset(initialForm);
            setMounted(true);
        };

        getAllData();
    }, [establishmentId, reset]);
    const onSubmit: SubmitHandler<TTypeForm> = async (formData) => {
        if (!user) {
            notification.error({ message: "Это невозможно. User нету" });
            return;
        }
        if (!initialFormData) {
            notification.error({ message: "Это невозможно. initialForm нету" });
            return;
        }
        if (!establishment) {
            notification.error({
                message: "Это невозможно. establishment нету",
            });
            return;
        }
        try {
            const success = await generalEstablishmentService.update({
                initialForm: initialFormData,
                establishment: establishment,
                formData: formData,
                userId: user.id,
            });
            if (success) {
                notification.success({
                    message: "Объект успешно обновлен и отправлен на модерацию",
                });
                closeModal && closeModal(false);
            } else {
                notification.error({
                    message: "Нету изменённых данных",
                });
            }
        } catch (error) {
            console.error("Ошибка при обновлении объекта:", error);
            notification.error({
                message: "Произошла ошибка при обновлении объекта",
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
            ({ key, title }) => ({
                value: key,
                label: title,
            })
        ),
    ];
    if (!mounted) return <SpinnerAnt></SpinnerAnt>;
    return (
        <form
            className={style.form}
            onSubmit={handleSubmit(onSubmit, onSubmitInvalid)}
        >
            {/* <h2>Создание объекта</h2> */}
            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>
                    Название и описание
                </div>
                <div className={style.selectionBlock_content}>
                    <Controller
                        name="content"
                        control={control}
                        defaultValue={[]}
                        render={({ field, fieldState }) => (
                            <FormLanguagesBlock
                                value={field.value}
                                onChange={field.onChange}
                                errors={fieldState.error}
                                withSeo={typeUser === "admin"} // 👈 SEO только в админке
                            />
                        )}
                    />
                </div>
            </div>
            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_content}>
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
                                value={{
                                    lon: field.value.lon,
                                    lat: field.value.lat,
                                    addressFullLine:
                                        field.value.addressFullLine || null,
                                    addressLine:
                                        field.value.addressLine || null,
                                }}
                                onChange={field.onChange}
                                error={fieldState.error || null}
                                locationId={locationId || null}
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
                    <>
                        <PhotoBlockForm
                            error={fieldState.error || null}
                            onChange={field.onChange}
                            value={field.value?.filter((item) => !!item) || []}
                        // downloadedValue={establishment.media.gallery}
                        />
                    </>
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
                        titleSpan="Адрес электронной почты"
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
                                titleSpan="Социальные сети"
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
                                titleSpan="Месенджеры"
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
                    {/* <TextareaForm
                        error={errors.description?.message}
                        register={register("description")}
                        placeholder="Описание объекта*"
                        titleSpan="Описание объекта"
                    /> */}
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

            <Button
                className={style.form_buttonSubmit}
                typeLogic="submit"
                text={"Обновить"}
            />
            {isSubmitting && <Loader />}
        </form>
    );
};
interface IProp {
    children: React.ReactNode | React.ReactNode[] | null;
    establishment: IEstablishmentFront;
}
export const FormUpdateEstablishment = ({ children, establishment }: IProp) => {
    const [modalCreateActive, setModalCreateActive] = useState(false);

    return (
        <>
            <div onClick={() => setModalCreateActive(true)}>{children}</div>
            {/* <AuthGuard> */}

            <ModalCustom
                title="Обновить объект"
                view="middle"
                active={modalCreateActive}
                closeModal={() => {
                    setModalCreateActive(false);
                }}
            >
                <div className="container">
                    {modalCreateActive && (
                        <FormUpdateEstablishmentBase
                            establishmentId={establishment.id}
                            closeModal={setModalCreateActive}
                        />
                    )}
                </div>
            </ModalCustom>

            {/* </AuthGuard> */}
        </>
    );
};
