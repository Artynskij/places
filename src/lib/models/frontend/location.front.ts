import { IMediaFront } from "./(establishment)/parts/media.front";

export interface ILocationFront {
    id: string;
    title: string;
    locationType: { id: string; title: string } | null;
    pathBreadcrumb: string;
    media: IMediaFront[] | null;
}
