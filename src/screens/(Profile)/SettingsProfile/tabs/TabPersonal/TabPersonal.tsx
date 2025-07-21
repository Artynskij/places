"use client";
import style from "../../settings.module.scss";

import * as Yup from "yup";

import { useNotification } from "@/lib/context";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import {
    validAddressSchema,
    validFullNameSchema,
    validPhoneSchema,
} from "@/lib/validationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputForm } from "@/components/UI/Input/InputForm/InputForm";
import { InputPhoneNumber } from "@/components/UI/Input/InputPhone/InputPhone";
import { Button } from "@/components/UI/Button/Button";
import { TSocialNetworks } from "@/lib/models/types/TSocialNetworks";
import { SelectCustom } from "@/components/UI/SelectCustom/SelectCustom";
import { ISelectOption } from "@/lib/models";
import { useEffect, useState } from "react";

import { DeleteButton } from "@/components/common/ButtonFunctional/DeleteButton";
import { UploadButton } from "@/components/common/ButtonFunctional/UploadButton";
import { validImageFileSchema } from "@/lib/validationSchemas/file/imageArraySchema";
import { PersonService } from "@/lib/Api/(Person)/person/person.service";
import { mockPersonId } from "@/asset/mockData/mockServerData";

import { PersonNameService } from "@/lib/Api/(Person)/personName/personName.service";
import { ContactsService } from "@/lib/Api/contacts/contacts.service";
import { AddressService } from "@/lib/Api/(Person)/address/address.service";
import { SocialNetworksPersonService } from "@/lib/Api/(Person)/socialNetworksPerson/socialNetworksPerson.service";
import { ISocialContactsEntity } from "@/lib/models/api/entities/(person)/socialContacts.entity";
import { ISocialContactsRequest } from "@/lib/models/api/request/(Person)/socialContacts.request";
import { IPersonFront } from "@/lib/models/frontend/(person)/person.front";
import { validSocialNetworksSchema } from "@/lib/validationSchemas/socialNetworksSchema";
import { CONSTANT_SOCIAL_NETWORKS_ARRAY } from "@/asset/constants/socialNetworks";
import { FileUploadService } from "@/lib/Api/fileUpload/fileUploads.service";
import Image from "next/image";
import { DictionariesService } from "@/lib/Api/dictionaries/dictionaries.service";
import { TextareaForm } from "@/components/UI/Textarea/TextareaForm/TextareaForm";

type TTypeForm = Yup.InferType<typeof validationSchema>;

