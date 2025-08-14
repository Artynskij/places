"use client";
import style from "./businessForm.module.scss";
import * as Yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { InputForm } from "@/components/UI/Input/InputForm/InputForm";
import { InputPhoneNumber } from "@/components/UI/Input/InputPhone/InputPhone";
import { Button } from "@/components/UI/Button/Button";
import { UploadButton } from "../../ButtonFunctional/UploadButton";

import {
    BlockAgreements,
    getAgreementsValidation,
} from "../../BlockFunctional/BlockAgreements";

import { TAgreementKey } from "@/lib/models/types/TAgreementKey";
import { useNotification } from "@/lib/context";
import {
    validAddressSchema,
    validDocumentFileSchema,
    validImageFileSchema,
    validPhoneSchema,
} from "@/lib/validationSchemas";
import { BusinessService } from "@/lib/Api/business/business.service";

import { useUser } from "@/lib/context/UserContext/UserContext";
import { useEffect } from "react";
import { ContactsPersonService } from "@/lib/Api/(Person)/contactPerson.api";
import { AddressService } from "@/lib/Api/(Person)/address/address.api";
import { VerificationService } from "@/lib/Api/verification/verification.api";
import { FileUploadService } from "@/lib/Api/fileUpload/fileUploads.service";
import { IConsentsPatchRequest, IImageEntity } from "@/lib/models";
import { ConsentsService } from "@/lib/Api/(Person)/consents/consents.service";

type TTypeForm = Yup.InferType<typeof validationSchemaRegister>;
const agreementKeys: TAgreementKey[] = [
    "ConfirmedLegalPerson",
    "ConfirmedLegalBusiness",
    "AcceptedTerms",
    "AgreedMarketing",
    "AgreedReviewsNotification",
];
const importantAgreementKeys: TAgreementKey[] = [
    "ConfirmedLegalPerson",
    "ConfirmedLegalBusiness",
    "AcceptedTerms",
];
const validationSchemaRegister = Yup.object().shape({
    fullName: Yup.object().shape({
        name: Yup.string().required("имя обязательно"),
        secondName: Yup.string(), // Отчество может быть необязательным
        surname: Yup.string().required("имя обязательно"),
    }),

    email: Yup.string()
        .email("Неккоректный адрес электронной почты")
        .required("Адрес электронной почты обязателен"),
    phone: validPhoneSchema.required("телефон обязателен"),
    documents: Yup.array()
        .of(validImageFileSchema)
        .min(1, "Необходимо загрузить хотя бы один документ")
        .max(10, "Можно загрузить не более 10 документов"),
    address: Yup.object().shape({
        country: Yup.string().required("Страна обязательна"),
        // district: Yup.string().required("Область обязательна"),
        town: Yup.string().required("Город обязателен"),
        addressLine: Yup.string().required("Адрес обязателен"),
        postalCode: Yup.string(),
    }),
    agreements: getAgreementsValidation(agreementKeys),
});

