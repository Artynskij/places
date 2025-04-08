export interface IImageFront {
  title: string;
  width: number;
  height: number;
  type: 'image' | 'video' | string;
  fileName: string;
  blobPath: string;
}
