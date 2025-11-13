import {
    IContentSimpleEntityWithMedia,
    ILocationWithContentEntity,
} from "../server/entities";
import { IMediaFront } from "./(establishment)/media.front";

export interface ILocationFront {
    id: string;
    title: string;
    locationType: { id: string; title: string } | null;
    pathBreadcrumb: string;
    country: ILocationWithContentEntity | null;
    establishmentCount: number | null;
    media: IMediaFront[] | null;
    content?: IContentSimpleEntityWithMedia;
}

