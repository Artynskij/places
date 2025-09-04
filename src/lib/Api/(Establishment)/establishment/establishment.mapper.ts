import {
    IEstablishmentEntity,
    IEstablishmentWithContentEntity,
    IEstablishmentFront,
    IMediaFront,
    IRateEntity,
} from "@/lib/models";
import {
    ContactsEstablishmentMapper,
    ContactsEstablishmentService,
} from "../contactsEstablishment/contactsEstablishment.api";
interface ITransformToFront {
    establishment: IEstablishmentWithContentEntity;
    info: {
        cdnHost: string;
        totalEstablishment?: number;
    };
}
export default class EstablishmentMapper {
    private contactsEstablishmentMapper: ContactsEstablishmentMapper;
    constructor() {
        this.contactsEstablishmentMapper = new ContactsEstablishmentMapper();
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
    transformToFront({
        establishment,
        info,
    }: ITransformToFront): IEstablishmentFront {
        if (!establishment?.content) {
            throw new Error("Invalid establishment content structure");
        }
        const title =
            establishment.content.value[0]?.value.details?.title ||
            establishment.content.value[0]?.value.seoTrip.find(
                (item) => item.key == "MAIN_H1"
            )?.value ||
            "default title";
        const description =
            establishment.content.value[0]?.value.details?.description ||
            establishment.content.value[0]?.value.seoTrip.find(
                (item) => item.key == "META_DESCRIPTION"
            )?.value ||
            "default description";
        const additionalRates = establishment.establishment.Rates
            ? Object.entries(establishment.establishment.Rates)
                  .map(([key, value]) => {
                      if (key === "Count" || key === "Rate" || !Number(value))
                          return null;
                      return { key: key, value: value };
                  })
                  .filter((item) => item)
            : [];

        const galleryImages: IMediaFront[] | null =
            establishment.content?.media.gallery?.map((image) => {
                return {
                    title: image.details[0]?.value.title || "default title",
                    blobPath: image.blobPath,
                    fileName: image.fileName,
                    height: image.height,
                    width: image.width,
                    type: image.type,
                    src: `${info.cdnHost}/${image.blobPath}`,
                };
            }) || null;

        return {
            id: establishment.establishment.Id,
            title: title,
            description: description,
            typeEstablishment: establishment.establishment.Type.Name,
            category: {
                id: establishment.establishment.Categories[0]?.Id || "",
                key: establishment.establishment.Categories[0]?.Id || "",
                value:
                    establishment.establishment.Categories[0]?.content
                        ?.details[0]?.value || "default title",
            },
            rates: this.transformRate(establishment.establishment.Rates),
            // rates: {
            //     main: establishment.establishment.Rates?.AverageRate || 0,
            //     count: establishment.establishment.Rates?.CountRate || 0,
            //     additional: additionalRates,
            // },
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
                            ?.details[0]?.value || "default title location",
                },
                street: establishment.content.value[0].value.location.street1,
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
            seo: establishment.content.value[0].value.seoTrip,
        };
    }
}
