import { TLocale, TTypeFile } from "@/lib/models/types";

export interface IImageEntity {
    isMain?: boolean;

    id: string;
    type: TTypeFile;
    fileName: string;
    blobPath: string;
    fsPath?: string;
    width: number;
    height: number;
    fileSize?: number;
    mimeType?: string;
    originalFileName?: string;
    details: {
        lang: TLocale;
        value: {
            title: string;
            alt?: string;
        };
    }[];
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
// export interface IImageCreateEntity {}
