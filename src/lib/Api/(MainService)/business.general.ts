import { TAgreementKey } from "./../../models/types/TAgreementKey";
import * as Yup from "yup";
import {
    IBusinessFront,
    IConsentsPatchRequest,
    IImageEntity,
} from "@/lib/models";
import { AddressService } from "../(Person)/address/address.api";
import { ConsentsService } from "../(Person)/consents/consents.service";
import { ContactsPersonService } from "../(Person)/contactPerson.api";
import { BusinessService } from "../business/business.service";
import { DataLoadManagementService } from "../dataLoadManagement/dataLoadManagement.service";
import { FileUploadService } from "../fileUpload/fileUploads.service";
import { VerificationService } from "../verification/verification.api";
// import { validationUpdateBusinessSchema } from "@/lib/validationSchemas/business/updateBusiness.schema";
import { getSimpleObjectDiff } from "@/lib/helpers/getChangedFieldsForApi";

import {
    validationBusinessIndividualSchema,
    validationBusinessLegalEntitySchema,
    validationBusinessSoleProprietorSchema,
} from "@/lib/validationSchemas/business/businessValid.schema";

type TypeFormIndividual = Yup.InferType<
    typeof validationBusinessIndividualSchema
>;
type TypeFormSole = Yup.InferType<
    typeof validationBusinessSoleProprietorSchema
>;
type TypeFormLegal = Yup.InferType<typeof validationBusinessLegalEntitySchema>;
type TypeForm = TypeFormIndividual | TypeFormSole | TypeFormLegal;
interface IProp {
    activeTab: string;
    formData: TypeForm;
    userId: string;
    locale: string;
    business?: IBusinessFront;
    initialForm?: TypeForm;
}

