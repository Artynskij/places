import { TLocale } from "@/lib/models/types";
import { IImageEntity } from "../entities/(establishment)/parts/image.entity";
// 1. Базовые строительные блоки
export interface IContentDetailsValueBase {
    title?: string;
    description?: string;
    alt?: string;
    caption?: string;
    name?: string;
    text?: string;
}

// 2. Интерфейс для деталей
export interface IContentDetail<TContentValue = {}> {
    lang: TLocale;
    contentValue?: IContentDetailsValueBase & TContentValue;
    value?: string;
    secondaryValue?: string | null;
    cName?: string | null;
    cIcon?: string | null;
}

// 3. Интерфейс для медиа
export interface IContentMedia {
    gallery?: IImageEntity[];
    documents?: IImageEntity[];
    photoPaths?: string[];
}

// 4. Основной интерфейс (собираем из блоков)
export interface IContentBase<TContentValue = {}> {
    details: IContentDetail<TContentValue>[];
    media?: IContentMedia;
}

// 5. Расширенная сущность
export interface IContentMultilingualEntity<TContentValue = {}>
    extends IContentBase<TContentValue> {
    id: string;
}
// 6. Простая справочная сущность
interface DetailsSimple extends Omit<IContentDetail, "contentValue" | "value"> {
    value: string;
}
export interface IContentSimpleEntity
    extends Omit<IContentMultilingualEntity, "details" | "media"> {
    details: DetailsSimple[];
}
export interface IContentSimpleEntityWithMedia
    extends Omit<IContentMultilingualEntity, "details"> {
    details: DetailsSimple[];
}
// 7. Индивидуальная сущность заведений
export interface IContentEstablishmentEntity {
    id: string;
    type: string;
    collection: string;
    value: {
        lang: TLocale;
        value: {
            details: {
                title?: string;
                description?: string;
                cuisine?: string;
                priceRange?: string;
                name?: string;
            };
            seoTrip?:
                | {
                      key: string;
                      value: string;
                  }[]
                | [];
            seo?:
                | {
                      key: string;
                      value: string;
                  }[]
                | [];

            location: {
                street1?: string;
                street2?: string;
                city?: string;
                state?: string;
                country?: string;
                zipCode?: string;
                coordinates?: {
                    latitude: number;
                    longitude: number;
                };
            };
        };
    }[];
    media: {
        gallery: IImageEntity[] | null;
    };
}
