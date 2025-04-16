export interface IImageEntity {
  id: string;
  refId?: number;
  type: string;
  details: {
    lang: string;
    value: {
      title: string;
    };
  }[];
  width: number;
  height: number;
  refUrl?: string;
  refFileName?: string;
  fileName: string;
  blobPath: string;
}