export class GeneralBusinessService {
    private businessService: BusinessService;
    private contactsService: ContactsPersonService;
    private addressService: AddressService;
    private consentsService: ConsentsService;
    private verificationService: VerificationService;
    private fileUploadService: FileUploadService;
    private dataLoadManagementService: DataLoadManagementService;
    constructor() {
        this.businessService = new BusinessService();
        this.contactsService = new ContactsPersonService();
        this.addressService = new AddressService();
        this.consentsService = new ConsentsService();
        this.verificationService = new VerificationService();
        this.fileUploadService = new FileUploadService();
        this.dataLoadManagementService = new DataLoadManagementService();
    }
    async create({
        activeTab,
        formData,
        userId,
        locale,
    }: IProp): Promise<Boolean> {
        // 1. Создание Адреса
        const createdAddress = await this.addressService.create({
            Country: formData.address.country,
            Town: formData.address.town,
            Street: formData.address.addressLine,
            PostalCode: formData.address.postalCode || null,
        });

        if (!createdAddress) {
            console.error("ERROR сущности адреса. Может Email такой уже есть");
            return false;
        }
        // 2. Создание Контактов
        const createdContacts = await this.contactsService.create({
            source: {
                Address: createdAddress?.id || null,
                Email: formData.email,
                Phone: formData.phone,
                SocialContacts: null,
            },
        });

        if (!createdContacts) {
            console.error("ERROR сущности контактов");
            return false;
        }
        // 3. Создание Бизнеса
        const legalType = (
            await this.dataLoadManagementService.getBusinessLegalTypes(locale)
        )?.find(
            (item) =>
                item.code.toLocaleLowerCase() === activeTab.toLocaleLowerCase()
        );
        if (!legalType) {
            console.error("ERROR LEGAL_TYPE");
            return false;
        }
        const createdBusiness = await this.businessService
            .createBusiness(
                {
                    source: {
                        LegalType: legalType?.id,
                        Contacts: createdContacts?.id || null,
                        OfficialName: formData.officialName,
                        RegistrationDate: formData.dateRegister || null,
                        RegistrationNumber: formData.numberOrganization || null,
                    },
                },
                userId
            )
            .then((res) => {
                return res.business;
            });

        if (!createdBusiness) {
            console.error("ERROR сущности бизнеса");
            return false;
        }
        // 4. Создание Согласий
        const defaultConsents: IConsentsPatchRequest | null =
            formData.agreements
                ? formData.agreements.reduce((acc, key) => {
                      acc[key as keyof IConsentsPatchRequest] = true;
                      return acc;
                  }, {} as IConsentsPatchRequest)
                : null;
        const createdConsents = await this.consentsService.createConsents({
            ...defaultConsents,
            Business: createdBusiness.Id,
        });
        if (!createdConsents) {
            console.error("ERROR сущности Consents");
            return false;
        }

        // 5. Создание Верификации

        const documentFiles = formData.documentsVerify;
        if (documentFiles) {
            const uploadFilesPromises: Promise<IImageEntity>[] = documentFiles
                .filter((file): file is File => !!file)
                .map(async (file) => {
                    return this.fileUploadService
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
                console.error("ошибка загрузки фото верификации");
                return false;
            }
            const createdVerification = await this.verificationService.create({
                source: {
                    Business: createdBusiness.Id,
                },
                content: {
                    details: [
                        { lang: "ru", value: "documentBusinessIndividual" },
                    ],
                    media: { gallery: uploadFiles },
                },
            });

            if (!createdVerification) {
                console.error(
                    "ERROR ошибка при отправке данных на верификацию"
                );
                return false;
            }
        }
        return true;
    }
    async update({
        formData,

        business,
        initialForm,
    }: IProp): Promise<Boolean> {
        if (!business || !initialForm) return false;

        const changes = getSimpleObjectDiff<TypeForm>(initialForm, formData);
        delete (changes as TypeForm).documentsVerify;

        delete (changes as TypeForm).agreements;
        // delete (changes as TypeForm).dateRegister;
        // return false;
        console.log(changes);
        if (Object.keys(changes).length === 0) {
            return false;
        }

        // 📌 Финальное тело для обновления бизнеса
        const bodyToBusinessUpdate: any = { source: {} };

        // --- Основные поля бизнеса ---
        if ("officialName" in changes) {
            bodyToBusinessUpdate.source.OfficialName =
                changes.officialName ?? null;
        }
        if ("legalType" in changes) {
            bodyToBusinessUpdate.source.LegalType = changes.legalType ?? null;
        }
        if ("dateRegister" in changes) {
            bodyToBusinessUpdate.source.RegistrationDate =
                changes.dateRegister ?? null;
        }
        if ("numberOrganization" in changes) {
            bodyToBusinessUpdate.source.RegistrationNumber =
                changes.numberOrganization ?? null;
        }

        // --- Адрес ---

        if ("address" in changes) {
            const addr: Partial<TypeFormIndividual["address"]> =
                changes.address || {};

            const bodyAddress: Record<string, string> = {};

            if (addr.country !== undefined) bodyAddress.Country = addr.country;
            if (addr.town !== undefined) bodyAddress.Town = addr.town;
            if (addr.addressLine !== undefined)
                bodyAddress.Street = addr.addressLine;
            if (addr.postalCode !== undefined)
                bodyAddress.PostalCode = addr.postalCode;

            if (
                Object.keys(bodyAddress).length > 0 &&
                business.Contacts?.Address?.Id
            ) {
                await this.addressService.update(
                    business.Contacts.Address.Id,
                    bodyAddress
                );
            }
        }

        // --- Контакты ---
        if ("email" in changes || "phone" in changes) {
            const bodyContacts = {
                Email:
                    "email" in changes
                        ? changes.email
                        : business.Contacts?.Email ?? null,
                Phone:
                    "phone" in changes
                        ? changes.phone
                        : business.Contacts?.Phone ?? null,
            };

            const contactsRes = await this.contactsService.updateOrCreate(
                business.Contacts?.Id || null,
                { source: bodyContacts }
            );

            if (contactsRes) {
                bodyToBusinessUpdate.source.Contacts = contactsRes.id;
            }
        }

        // --- Документы ---
        if ("documentsVerify" in changes) {
            const documentFiles = formData.documentsVerify;
            if (documentFiles) {
                const uploadFilesPromises: Promise<IImageEntity>[] =
                    documentFiles
                        .filter((file): file is File => !!file)
                        .map(async (file) => {
                            return this.fileUploadService
                                .uploadPrivateFile({
                                    file,
                                    fileName: "image",
                                    vendorId: business.Id,
                                })
                                .then((res) => {
                                    if (!res)
                                        throw new Error("Файл не загрузился");

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
                    console.error("ошибка загрузки фото верификации");
                    return false;
                }
                const createdVerification =
                    await this.verificationService.create({
                        source: {
                            Business: business.Id,
                        },
                        content: {
                            details: [
                                {
                                    lang: "ru",
                                    value: "documentBusinessIndividual",
                                },
                            ],
                            media: { gallery: uploadFiles },
                        },
                    });

                if (!createdVerification) {
                    console.error(
                        "ERROR ошибка при отправке данных на верификацию"
                    );
                    return false;
                }
            }
        }

        // --- Финальный update бизнеса ---
        if (Object.keys(bodyToBusinessUpdate.source).length > 0) {
            await this.businessService.updateBusiness(
                business.Id,
                bodyToBusinessUpdate
            );
        }

        return true;
    }
}
