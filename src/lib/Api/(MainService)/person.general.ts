import * as Yup from "yup";
import {
    validationPersonOwner,
    validationPersonTourist,
} from "@/lib/validationSchemas/person/personValid.schema";

import { ContactsPersonService } from "../(Person)/contactPerson.api";
import { PersonService } from "../(Person)/person/person.service";

import { getSimpleObjectDiff } from "@/lib/helpers/getChangedFieldsForApi";
import {
    IContactsRequest,
    IImageEntity,
    IPersonFront,
    IPersonNameRequest,
    IPersonRequest,
    ISocialContactsRequest,
} from "@/lib/models";
import { FileUploadService } from "../fileUpload/fileUploads.service";
import { ModerationService } from "../moderation/moderation.service";
import { PersonNameService } from "../(Person)/personName.api";
import { AddressService } from "../(Person)/address.api";
import { SocialNetworksService } from "../social-networks.api";
import { VerificationService } from "../verification.api";
type TTypeFormTourist = Yup.InferType<typeof validationPersonTourist>;
type TTypeFormOwner = Yup.InferType<typeof validationPersonOwner>;
interface IPropsUpdateTourist {
    initialForm: TTypeFormTourist;
    formData: TTypeFormTourist;
    personData: IPersonFront;
}
interface IPropsUpdateOwner {
    initialForm: TTypeFormOwner;
    formData: TTypeFormOwner;
    personData: IPersonFront;
}

