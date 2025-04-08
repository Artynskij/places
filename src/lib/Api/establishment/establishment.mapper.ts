import {
    IEstablishmentEntity,
    IEstablishmentFront,
    IImageFront,
} from "@/lib/models";
interface ITransformToFront {
    establishment: IEstablishmentEntity;
    cdnHost: string;
}
export default class EstablishmentMapper {
    constructor() {}
    transformToFront({
        establishment,
        cdnHost,
    }: ITransformToFront): IEstablishmentFront {
        if (
            !establishment?.content ||
            !establishment.content.value?.[0]?.value?.details ||
            !establishment.content.media?.gallery
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
            
        const galleryImages: IImageFront[] =
            establishment.content.media.gallery.map((image) => {
                return {
                    title: image.details[0].value.title,
                    blobPath: image.blobPath,
                    fileName: image.fileName,
                    height: image.height,
                    width: image.width,
                    type: image.type,
                };
            });
        return {
            id: establishment.establishment.Id,
            title: establishment.content.value[0].value.details.title,
            description:
                establishment.content.value[0].value.details.description,
            typeEstablishment: establishment.establishment.Type.Name,
            category:
                establishment.establishment.Category.Content.details[0].value,
            rates: {
                main: establishment.establishment.Rates.Rate,
                count: establishment.establishment.Rates.Count,
                additional: additionalRates,
            },
            location: {
                street: establishment.content.value[0].value.location.street1,
                latitude: establishment.establishment.Latitude,
                longitude: establishment.establishment.Longitude,
                postalCode: establishment.establishment.PostalCode,
            },
            contacts: establishment.establishment.Contacts,
            media: {
                cdnHost: cdnHost,
                gallery: galleryImages,
            },
            seo: establishment.content.value[0].value.seoTrip,
        };
    }
}
