import { IApiContent } from "./parts/content.apiPart";

export interface IApiCategory {
  Id: string;
  Name: string;
  Content: IApiContent;
}