export class GeneralPersonService {
    private personService: PersonService;
    private personNameService: PersonNameService;
    private addressService: AddressService;
    private contactsPersonService: ContactsPersonService;
    private socialNetworksService: SocialNetworksService;
    private fileUploadService: FileUploadService;
    private verificationService: VerificationService;
    private moderationService: ModerationService;
    constructor() {
        this.personService = new PersonService();
        this.personNameService = new PersonNameService();
        this.addressService = new AddressService();
        this.contactsPersonService = new ContactsPersonService();
        this.socialNetworksService = new SocialNetworksService();
        this.fileUploadService = new FileUploadService();
        this.verificationService = new VerificationService();
        this.moderationService = new ModerationService();
    }
    async updateTourist({
        initialForm,
        formData,
        personData,
    }: IPropsUpdateTourist): Promise<Boolean> {
        // 0 📌 получение модерационных данных
        const moderationObject = await this.moderationService.getModerationData(
            personData.id
        );
        if (!moderationObject) {
            console.log("cant get batchId or sessionId");
            return false;
        }
        // 1 вычисление изменений
        const changes = getSimpleObjectDiff<TTypeFormTourist>(
            initialForm,
            formData
        );

        if (Object.keys(changes).length === 0) {
            console.log("Нет изменений для сохранения");
            return false;
        }

        const bodyToPersonUpdate: IPersonRequest["data"] = {
            source: {},
        };

        // 2 📌 Обработка аватара
        if (changes.avatar) {
            const file = changes.avatar[0];
            if (file) {
                const imageUrl = await this.fileUploadService.uploadPublic({
                    file,
                    type: "image",
                    vendorId: personData.id,
                });
                bodyToPersonUpdate.source.AvatarPhotoPath = imageUrl?.blobPath;
            } else {
                bodyToPersonUpdate.source.AvatarPhotoPath = null;
            }
        }

        // 3 📌 Обработка основго тела Person описания
        if ("description" in changes) {
            bodyToPersonUpdate.source.About = changes.description ?? null;
        }
        if ("gender" in changes) {
            bodyToPersonUpdate.source.Gender = changes.gender ?? null;
        }
        if ("dateOfBirth" in changes) {
            bodyToPersonUpdate.source.BirthDate = changes.dateOfBirth ?? null;
        }
        //  nickname описания
        if ("nickname" in changes) {
            bodyToPersonUpdate.source.Nickname = changes.nickname ?? null;
        }

        // 4 📌 Обработка ФИО
        if ("fullName" in changes && changes.fullName) {
            const fullName = changes.fullName;

            const bodyPersonName: Partial<
                IPersonNameRequest["data"]["source"]
            > = {};

            if ("name" in fullName) {
                // bodyPersonName.FirstName = fullName.name ?? null;
                bodyPersonName.FirstName = fullName.name ?? null; // если нужно
            }
            if ("surname" in fullName) {
                // bodyPersonName.LastName = fullName.surname ?? null;
                bodyPersonName.LastName = fullName.surname ?? null; // если нужно
            }
            if ("secondName" in fullName) {
                bodyPersonName.MiddleName = fullName.secondName ?? null;
            }

            if (Object.keys(bodyPersonName).length > 0) {
                const personNameResponse =
                    await this.personNameService.updateOrCreate(
                        personData.personName?.id || null,
                        {
                            moderation: moderationObject,
                            data: { source: bodyPersonName },
                        }
                    );

                if (personNameResponse) {
                    bodyToPersonUpdate.source.PersonName =
                        personNameResponse.entityId;
                } else {
                    console.log("personNameResponse", personNameResponse);
                    return false;
                }
            }
        }

        // 5 📌 Обработка адреса
        let addressRes = null;
        if ("address" in changes) {
            const addr = changes.address || {};
            const bodyAddress = {
                Country: addr.country ?? null,

                Town: addr.town ?? null,
            };

            const addressResponse = await this.addressService.updateOrCreate(
                personData.contacts?.address?.id || null,
                { moderation: moderationObject, data: bodyAddress }
            );
            if (addressResponse) {
                addressRes = addressResponse;
            } else {
                console.log("addressResponse", addressResponse);
                return false;
            }
        }

        // 6 📌 Обработка соцсетей
        let socialRes = null;
        if ("socialContacts" in changes) {
            const bodySocialNetworks =
                changes.socialContacts?.reduce<ISocialContactsRequest["data"]>(
                    (acc, soc) => {
                        acc[soc.type] = soc.url;
                        return acc;
                    },
                    {}
                ) ?? null;

            const socialResponse = bodySocialNetworks
                ? await this.socialNetworksService.updateOrCreate(
                      personData.contacts?.socialNetworks?.id || null,
                      { moderation: moderationObject, data: bodySocialNetworks }
                  )
                : null;
            if (socialResponse) {
                socialRes = socialResponse;
            } else {
                console.log("socialResponse", socialResponse);
                return false;
            }
        }

        // 7 📌 Обработка контактов
        if (
            "email" in changes ||
            "phone" in changes ||
            addressRes ||
            socialRes
        ) {
            const bodyContacts: IContactsRequest = {
                moderation: moderationObject,
                data: {
                    source: {
                        Email:
                            "email" in changes
                                ? changes.email ?? null
                                : personData.contacts?.email ?? null,
                        Phone:
                            "phone" in changes
                                ? changes.phone ?? null
                                : personData.contacts?.phone ?? null,
                        Address:
                            addressRes?.entityId ||
                            personData.contacts?.address?.id ||
                            null,
                        SocialContacts:
                            socialRes?.entityId ||
                            personData.contacts?.socialNetworks?.id ||
                            null,
                    },
                },
            };

            const contactsResponse =
                await this.contactsPersonService.updateOrCreate(
                    personData.contacts?.id || null,
                    bodyContacts
                );

            if (contactsResponse) {
                bodyToPersonUpdate.source.Contacts = contactsResponse.entityId;
            } else {
                console.log("contactsResponse", contactsResponse);
                return false;
            }
        }

        // 📌 Финальный update

        console.log(bodyToPersonUpdate);
        if (bodyToPersonUpdate) {
            const updatePersonResponse = await this.personService.update(
                personData.id,
                {
                    moderation: moderationObject,
                    data: bodyToPersonUpdate,
                }
            );
            if (updatePersonResponse) {
                return true;
            } else {
                console.log("updatePersonResponse", updatePersonResponse);
                return false;
            }
        }
        return true;
    }
    async updateOwner({
        initialForm,
        formData,
        personData,
    }: IPropsUpdateOwner): Promise<Boolean> {
        // 0 📌 получение модерационных данных
        const moderationObject = await this.moderationService.getModerationData(
            personData.id
        );
        if (!moderationObject) {
            console.log("cant get batchId or sessionId");
            return false;
        }
        // 1 вычисление изменений
        const changes = getSimpleObjectDiff<TTypeFormOwner>(
            initialForm,
            formData
        );

        if (Object.keys(changes).length === 0) {
            console.log("Нет изменений для сохранения");
            return false;
        } else {
            console.log("changes", changes);
        }
        const bodyToPersonUpdate: IPersonRequest["data"] = { source: {} };

        // 2 📌 Обработка аватара
        if (changes.avatar) {
            const file = changes.avatar[0];
            if (file) {
                const imageUrl = await this.fileUploadService.uploadPublic({
                    file,
                    type: "image",
                    vendorId: personData.id,
                });
                bodyToPersonUpdate.source.Avatar2BPhotoPath =
                    imageUrl?.blobPath;
            } else {
                bodyToPersonUpdate.source.Avatar2BPhotoPath = null;
            }
        }

        // 3 📌 Обработка ФИО
        if ("fullName" in changes && changes.fullName) {
            const fullName = changes.fullName;

            const bodyPersonName: Partial<
                IPersonNameRequest["data"]["source"]
            > = {};

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
                console.log(bodyPersonName);
                const personNameResponse =
                    await this.personNameService.updateOrCreate(
                        personData.personName?.id || null,
                        {
                            moderation: moderationObject,
                            data: { source: bodyPersonName },
                        }
                    );
                console.log(personNameResponse);
                if (personNameResponse) {
                    bodyToPersonUpdate.source.PersonName =
                        personNameResponse.entityId;
                }
            }
        }
        // 4 📌 Обработка документа для верификации
        if (changes.passportDocument) {
            const documentFiles = changes.passportDocument;
            // 4.1 📌 Загрузка файла
            const uploadFilesPromises: Promise<IImageEntity>[] = documentFiles
                .filter((file): file is File => !!file)
                .map(async (file) => {
                    return this.fileUploadService
                        .uploadPrivate({
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
                                type: "image",
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
            const responsesUploadedFiles = await Promise.all(
                uploadFilesPromises
            );
            if (!!responsesUploadedFiles.filter(Boolean).length) {
                uploadFiles = responsesUploadedFiles;
            } else {
                console.log("responsesUploadedFiles", responsesUploadedFiles);
                return false;
            }
            // 4.2 📌 Загрузка верификации
            const verificationResponse = await this.verificationService.create({
                moderation: moderationObject,
                data: {
                    source: {
                        Person: personData.id,
                    },
                    content: {
                        details: [{ lang: "ru", value: "documentPerson" }],
                        media: { gallery: uploadFiles },
                    },
                },
            });

            if (!verificationResponse) {
                console.log("verificationResponse", verificationResponse);
                return false;
            }
        }
        // 📌 5 Финальный update
        if (bodyToPersonUpdate) {
            console.log(bodyToPersonUpdate);
            const responsePerson = await this.personService.update(
                personData.id,
                {
                    moderation: moderationObject,
                    data: bodyToPersonUpdate,
                }
            );
            if (!responsePerson) {
                console.log("responsePerson", responsePerson);
                return false;
            } else {
                console.log("responsePerson ok", responsePerson);
            }
        }
        return true;
    }
}
