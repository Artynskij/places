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
    IMediaFront,
    IScheduleFront,
    ISocialContactsRequest,
} from "@/lib/models";
import { TTypeUser } from "@/lib/models/types";
import { SocialNetworksService } from "../(Person)/socialNetworksPerson/socialNetworksPerson.service";
import { ContactsPersonService } from "../(Person)/contactPerson.api";
import { ContactsEstablishmentService } from "../(Establishment)/contactsEstablishment/contactsEstablishment.api";
import { CONSTANT_TYPES_OF_ESTABLISHMENT } from "@/asset/constants/TypesOfEstablishment";
import { EstablishmentService } from "../(Establishment)/establishment/establishment.service";
import { EstablishmentPersonAssignmentApi } from "../(Establishment)/establishment/establishmentAssignment.api";
import { getImageDimensions } from "@/lib/helpers/getImageDimensions";
import { FileUploadService } from "../fileUpload/fileUploads.service";
import { ScheduleService } from "../(Establishment)/schedule/schedule.service";
import { TagsService } from "../(Establishment)/tags/tag.service";
import type { UploadFile } from "antd/es/upload/interface";
import {
    getHardObjectDiff,
    getSimpleObjectDiff,
} from "@/lib/helpers/getChangedFieldsForApi";

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
    // typeUser: TTypeUser;

    // activeTab: string;
    // userId: string;
    // locale: string;
    // business?: IBusinessFront;
    // initialForm?: TypeForm;
}

export class GeneralEstablishmentService {
    private socialContactsService: SocialNetworksService;
    private contactEstablishmentService: ContactsEstablishmentService;
    private establishmentService: EstablishmentService;
    private establishmentAssignmentService: EstablishmentPersonAssignmentApi;
    private fileUploadService: FileUploadService;
    private scheduleService: ScheduleService;
    private tagsService: TagsService;

