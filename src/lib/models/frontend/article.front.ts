import { TArticleStatus } from "../types/TArticleStatus";
import {
    IMediaFront,
    IMediaFrontWithFile,
} from "./(establishment)/parts/media.front";

// export interface IArticleFront {
//     id: string;
//     title: string;
//     description: string;
//     author: string;
//     markdown: string;
//     date: string;
//     titleImage: string;
//     reactions: number[];
// }
export interface IArticleFront {
    id: string;
    title: string;
    description: string;
    markdown: any;
    titleImage: IMediaFrontWithFile | null;
    media: IMediaFrontWithFile[];

    category: string;
    reactions: number[];
    status: {
        id: string;
        code: TArticleStatus;
    };

    // contentString: string;
    date: string;
    author: string;
}
