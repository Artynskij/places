import { IMediaFront } from "./(establishment)/parts/media.front";

export interface IArticleFront {
    id: string;
    title: string;
    description: string;
    author: string;
    markdown: string;
    date: string;
    titleImage: string;
    reactions: number[];
}
export interface IArticleNewFront {
    id: string;
    title: string;
    description: string;
    author: string;

    date: string;
    titleImage: IMediaFront;
    reactions: number[];

    category: string;

    // contentString: string;
    content: any;
}