    constructor() {
        this.socialContactsService = new SocialNetworksService();
        this.contactEstablishmentService = new ContactsEstablishmentService();
        this.establishmentService = new EstablishmentService();
        this.establishmentAssignmentService =
            new EstablishmentPersonAssignmentApi();
        this.fileUploadService = new FileUploadService();
        this.scheduleService = new ScheduleService();
        this.tagsService = new TagsService();
    }
    async create({ formData, userId, locale }: IPropCreate): Promise<Boolean> {
        // 1. Создание соц.сетей
        const bodySocialNetworks =
            formData.socialContacts?.reduce<ISocialContactsRequest>(
                (acc, soc) => {
                    acc[soc.type] = soc.url;
                    return acc;
                },
                {}
            ) ?? null;

        const createdSocialContact = bodySocialNetworks
            ? await this.socialContactsService.createSocialNetworksPerson(
                  bodySocialNetworks
              )
            : null;

        // 2. Создание контактов
        const createdContacts = await this.contactEstablishmentService.create({
            source: {
                Email: formData.email || null,
                Menu: formData.menu || null,
                Phone: formData.phone || null,
                SocialContactsId: createdSocialContact?.id || null,
                Web: null,
            },
        });

        if (!createdContacts) {
            console.error("Не удалось создать контакты");

            return false; // ⛔ Останавливаем выполнение, чтобы не продолжать с null
        }

        // 3. Создание заведения
        const bodyEstablishment: IEstablishmentCreateRequest = {
            source: {
                CategoryIds: formData.categories as string[],
                Contacts: createdContacts.id,
                Latitude: formData.coord.lat,
                Longitude: formData.coord.lon,
                Locations: formData.locationId,
                Type: CONSTANT_TYPES_OF_ESTABLISHMENT[
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
                source: {
                    Person: userId, // гарантированно есть
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
                userId
            );
            console.error("Не удалось создать связь заведение-персона");

            return false;
        }

        // 5. Загрузка изображений
        const imagesFilter = formData.images?.filter(Boolean) as UploadFile[];

        const imageBlobFiles =
            await this.fileUploadService.uploadPublicFileOfAntdFiles({
                vendorId: createdEstablishment.Id,
                files: imagesFilter,
            });
        // 6. Обновление заведения с изображениями

        const updatedEstablishmentForImages =
            await this.establishmentService.update(createdEstablishment.Id, {
                source: {},
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
                    media: {
                        gallery: imageBlobFiles as IImageEntity[],
                    },
                },
            });

        // 7. Создание расписания
        if (formData.schedule) {
            await Promise.all(
                formData.schedule.map((schItem) =>
                    this.scheduleService.createScheduleDay({
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
        if (formData.tags) {
            await Promise.all(
                formData.tags
                    .filter((item) => !!item)
                    .map((tag) =>
                        this.tagsService.createTagEstablishmentConnect({
                            Establishment: createdEstablishment.Id,
                            Tag: tag as string,
                        })
                    )
            );
        }
        console.log("Созданное заведение:", createdEstablishment.Id);
        return true;
    }
    async update({
        formData,
        initialForm,

        establishment,
    }: IPropUpdate): Promise<boolean> {
        const changesFirstMedia =
            initialForm.images?.[0]?.uid !== formData.images?.[0]?.uid;
        const changesSimple = getSimpleObjectDiff(initialForm, formData);

        const changesHard = getHardObjectDiff(initialForm, formData);
        console.log(changesSimple);
        console.log(changesHard);

        if (
            Object.keys(changesSimple).length === 0 &&
            Object.keys(changesHard).length === 0 &&
            !changesFirstMedia
        ) {
            return false; // нечего обновлять
        }

        // 📌 Обработка соцсетей
        let socialRes = null;
        if ("socialContacts" in changesSimple) {
            const bodySocialNetworks =
                changesSimple.socialContacts?.reduce<ISocialContactsRequest>(
                    (acc, soc) => {
                        acc[soc.type] = soc.url;
                        return acc;
                    },
                    {}
                ) ?? null;

            socialRes =
                await this.socialContactsService.updateSocialNetworksPerson(
                    establishment.contacts?.socialNetworksId || null,
                    bodySocialNetworks
                );
        }
        // 📌 Обновление контактов
        let contactRes = null;
        if (
            "email" in changesSimple ||
            "phone" in changesSimple ||
            "menu" in changesSimple ||
            socialRes
        ) {
            contactRes = await this.contactEstablishmentService.updateOrCreate(
                establishment.id,
                {
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
                            socialRes?.id ||
                            establishment.contacts?.socialNetworksId ||
                            null,
                        Web: null,
                    },
                }
            );
        }
        // 📌 Обновление расписания
        if ("schedule" in changesHard && changesHard.schedule?.updated) {
            await this.scheduleService.updateAllScheduleOfEstablishment(
                changesHard.schedule?.updated as IScheduleFront[]
            );
        }
        // TODO
        // 📌 Обновление тегов
        // if ("tags" in changes) {
        //     await this.tagsService.resetTags(establishmentId, formData.tags);
        // }

        // 📌 Обновление картинок
        let imagesNewArray = null;
        if ("images" in changesHard) {
            const filesWithoutDeleted: IImageEntity[] =
                establishment.content?.media?.gallery?.filter(
                    (formFile, indexFormFile) => {
                        return !changesHard.images?.removed?.find(
                            (removedFile) => +removedFile.uid === indexFormFile
                        );
                    }
                ) || [];
            console.log(establishment.content?.media?.gallery);
            console.log(changesHard.images?.removed);
            console.log(filesWithoutDeleted);
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
                console.log(imagesNewArray);
            }

            // тут можно сразу дернуть update establishment и положить в media.gallery
        }
        // 📌 Обновление конетента
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

        // 📌 Обновление самого объекта и его сборка
        let bodyEstablishment: IEstablishmentCreateRequest = {
            source: {},
        };
        // // 📌 Обновление категорий
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
            bodyEstablishment.source?.Contacts === contactRes.id;
        }
        if (contentBody || imagesNewArray) {
            bodyEstablishment.content = {
                value: contentBody || establishment.content?.value,
                media: {
                    gallery: imagesNewArray
                        ? imagesNewArray
                        : establishment.content?.media.gallery || null,
                    // gallery: null,
                }, // картинки выше
            };
        }
        console.log(bodyEstablishment);
        const updatedEstablishment = await this.establishmentService.update(
            establishment.id,
            bodyEstablishment
        );
        if (!updatedEstablishment) {
            return false;
        }
        return true;
    }
}
