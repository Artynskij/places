import { TLocale, TTypeFile } from "@/lib/models/types";

export interface IImageEntity {
    id: string;
    type: TTypeFile;
    blobPath: string;
    fileName: string;
    details: {
        lang: TLocale;
        value: {
            title: string;
            alt?: string;
        };
    }[];
    width: number;
    height: number;
}
export interface IImagePrivateEntity {
    id: string;
    type: string;
    blobPath: string;
    fileName: string;
    details?: {
        lang: string;
        value: {
            title: string;
        };
    }[];
    width: number;
    height: number;
}
export interface IImageCreateEntity {}
