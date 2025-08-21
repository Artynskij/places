import { TAgreementKey } from "./../../models/types/TAgreementKey";
import * as Yup from "yup";
import { IConsentsPatchRequest, IImageEntity } from "@/lib/models";
import { AddressService } from "../(Person)/address/address.api";
import { ConsentsService } from "../(Person)/consents/consents.service";
import { ContactsPersonService } from "../(Person)/contactPerson.api";
import { BusinessService } from "../business/business.service";
import { DataLoadManagementService } from "../dataLoadManagement/dataLoadManagement.service";
import { FileUploadService } from "../fileUpload/fileUploads.service";
import { VerificationService } from "../verification/verification.api";

interface IPropCreate {
    activeTab: string;
    formData: {
        officialName: string;
        numberOrganization: string | null;
        dateRegister: string | null;
        email: string;
        phone: string;
        address: {
            country: string;
            town: string;
            addressLine: string;
            postalCode: string | null;
        };
        agreements: (string | undefined)[] | null;
        documentsVerify: (File | undefined)[] | null;
    };
    userId: string;
    locale: string;
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
    }: IPropCreate): Promise<Boolean> {
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
                AddressId: createdAddress?.id || null,
                Email: formData.email,
                Phone: formData.phone,
                SocialContactsId: null,
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
        const createdBusiness = await this.businessService.createBusiness(
            {
                source: {
                    LegalType: legalType?.id,
                    Contacts: createdContacts?.id || null,
                    OfficialName: formData.officialName,
                    RegistrationDate: formData.dateRegister,
                    RegistrationNumber: formData.numberOrganization,
                },
            },
            userId
        );

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
                    privateMedia: uploadFiles,
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
}
