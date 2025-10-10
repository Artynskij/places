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
    author: string;

    date: string;
    titleImage: IMediaFrontWithFile | null;
    reactions: number[];

    category: string;

    // contentString: string;
    media: IMediaFrontWithFile[];
    content: any;
}
