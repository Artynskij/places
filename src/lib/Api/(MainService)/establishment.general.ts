import * as Yup from "yup";

import {
    getSchemaEstablishmentByTypeUser,
    validationSchemaEstablishmentUpdate,
} from "@/components/common/Form/Establishment/validationSchema";
import {
    IContentEstablishmentCreateRequest,
    IEstablishmentCreateRequest,
    IEstablishmentFront,
    IImageEntity,
    IScheduleFront,
    IScheduleRequest,
    ISocialContactsRequest,
} from "@/lib/models";
import { TTypeUser } from "@/lib/models/types";

import { ContactsEstablishmentService } from "../(Establishment)/contacts-establishment.api";
import { CONSTANT_TYPES_OF_ESTABLISHMENT_DB } from "@/asset/constants/database/types-of-establishment";
import { EstablishmentService } from "../(Establishment)/establishment/establishment.service";
import { EstablishmentPersonAssignmentApi } from "../(Establishment)/establishment/establishment-assignment.api";

import { FileUploadService } from "../fileUpload/fileUploads.service";
// import { ScheduleService } from "../(Establishment)/schedule/schedule.service";
import { EstablishmentTagsService } from "../(Establishment)/establishment-tags/establishment-tags.service";
import type { UploadFile } from "antd/es/upload/interface";
import {
    getHardObjectDiff,
    getSimpleObjectDiff,
} from "@/lib/helpers/getChangedFieldsForApi";
import { ModerationService } from "../moderation/moderation.service";
import { SocialNetworksService } from "../social-networks.api";
import { ScheduleService } from "../(Establishment)/schedule.api";

const validationSchemaRegisterTourist =
    getSchemaEstablishmentByTypeUser("tourist");
type TTypeFormCreateTourist = Yup.InferType<
    typeof validationSchemaRegisterTourist
>;
const validationSchemaRegisterOwner = getSchemaEstablishmentByTypeUser("owner");
type TTypeFormCreateOwner = Yup.InferType<typeof validationSchemaRegisterOwner>;
interface IPropCreate {
    typeUser: TTypeUser;

    // activeTab: string;
    formData: TTypeFormCreateTourist | TTypeFormCreateOwner;
    userId: string;
    locale: string;
    // business?: IBusinessFront;
    // initialForm?: TypeForm;
}
const validationSchemaUpdate = validationSchemaEstablishmentUpdate;
type TTypeFormUpdate = Yup.InferType<typeof validationSchemaUpdate>;
interface IPropUpdate {
    formData: TTypeFormUpdate;
    initialForm: TTypeFormUpdate;
    establishment: IEstablishmentFront;
    userId: string;
}

export class GeneralEstablishmentService {
    private socialContactsService: SocialNetworksService;
    private contactEstablishmentService: ContactsEstablishmentService;
    private establishmentService: EstablishmentService;
    private establishmentAssignmentService: EstablishmentPersonAssignmentApi;
    private fileUploadService: FileUploadService;
    private scheduleService: ScheduleService;
    private tagsService: EstablishmentTagsService;
    private moderationService: ModerationService;

