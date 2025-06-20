import {
    IEstablishmentEntity,
    IEstablishmentFront,
    IMediaFront,
} from "@/lib/models";
interface ITransformToFront {
    establishment: IEstablishmentEntity;
    info: {
        cdnHost: string;
        totalEstablishment?: number;
    };
}
export default class EstablishmentMapper {
    constructor() {}
    transformToFront({
        establishment,
        info,
    }: ITransformToFront ): IEstablishmentFront {
        if (
            !establishment?.content ||
            !establishment?.content.value?.[0]?.value?.details ||
            !establishment?.content.media?.gallery
        ) {
            
            throw new Error("Invalid establishment content structure");
        }
        const additionalRates = Object.entries(
            establishment.establishment.Rates
        )
            .map(([key, value]) => {
                if (key === "Count" || key === "Rate" || !Number(value))
                    return null;
                return { key: key, value: value };
            })
            .filter((item) => item);

        const galleryImages: IMediaFront[] =
            establishment.content.media.gallery.map((image) => {
                return {
                    title: image.details[0].value.title,
                    blobPath: image.blobPath,
                    fileName: image.fileName,
                    height: image.height,
                    width: image.width,
                    type: image.type,
                    src: `${info.cdnHost}/${image.blobPath}`,
                };
            });
        return {
            id: establishment.establishment.Id,
            title: establishment.content.value[0].value.details.title,
            description:
                establishment.content.value[0].value.details.description,
            typeEstablishment: establishment.establishment.Type.Name,
            category: {
                id: establishment.establishment.Categories[0]?.Id || "",
                key: establishment.establishment.Categories[0]?.Id || "",
                value:
                    establishment.establishment.Categories[0]?.Content
                        .details[0].value || "",
            },
            rates: {
                main: establishment.establishment.Rates.Rate,
                count: establishment.establishment.Rates.Count,
                additional: additionalRates,
            },
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
                        establishment.establishment.Locations?.Content
                            ?.details[0].value || "",
                },
                street: establishment.content.value[0].value.location.street1,
                latitude: +establishment.establishment.Latitude,
                longitude: +establishment.establishment.Longitude,
                postalCode: establishment.establishment.PostalCode,
                info: {
                    totalEstablishment: info?.totalEstablishment || null,
                },
            },
            contacts: establishment.establishment.Contacts,
            media: {
                cdnHost: info.cdnHost, //"http://172.27.20.200:49160/cdn/"
                gallery: galleryImages,
            },
            seo: establishment.content.value[0].value.seoTrip,
        };
    }
}
