import { TArticleStatus } from "../../types/TArticleStatus";
import {
    IMediaFront,
    IMediaFrontWithFile,
} from "../(establishment)/media.front";
import { IContentArticle, IPersonEntity } from "../../server/entities";
import { TLocale, TTipTapHTMLContent } from "../../types";
import { IPersonFront } from "../(person)/person.front";

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
    author?: IPersonFront;

    readingTime: number;
    publishedDate: string;
    createdDate: string;
    contentEntity: IContentArticle | null;
}
