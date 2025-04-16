import { IMediaFront } from "../parts/media/media.frontPart";

export interface ILocationFront {
    id: string;
    value: string;
    locationType: { id: string; value: string };
    pathBreadcrumb: string;
    media: IMediaFront[] | null;
}