const validationSchema = Yup.object().shape({
    fullName: validFullNameSchema,
    email: Yup.string().email("Невалидный email").required("Email обязателен"),
    phone: validPhoneSchema,
    address: validAddressSchema,
    socialNetworks: validSocialNetworksSchema,
    avatar: Yup.array()
        .of(validImageFileSchema)
        .max(1, "Можно загрузить не более 1 фоток"),
    description: Yup.string().required("Описание обязательно"),
});
const TabPersonal = () => {
    const notification = useNotification();
    const personService = new PersonService();
    const personNameService = new PersonNameService();
    const contactsPersonService = new ContactsService();
    const addressService = new AddressService();
    const socialNetworksService = new SocialNetworksPersonService();
    const dictionariesService = new DictionariesService();
    const fileUploadService = new FileUploadService();

    const [personData, setPersonData] = useState<IPersonFront>();
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

                const socialEntity = person.socialNetworks;
                const socialNetworks =
                    socialEntity &&
                    CONSTANT_SOCIAL_NETWORKS_ARRAY.map((type) => {
                        const url = socialEntity[type];
                        if (url) return { type, url };
                        return null;
                    }).filter(Boolean); // удаляем null
                reset({
                    fullName: {
                        name: person.personName?.name || undefined,
                        secondName: person.personName?.secondName || undefined,
                        surname: person.personName?.surname || undefined,
                    },
                    address: {
                        country: person.address?.country || undefined,
                        district: person.address?.district || undefined,
                        town: person.address?.town || undefined,
                        addressLine: person.address?.street || undefined,
                        postalCode: person.address?.postalCode || undefined,
                    },
                    email: person.contacts?.email || undefined,
                    phone: person.contacts?.phone || undefined,
                    socialNetworks:
                        socialNetworks as TTypeForm["socialNetworks"],
                    description: person.aboutDescription || undefined,
                });
            }
        });
    }, [reset]);

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

    const onSubmit = async (dataForm: TTypeForm) => {
        console.log("Данные из формы UI:", dataForm);

        if (!personData) {
            notification.success({ message: "не найден пользователь" });
            return;
        }
        const bodyPersonName = {
            FirstName: dataForm.fullName.name,
            LastName: dataForm.fullName.surname,
            MiddleName: dataForm.fullName.secondName,
            OriginalLastName: dataForm.fullName.surname,
            OriginalName: dataForm.fullName.name,
        };
        const bodyContacts = { Email: dataForm.email, Phone: dataForm.phone };
        const bodyAddress = {
            Country: dataForm.address.country,
            District: dataForm.address.district,
            Town: dataForm.address.town,
            Street: dataForm.address.addressLine,
            ...(dataForm.address.postalCode !== undefined && {
                PostalCode: dataForm.address.postalCode,
            }),
        };
        const bodySocialNetworks =
            dataForm.socialNetworks && dataForm.socialNetworks.length > 0
                ? dataForm.socialNetworks?.reduce<ISocialContactsRequest>(
                      (acc, soc) => {
                          acc[soc.type] = soc.url;
                          return acc;
                      },
                      {} as ISocialContactsRequest
                  )
                : null;
        // добавление фотки

        if (dataForm.avatar) {
            const filesAvatar = dataForm.avatar;

            const file = filesAvatar[0];
            if (file) {
                const imageUrl = await fileUploadService.uploadPublicFile({
                    file: file,
                    type: "image",
                    vendorId: personData.id,
                });
                await personService.updatePerson({
                    id: personData.id,
                    body: {
                        AvatarPhotoPath: imageUrl?.blobPath,
                    },
                });
            }
            await personService.updatePerson({
                id: personData.id,
                body: {
                    About: dataForm.description,
                },
            });

            personService;
        }
        // Добавление фио

        await personNameService.updatePersonName({
            id: personData.personName?.id || null,
            body: bodyPersonName,
            idPerson: personData.id,
        });

        // Добавление контактов

        await contactsPersonService.updateContacts({
            id: personData.contacts?.id || null,
            body: bodyContacts,
            vendorId: personData.id,
        });

        // Добавление адресса

        await addressService.updateAddress({
            id: personData.address?.id || null,
            body: bodyAddress,
            idPerson: personData.id,
            contactsPersonId: personData.contacts?.id || null,
        });

        // Добавление соц сетей
        if (bodySocialNetworks) {
            await socialNetworksService.updateSocialNetworksPerson({
                id: personData.socialNetworks?.id || null,
                body: bodySocialNetworks,
                idPerson: personData.id,
                idContacts: personData.contacts?.id || null,
            });
        }

        notification.success({ message: "данные успешно сохранены" });
    };
    const onSubmitInvalid = (e: any) => {
        console.log(e);

        notification.error({
            message: "Пожалуйста, заполните обязательные поля",
        });
    };

    const [selectedSocial, setSelectedSocial] = useState<string | null>(null);

    const handleSelect = (item: ISelectOption) => {
        const val = item.value as TSocialNetworks;
        if (val) {
            onAddSocial(val);
            setSelectedSocial(null); // сброс выбора
        }
    };

    // availableTypes: TSocialNetworks[]
    const socialOptions: ISelectOption[] = [
        { name: "Добавить соцсеть", value: "" },
        ...availableTypes.map((s) => ({
            value: s,
            name: s.charAt(0).toUpperCase() + s.slice(1),
        })),
    ];
    return (
        <form
            className={style.form}
            onSubmit={handleSubmit(onSubmit, onSubmitInvalid)}
        >
            <h2>Настройки персональных данных</h2>
            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>Фото</div>
                <div className={style.selectionBlock_content}>
                    <Controller
                        control={control}
                        name="avatar"
                        render={({ field, fieldState, formState }) => (
                            <UploadButton
                                titleSpan="Загрузка аватарки"
                                accept="image"
                                value={field.value}
                                maxCount={1}
                                onChange={field.onChange}
                                error={fieldState.error || null}
                            />
                        )}
                    />
                    {personData && (
                        <Image
                            width={300}
                            height={200}
                            alt="avatar"
                            src={`${personData.avatarImg}`}
                        />
                    )}
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
                <div className={style.selectionBlock_title}>Адрес</div>
                <div className={style.selectionBlock_content}>
                    <InputForm
                        error={errors.address?.country?.message}
                        register={register("address.country")}
                        placeholder="Страна"
                        titleSpan="Страна"
                        type="text"
                    />
                    <InputForm
                        error={errors.address?.district?.message}
                        register={register("address.district")}
                        placeholder="Область"
                        titleSpan="Область"
                        type="text"
                    />
                    <InputForm
                        error={errors.address?.town?.message}
                        register={register("address.town")}
                        placeholder="Город"
                        titleSpan="Город"
                        type="text"
                    />
                    <InputForm
                        error={errors.address?.addressLine?.message}
                        register={register("address.addressLine")}
                        placeholder="Улица"
                        titleSpan="Улица"
                        type="text"
                    />
                    <InputForm
                        error={errors.address?.postalCode?.message}
                        register={register("address.postalCode")}
                        placeholder="Почтовый индекс"
                        titleSpan="Почтовый индекс"
                        type="text"
                    />
                </div>
            </div>

            <div className={style.selectionBlock}>
                {/* <div className={style.selectionBlock_title}>О Себе</div> */}
                <div className={style.selectionBlock_content}>
                    <TextareaForm
                        error={errors.description?.message}
                        register={register("description")}
                        placeholder="О себе*"
                        titleSpan="О себе"
                    />
                </div>
            </div>
            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>
                    Социальные сети
                </div>
                <div
                    className={`${style.selectionBlock_content} ${style.social}`}
                >
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
            <Button
                className={style.buttonSubmit}
                typeLogic="submit"
                text="Сохранить изменения"
            />
        </form>
    );
};
export default TabPersonal;
