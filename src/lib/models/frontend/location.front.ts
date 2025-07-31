import { IMediaFront } from "./(establishment)/parts/media.frontPart";


export interface ILocationFront {
    id: string;
    title: string;
    locationType: { id: string; title: string };
    pathBreadcrumb: string;
    media: IMediaFront[] | null;
}
