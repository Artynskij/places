import { TArticleStatus } from "../../types/TArticleStatus";
import {
    IMediaFront,
    IMediaFrontWithFile,
} from "../(establishment)/parts/media.front";
import { IContentArticle, IPersonEntity } from "../../server/entities";
import { TLocale, TTipTapHTMLContent } from "../../types";

export interface IArticleFront {
    id: string;
    title: string;
    description: string;
    markdown: TTipTapHTMLContent;
    titleImage: IMediaFrontWithFile | null;
    media: IMediaFrontWithFile[];

    type: { id: string; code: string; value: string }[];
    subType: { id: string; code: string; value: string }[];
    reactions: number[];
    status: {
        id: string;
        code: TArticleStatus;
    };
    author?: IPersonEntity;

    readingTime: number;
    date: string;
    // langsContent:TLocale[]

    contentEntity: IContentArticle | null;
}
