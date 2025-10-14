import {
    IEstablishmentWithContentPareEntity,
    IEstablishmentFront,
    IMediaFront,
    IRateEntity,
    IEstablishmentRateEntity,
    IEstablishmentRateFront,
} from "@/lib/models";
import { ContactsEstablishmentMapper } from "../contactsEstablishment.api";
import { PersonMapper } from "../../(Person)/person/person.mapper";
import { CONSTANT_RATES_ESTABLISHMENT_ARRAY } from "@/asset/constants/ratesEstablishment";

interface ITransformToFront {
    establishment: IEstablishmentWithContentPareEntity;
    info: {
        cdnHost: string;
        totalEstablishment?: number;
    };
}
export default class EstablishmentMapper {
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
    toFront({ establishment, info }: ITransformToFront): IEstablishmentFront {
        if (!establishment?.content) {
            throw new Error("Invalid establishment content structure");
        }

        const title =
            establishment.content.value[0]?.value.details?.title ||
            establishment.content.value[0]?.value.seoTrip?.find(
                (item) => item.key == "MAIN_H1"
            )?.value ||
            establishment.content.value[0]?.value.seo?.find(
                (item) => item.key == "MAIN_H1"
            )?.value ||
            "Not Title";
        const description =
            establishment.content.value[0]?.value.details?.description ||
            establishment.content.value[0]?.value.seoTrip?.find(
                (item) => item.key == "META_DESCRIPTION"
            )?.value ||
            establishment.content.value[0]?.value.seo?.find(
                (item) => item.key == "META_DESCRIPTION"
            )?.value ||
            "Not description";

        const galleryImages: IMediaFront[] | null =
            establishment.content?.media.gallery?.map((image) => {
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
                };
            }) || null;
        const categories =
            establishment.establishment.Categories?.map((cat) => {
                return {
                    id: cat?.Id || "",
                    key: cat?.Id || "",
                    value: cat?.content?.details[0]?.value || "",
                };
            }) || null;
        return {
            id: establishment.establishment.Id,
            title: title,
            description: description,
            typeEstablishment: establishment.establishment.Type?.Name || null,
            category: categories?.[0] || null,
            categoriesAll: categories,

            rates: this.transformRate(establishment.establishment.Rates),

            location: {
                country: {
                    id:
                        establishment.establishment.Locations?.Path.split(
                            "."
                        )[1] || "",
                    title: "",
                },
                pathBreadcrumb:
                    establishment.establishment.Locations?.Path || "",
                town: {
                    id: establishment.establishment.Locations?.Id || "",
                    title:
                        establishment.establishment.Locations?.content
                            ?.details[0]?.value || "",
                },
                street:
                    establishment.content.value[0]?.value.location.street1 ||
                    "",
                latitude: +establishment.establishment.Latitude,
                longitude: +establishment.establishment.Longitude,
                postalCode: establishment.establishment.PostalCode,
                info: {
                    totalEstablishment: info?.totalEstablishment || null,
                },
            },
            contacts: establishment.establishment.Contacts
                ? this.contactsEstablishmentMapper.toFront(
                      establishment.establishment.Contacts
                  )
                : null,
            media: {
                gallery: galleryImages,
            },
            seo:
                establishment.content.value[0]?.value.seoTrip ||
                establishment.content.value[0]?.value.seo ||
                null,
            content: establishment.content,
        };
    }
    toFrontRateReview(
        establishmentRateEntity: IEstablishmentRateEntity,
        cdnHost: string
    ): IEstablishmentRateFront {
        const rates = CONSTANT_RATES_ESTABLISHMENT_ARRAY.map((key) => {
            if (!establishmentRateEntity[key]) return null;
            return {
                key,
                value: establishmentRateEntity[key], // number | null
            };
        }).filter(Boolean) as IEstablishmentRateFront["rates"];

        const mappedObject: IEstablishmentRateFront = {
            person: this.personMapper.toFront(
                { person: establishmentRateEntity.Person, content: null },
                null,
                cdnHost
            ),
            establishment: this.toFront({
                establishment: {
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
