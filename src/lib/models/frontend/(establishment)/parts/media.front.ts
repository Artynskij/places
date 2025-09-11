export interface IMediaFront {
    id:string;
    title: string;
    width: number;
    height: number;
    type: "image" | "video" | string;
    fileName: string;
    blobPath: string;
    src: string;
}
