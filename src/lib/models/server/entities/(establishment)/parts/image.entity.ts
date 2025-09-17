export interface IImageEntity {
    id: string;
    type: string;
    blobPath: string;
    fileName: string;
    details: {
        lang: string;
        value: {
            title: string;
        };
    }[];
    width: number;
    height: number;
    refId?: number;
    refUrl?: string;
    refFileName?: string;
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
export interface IImageCreateEntity{

}