import {
    IEstablishmentWithContentPareEntity,
    IEstablishmentFront,
    IMediaFront,
    IRateEntity,
    IRateEstablishmentEntity,
    IRateEstablishmentFront,
    ICategoryFront,
} from "@/lib/models";
import { ContactsEstablishmentMapper } from "../contacts-establishment.api";
import { PersonMapper } from "../../(Person)/person/person.mapper";
import { CONSTANT_RATES_ESTABLISHMENT_ARRAY_DB } from "@/asset/constants/database/rates-establishment.const";

interface ITransformToFront {
    establishmentEntity: IEstablishmentWithContentPareEntity;
    info: {
        cdnHost: string;
        totalEstablishment?: number;
    };
}
export class EstablishmentMapper {
    private contactsEstablishmentMapper: ContactsEstablishmentMapper;
    private personMapper: PersonMapper;
    constructor() {
        this.contactsEstablishmentMapper = new ContactsEstablishmentMapper();
        this.personMapper = new PersonMapper();
    }
    private transformRate(rates?: IRateEntity) {
        const additionalKeys = [
            "Atmosphere",
            "Food",
            "Service",
            "Value",
            "Rooms",
            "PriceQuality",
            "Clean",
            "Location",
            "Comfort",
            "Accessibility",
            "Quality",
            "Safety",
        ];

        // function mapRates(rates?: IRateEntity) {
        if (!rates) {
            return {
                main: 0,
                count: 0,
                additional: [],
            };
        }

        const additional = additionalKeys
            .map((key) => {
                const avgKey = `Average${key}` as keyof IRateEntity;
                const countKey = `Count${key}` as keyof IRateEntity;

                const avg = rates[avgKey] as number | null;
                const count = rates[countKey] as number;

                if (!avg || count === 0) return null;

                return {
                    key,
                    value: avg,
                    count,
                };
            })
            .filter(
                (item): item is { key: string; value: number; count: number } =>
                    !!item
            );

        return {
            main: rates.AverageRate || 0,
            count: rates.CountRate || 0,
            additional,
        };
        // }
    }
    toFront({
        establishmentEntity,
        info,
    }: ITransformToFront): IEstablishmentFront {
        if (!establishmentEntity?.content) {
            throw new Error("Invalid establishment content structure");
        }
        const entityContentEstablishment = establishmentEntity.content;
        const entitySourceEstablishment = establishmentEntity.establishment;
        const title =
            entityContentEstablishment.value[0]?.value.details?.title ||
            entityContentEstablishment.value[0]?.value.seoTrip?.find(
                (item) => item.key == "MAIN_H1"
            )?.value ||
            entityContentEstablishment.value[0]?.value.seo?.find(
                (item) => item.key == "MAIN_H1"
            )?.value ||
            "Not Title";
        const description =
            entityContentEstablishment.value[0]?.value.details?.description ||
            entityContentEstablishment.value[0]?.value.seoTrip?.find(
                (item) => item.key == "META_DESCRIPTION"
            )?.value ||
            entityContentEstablishment.value[0]?.value.seo?.find(
                (item) => item.key == "META_DESCRIPTION"
            )?.value ||
            "Not description";

        const galleryImages: IMediaFront[] | null =
            entityContentEstablishment?.media.gallery?.map((image) => {
                return {
                    id: image.id,
                    title: image.details[0]?.value.title || "",
                    alt: image.details[0]?.value.alt || "",
                    blobPath: image.blobPath,
                    fileName: image.fileName,
                    height: image.height,
                    width: image.width,
                    type: image.type,
                    src: `${info.cdnHost}/${image.blobPath}`,
                    isMain: image.isMain || false,
                };
            }) || null;
        const categories: ICategoryFront[] =
            entitySourceEstablishment.Categories?.map((cat) => {
                return {
                    id: cat?.Id || "",
                    key: cat?.Id || "",
                    value: cat?.content?.details[0]?.value || "",
                    content: cat.content,
                };
            }) || null;
        return {
            id: entitySourceEstablishment.Id,
            title: title,
            description: description,
            typeEstablishment: entitySourceEstablishment.Type?.Name || null,
            category: categories?.[0] || null,
            categoriesAll: categories,

            rates: this.transformRate(entitySourceEstablishment.Rates),

            location: {
                country: {
                    id:
                        entitySourceEstablishment.Locations?.Country.Id ||
                        entitySourceEstablishment.Locations?.Path.split(
                            "."
                        )[1] ||
                        "",
                    title:
                        entitySourceEstablishment.Locations?.Country.content
                            ?.details[0].value || "",
                },
                pathBreadcrumb: entitySourceEstablishment.Locations?.Path || "",
                town: {
                    id: entitySourceEstablishment.Locations?.Id || "",
                    title:
                        entitySourceEstablishment.Locations?.content?.details[0]
                            ?.value || "",
                },
                street:
                    entityContentEstablishment.value[0]?.value.location
                        .street1 || "",
                latitude: +entitySourceEstablishment.Latitude,
                longitude: +entitySourceEstablishment.Longitude,
                postalCode: entitySourceEstablishment.PostalCode,
                info: {
                    totalEstablishment: info?.totalEstablishment || null,
                },
            },
            contacts: entitySourceEstablishment.Contacts
                ? this.contactsEstablishmentMapper.toFront(
                      entitySourceEstablishment.Contacts
                  )
                : null,
            media: {
                gallery: galleryImages,
            },
            seo:
                entityContentEstablishment.value[0]?.value.seoTrip ||
                entityContentEstablishment.value[0]?.value.seo ||
                null,
            content: entityContentEstablishment,
        };
    }
    toFrontRateReview(
        establishmentRateEntity: IRateEstablishmentEntity,
        cdnHost: string
    ): IRateEstablishmentFront {
        const rates = CONSTANT_RATES_ESTABLISHMENT_ARRAY_DB.map((key) => {
            if (!establishmentRateEntity[key]) return null;
            return {
                key,
                value: establishmentRateEntity[key], // number | null
            };
        }).filter(Boolean) as IRateEstablishmentFront["rates"];

        const mappedObject: IRateEstablishmentFront = {
            person: this.personMapper.toFront(
                { person: establishmentRateEntity.Person, content: null },
                null,
                cdnHost
            ),
            establishment: this.toFront({
                establishmentEntity: {
                    establishment: establishmentRateEntity.Establishment,
                    content: establishmentRateEntity.Establishment.content,
                },
                info: { cdnHost: cdnHost },
            }),
            PersonsVisitDate: establishmentRateEntity.PersonsVisitDate,
            CreatedDate: establishmentRateEntity.CreatedDate,
            rates: rates,
            // Accessibility: establishmentRateEntity.Accessibility,
            // Atmosphere: establishmentRateEntity.Atmosphere,
            // Clean: establishmentRateEntity.Clean,
            // Comfort: establishmentRateEntity.Comfort,
            // Food: establishmentRateEntity.Food,
            // Location: establishmentRateEntity.Location,
            // PriceQuality: establishmentRateEntity.PriceQuality,
            // Quality: establishmentRateEntity.Quality,
            // Rate: establishmentRateEntity.Rate,
            // Rooms: establishmentRateEntity.Rooms,
            // Safety: establishmentRateEntity.Safety,
            // Service: establishmentRateEntity.Service,
            // Value: establishmentRateEntity.Value,
        };
        return mappedObject;
    }
}