    constructor() {
        this.socialContactsService = new SocialNetworksService();
        this.contactEstablishmentService = new ContactsEstablishmentService();
        this.establishmentService = new EstablishmentService();
        this.establishmentAssignmentService =
            new EstablishmentPersonAssignmentApi();
        this.fileUploadService = new FileUploadService();
        this.scheduleService = new ScheduleService();
        this.tagsService = new EstablishmentTagsService();
        this.moderationService = new ModerationService();
    }
    async create({ formData, userId, locale }: IPropCreate): Promise<Boolean> {
        // 0. Токены модерации
        const batchId = await this.moderationService.createBatchId(userId);
        const sessionId = await this.moderationService.createSessionId();
        if (!batchId || !sessionId) {
            console.log("cant get batchId or sessionId");
            return false;
        }
        const moderationObject = {
            ModerationBatchId: batchId,
            SessionId: sessionId,
            SubmittedById: userId,
        };
        // 1. Создание соц.сетей
        const bodySocialNetworks =
            formData.socialContacts?.reduce<ISocialContactsRequest["data"]>(
                (acc, soc) => {
                    acc[soc.type] = soc.url;
                    return acc;
                },
                {}
            ) ?? null;

        const createdSocialContact = bodySocialNetworks
            ? await this.socialContactsService.create({
                  moderation: moderationObject,
                  data: bodySocialNetworks,
              })
            : null;

        // 2. Создание контактов
        const createdContacts = await this.contactEstablishmentService.create({
            moderation: moderationObject,
            data: {
                source: {
                    Email: formData.email || null,
                    Menu: formData.menu || null,
                    Phone: formData.phone || null,
                    SocialContactsId: createdSocialContact?.entityId || null,
                    Web: null,
                },
            },
        });

        if (!createdContacts) {
            console.error("Не удалось создать контакты");

            return false; // ⛔ Останавливаем выполнение, чтобы не продолжать с null
        }

        // 3. Создание заведения
        const bodyEstablishment: IEstablishmentCreateRequest = {
            moderation: moderationObject,
            data: {
                source: {
                    CategoryIds: formData.categories as string[],
                    Contacts: createdContacts.entityId,
                    Latitude: formData.coord.lat,
                    Longitude: formData.coord.lon,
                    Locations: formData.locationId,
                    Type: CONSTANT_TYPES_OF_ESTABLISHMENT_DB[
                        formData.typeEstablishment
                    ].id,
                },
                content: {
                    value: [
                        {
                            lang: locale,
                            value: {
                                details: {
                                    title: formData.title,
                                    description: formData.description || null,
                                },
                                seo: null,
                                location: {
                                    street1: formData.coord.addressLine || null,
                                },
                            },
                        },
                    ],
                    media: { gallery: null },
                },
            },
        };

        const createdEstablishment = await this.establishmentService.create(
            bodyEstablishment
        );

        if (!createdEstablishment) {
            console.error("Не удалось создать заведение");

            return false;
        }

        // 4. Создание связи персоны и заведения
        const createdPersonEstablishmentAssign =
            await this.establishmentAssignmentService.create({
                moderation: moderationObject,
                data: {
                    source: {
                        Person: userId, // гарантированно есть
                        Establishment: createdEstablishment.entityId,
                        IsAddedByPerson: true,
                        Note: "Создание пользователем",
                        Source: "Cabinet",
                    },
                },
            });

        if (!createdPersonEstablishmentAssign) {
            console.log(
                "Establishment",
                createdEstablishment.entityId,
                "Person",
                userId
            );
            console.error("Не удалось создать связь заведение-персона");

            return false;
        }

        // 5. Загрузка изображений
        const imagesFilter = formData.images?.filter(Boolean) as UploadFile[];

        const imageBlobFiles =
            await this.fileUploadService.uploadPublicFileOfAntdFiles({
                vendorId: createdEstablishment.entityId,
                files: imagesFilter,
            });
        // 6. Обновление заведения с изображениями

        const updatedEstablishmentForImages =
            await this.establishmentService.update(
                createdEstablishment.entityId,
                {
                    moderation: moderationObject,
                    data: {
                        source: {},
                        content: {
                            value: [
                                {
                                    lang: locale,
                                    value: {
                                        details: {
                                            title: formData.title,
                                            description:
                                                formData.description || null,
                                        },
                                        seo: null,
                                        location: {
                                            street1:
                                                formData.coord.addressLine ||
                                                null,
                                        },
                                    },
                                },
                            ],
                            media: {
                                gallery: imageBlobFiles as IImageEntity[],
                            },
                        },
                    },
                }
            );

        // 7. Создание расписания
        if (formData.schedule) {
            await Promise.all(
                formData.schedule.map((schItem) =>
                    this.scheduleService.create({
                        moderation: moderationObject,
                        data: {
                            Establishment: createdEstablishment.entityId,
                            Day: schItem.day,
                            OpenTime: schItem.openTime,
                            CloseTime: schItem.closeTime,
                            Is24Hours: schItem.is24Hours,
                            IsHoliday: schItem.isHoliday,
                        },
                    })
                )
            );
        }

        // 8. Привязка тегов
        if (formData.tags) {
            await Promise.all(
                formData.tags
                    .filter((item) => !!item)
                    .map((tag) =>
                        this.tagsService.createTagEstablishmentConnect({
                            moderation: moderationObject,
                            data: {
                                Establishment: createdEstablishment.entityId,
                                Tag: tag as string,
                            },
                        })
                    )
            );
        }
        console.log("Созданное заведение:", createdEstablishment.entityId);
        return true;
    }
    async update({
        formData,
        initialForm,
        userId,
        establishment,
    }: IPropUpdate): Promise<boolean> {
        const changesFirstMedia =
            initialForm.images?.[0]?.uid !== formData.images?.[0]?.uid;
        const changesSimple = getSimpleObjectDiff(initialForm, formData);

        const changesHard = getHardObjectDiff(initialForm, formData);
        console.log("changesSimple", changesSimple);
        console.log("changesHard", changesHard);
        if (
            Object.keys(changesSimple).length === 0 &&
            Object.keys(changesHard).length === 0 &&
            !changesFirstMedia
        ) {
            return false; // нечего обновлять
        }
        // 📌0. Токены модерации

        const moderationObject = await this.moderationService.getModerationData(
            userId
        );
        if (!moderationObject) {
            console.log("cant get batchId or sessionId");
            return false;
        }
        // 📌1. Обработка соцсетей
        let socialRes = null;
        if ("socialContacts" in changesSimple) {
            const bodySocialNetworks =
                changesSimple.socialContacts?.reduce<
                    ISocialContactsRequest["data"]
                >((acc, soc) => {
                    acc[soc.type] = soc.url;
                    return acc;
                }, {}) ?? null;

            socialRes = bodySocialNetworks
                ? await this.socialContactsService.updateOrCreate(
                      establishment.contacts?.socialNetworksId || null,
                      { moderation: moderationObject, data: bodySocialNetworks }
                  )
                : null;
            console.log("socialRes", socialRes);
        }
        // 📌2. Обновление контактов
        let contactRes = null;
        if (
            "email" in changesSimple ||
            "phone" in changesSimple ||
            "menu" in changesSimple ||
            socialRes
        ) {
            contactRes = await this.contactEstablishmentService.updateOrCreate(
                establishment.contacts?.id || null,
                {
                    moderation: moderationObject,
                    data: {
                        source: {
                            Email:
                                changesSimple.email ||
                                establishment.contacts?.email ||
                                null,
                            Menu:
                                changesSimple.menu ||
                                establishment.contacts?.menu ||
                                null,
                            Phone:
                                changesSimple.phone ||
                                establishment.contacts?.phone ||
                                null,
                            SocialContactsId:
                                establishment.contacts?.socialNetworksId ||
                                socialRes?.entityId ||
                                null,
                            Web: null,
                        },
                    },
                }
            );
        }
        // 📌3. Обновление расписания(пачкой)

        if (
            "schedule" in changesHard &&
            (changesHard.schedule?.updated || changesHard.schedule?.added)
        ) {
            const updatedScheduleForm = changesHard.schedule?.updated
                ? (changesHard.schedule.updated as IScheduleFront[])
                : [];
            const addedScheduleForm = changesHard.schedule?.added
                ? (changesHard.schedule?.added as IScheduleFront[])
                : [];
            const splitArrayScheduleForm = [
                ...addedScheduleForm,
                ...updatedScheduleForm,
            ];

            const arrayScheduleBodies: {
                id: string | null;
                body: IScheduleRequest;
            }[] = splitArrayScheduleForm.map((item) => {
                return {
                    id: !!item.id ? item.id : null,
                    body: {
                        moderation: moderationObject,
                        data: {
                            Establishment: establishment.id,
                            Day: item.day,
                            CloseTime: item.closeTime,
                            Is24Hours: item.is24Hours,
                            IsHoliday: item.isHoliday,
                            OpenTime: item.openTime,
                        },
                    },
                };
            });

            await this.scheduleService.updateAllScheduleOfEstablishment(
                arrayScheduleBodies
            );
        }
        // TODO
        // 📌4. Обновление тегов (добавленные только)
        if ("tags" in changesHard && changesHard.tags?.added) {
            await Promise.all(
                changesHard.tags.added
                    .filter((item) => !!item)
                    .map((tag) => {
                        if (!tag) return;
                        return this.tagsService.createTagEstablishmentConnect({
                            moderation: moderationObject,
                            data: { Establishment: establishment.id, Tag: tag },
                        });
                    })
            );
        }
        // await Promise.all(
        //     formData.tags
        //         .filter((item) => !!item)
        //         .map((tag) =>
        //             this.tagsService.createTagEstablishmentConnect({
        //                 moderation: moderationObject,
        //                 data: {
        //                     Establishment: createdEstablishment.entityId,
        //                     Tag: tag as string,
        //                 },
        //             })
        //         )
        // );
        // 📌5. Обновление картинок
        let imagesNewArray = null;
        if ("images" in changesHard) {
            const filesRemoved = changesHard.images?.removed;
            const filesWithoutDeleted: IImageEntity[] = filesRemoved
                ? establishment.content?.media?.gallery?.filter(
                      (formFile, index) => {
                          return !filesRemoved?.some((removedFile) => {
                              const existingFileUid = `existing_${index}`;
                              return removedFile?.uid === existingFileUid;
                          });
                      }
                  ) || []
                : establishment.content?.media?.gallery || [];

            const filesAdded = changesHard.images?.added;

            const filesUploaded = filesAdded
                ? await this.fileUploadService.uploadPublicFileOfAntdFiles({
                      vendorId: establishment.id,
                      files: filesAdded as UploadFile[],
                  })
                : [];

            const filesToBody: IImageEntity[] = [
                ...filesWithoutDeleted,
                ...filesUploaded,
            ];
            if (filesToBody.length) {
                imagesNewArray = filesToBody.length > 0 ? filesToBody : null;
                console.log("imagesNewArray", imagesNewArray);
            }
        }
        // 📌6. Обновление конетента
        let contentBody = null;
        if ("content" in changesHard) {
            const contentForm:
                | IContentEstablishmentCreateRequest["value"]
                | null =
                formData.content.map((item) => {
                    return {
                        lang: item.lang,
                        value: {
                            details: {
                                title: item.value.details.title,
                                description: item.value.details.description,
                            },
                            location: {
                                street1: item.value.location.street1 || null,
                                street2: item.value.location.street2 || null,
                            },
                            seo: item.value.seo || null,
                            seoTrip: item.value.seoTrip || null,
                        },
                    };
                }) || null;
            contentBody = contentForm;
        }

        // 📌7. Обновление самого объекта и его сборка
        let bodyEstablishment: IEstablishmentCreateRequest["data"] = {
            source: {},
        };
        // 📌8. Обновление общей сущности establishment
        if ("categories" in changesHard && bodyEstablishment.source) {
            bodyEstablishment.source.CategoryIds =
                formData.categories as string[];
        }
        if ("coord" in changesSimple && bodyEstablishment.source) {
            bodyEstablishment.source.Longitude = formData.coord.lon;
            bodyEstablishment.source.Latitude = formData.coord.lat;
        }
        if ("locationId" in changesSimple && bodyEstablishment.source) {
            bodyEstablishment.source.Locations = formData.locationId;
        }
        if ("typeEstablishment" in changesSimple && bodyEstablishment.source) {
            bodyEstablishment.source.Type = formData.typeEstablishment;
        }
        if (contactRes && !establishment.contacts) {
            bodyEstablishment.source?.Contacts === contactRes.entityId;
        }
        if (contentBody || imagesNewArray) {
            bodyEstablishment.content = {
                value: contentBody || establishment.content?.value,
                media: {
                    gallery: imagesNewArray
                        ? imagesNewArray
                        : establishment.content?.media.gallery || null,
                }, // картинки выше
            };
        }
        console.log("bodyEstablishment", bodyEstablishment);
        const updatedEstablishment = await this.establishmentService.update(
            establishment.id,
            { moderation: moderationObject, data: bodyEstablishment }
        );
        if (!updatedEstablishment) {
            return false;
        }
        return true;
    }
}