export const FormIndividual = () => {
    const notification = useNotification();
    const { user } = useUser();

    const businessService = new BusinessService();
    const contactsService = new ContactsPersonService();
    const addressService = new AddressService();
    const consentsService = new ConsentsService();
    const verificationService = new VerificationService();
    const fileUploadService = new FileUploadService();

    // const personService = new PersonService();

    // const [personData, setPersonData] = useState<IPersonFront>();

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchemaRegister),
    });

    useEffect(() => {
        // personService.getPersonById(mockPersonId).then(async (person) => {
        //     if (person) {
        //         setPersonData(person);
        //     }
        // });
    }, []);

    const onSubmit: SubmitHandler<TTypeForm> = async (formData) => {
        if (!user) {
            notification.error({ message: "нету пользователя" });
            return;
        }
        console.log("Form Data:", formData);
        // 1. Создание Адреса
        const createdAddress = await addressService
            .create({
                Country: formData.address.country,
                Town: formData.address.town,
                Street: formData.address.addressLine,
                PostalCode: formData.address.postalCode || null,
            })
            .then((res) => {
                if (res) {
                    notification.info({ message: "CREATE сущности адреса" });
                } else {
                    notification.error({ message: "ERROR сущности адреса" });
                }

                return res;
            });
        // 2. Создание Контактов
        const createdContacts = await contactsService
            .create({
                source: {
                    AddressId: createdAddress?.id || null,
                    Email: formData.email,
                    Phone: formData.phone,
                    SocialContactsId: null,
                },
            })
            .then((res) => {
                if (res) {
                    notification.info({ message: "CREATE сущности контактов" });
                } else {
                    notification.error({ message: "ERROR сущности контактов" });
                }

                return res;
            });
        // 3. Создание Бизнеса
        const officialName = `${formData.fullName.surname} ${
            formData.fullName.name
        } ${formData.fullName.surname || ""}`;
        const createdBusiness = await businessService.createBusiness(
            {
                Contacts: createdContacts?.id || null,
                OfficialName: officialName,
                RegistrationDate: null,
                RegistrationNumber: null,
            },
            user.id
        );

        if (createdBusiness) {
            notification.info({ message: "CREATE сущности бизнеса" });
        } else {
            notification.error({ message: "ERROR сущности бизнеса" });
            return;
        }
        // 4. Создание Согласий
        const defaultConsents: IConsentsPatchRequest | null =
            formData.agreements
                ? formData.agreements.reduce((acc, key) => {
                      acc[key as keyof IConsentsPatchRequest] = true;
                      return acc;
                  }, {} as IConsentsPatchRequest)
                : null;
        const createdConsents = await consentsService.createConsents({
            ...defaultConsents,
            Business: createdBusiness.Id,
        });
        if (createdConsents) {
            notification.info({ message: "CREATE сущности Consents" });
            console.log(defaultConsents);
            console.log(createdConsents);
        } else {
            notification.error({ message: "ERROR сущности Consents" });
            return;
        }

        // 5. Создание Верификации

        const documentFiles = formData.documents;
        if (documentFiles) {
            const uploadFilesPromises: Promise<IImageEntity>[] = documentFiles
                .filter((file): file is File => !!file)
                .map(async (file) => {
                    return fileUploadService
                        .uploadPrivateFile({
                            file,
                            fileName: "image",
                            vendorId: createdBusiness.Id,
                        })
                        .then((res) => {
                            if (!res) throw new Error("Файл не загрузился");

                            const uploadedFile: IImageEntity = {
                                id: res.blobPath,
                                blobPath: res.blobPath,
                                fileName: file.name,
                                type: "image",
                                width: 400,
                                height: 400,
                                details: [
                                    {
                                        lang: "ru",
                                        value: {
                                            title: "Документ физического лица", // или другое название
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
                    Business: createdBusiness.Id,
                },
                content: {
                    details: [
                        { lang: "ru", value: "documentBusinessIndividual" },
                    ],
                    privateMedia: uploadFiles,
                },
            });

            if (createdVerification) {
                notification.info({
                    message: "CREATE верификации отработал",
                });
            } else {
                notification.error({
                    message: "ERROR ошибка при отправке данных на верификацию",
                });
                return;
            }
        }

        console.log("businessId", createdBusiness?.Id);

        notification.success({ message: "Бизнес отправлен на модерацию" });
    };
    const onSubmitInvalid = () => {
        notification.error({
            message: "Пожалуйста, заполните обязательные поля",
        });
    };

    return (
        <form
            className={style.form}
            onSubmit={handleSubmit(onSubmit, onSubmitInvalid)}
        >
            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>ФИО</div>
                <div className={style.selectionBlock_content}>
                    <InputForm
                        error={errors.fullName?.name?.message}
                        register={register("fullName.name")}
                        placeholder="Имя*"
                        titleSpan="Имя согласно удостоверению личности"
                        type="text"
                    />
                    <InputForm
                        error={errors.fullName?.secondName?.message}
                        register={register("fullName.secondName")}
                        placeholder="Второе имя"
                        titleSpan="Второе имя (отчество) согласно удостоверению личности"
                        type="text"
                    />
                    <InputForm
                        error={errors.fullName?.surname?.message}
                        register={register("fullName.surname")}
                        placeholder="Фамилия*"
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
                        titleSpan="Адрес электронной почты"
                        type="email"
                    />

                    <Controller
                        control={control}
                        name="phone"
                        render={({ field, fieldState }) => (
                            <InputPhoneNumber<"phone">
                                field={field}
                                error={fieldState.error || null}
                                titleSpam="Номер телефона*"
                            />
                        )}
                    />
                </div>
            </div>

            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>
                    Адрес регистрации
                </div>
                <div className={style.selectionBlock_content}>
                    <InputForm
                        error={errors.address?.country?.message}
                        register={register("address.country")}
                        titleSpan="Страна*"
                        type="text"
                    />
                    {/* <InputForm
                        error={errors.address?.district?.message}
                        register={register("address.district")}
                        titleSpan="Область*"
                        type="text"
                    /> */}
                    <InputForm
                        error={errors.address?.town?.message}
                        register={register("address.town")}
                        titleSpan="Город*"
                        type="text"
                    />
                    <InputForm
                        error={errors.address?.addressLine?.message}
                        register={register("address.addressLine")}
                        titleSpan="Адрес – улица, дом, корпус, квартира/офис*"
                        type="text"
                    />
                    <InputForm
                        error={errors.address?.postalCode?.message}
                        register={register("address.postalCode")}
                        titleSpan="Почтовый индекс"
                        type="text"
                    />
                </div>
            </div>
            <div className={style.selectionBlock}>
                <div className={style.selectionBlock_title}>
                    Документы подтверждающие личность
                </div>
                <div className={style.selectionBlock_content}>
                    <Controller
                        name="documents"
                        control={control}
                        defaultValue={[]}
                        render={({ field, fieldState }) => (
                            <UploadButton
                                titleSpan="Прикрепление подтверждающих документов*"
                                accept="image"
                                maxSizeMB={10}
                                maxCount={10}
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
            <Button
                className={style.buttonAccept}
                typeLogic="submit"
                text={"Зарегистрировать"}
            />
        </form>
    );
};
